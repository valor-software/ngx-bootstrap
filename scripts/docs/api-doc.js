'use strict';

const ts = require('typescript');
const { marked } = require('marked');

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => (`<a href=\"${href}\" target="_blank" title=\"${title}\">${text}</a>`);
marked.setOptions({gfm: true});

const getDescription = (symbol, typeChecker) => marked(
  ts.displayPartsToString(symbol.getDocumentationComment(typeChecker)),
  {renderer}
);

function getNamesCompareFn(name) {
  name = name || 'name';
  return (a, b) => a[name].localeCompare(b[name]);
}

const ANGULAR_LIFECYCLE_METHODS = [
  'ngOnInit', 'ngOnChanges', 'ngDoCheck', 'ngOnDestroy', 'ngAfterContentInit', 'ngAfterContentChecked',
  'ngAfterViewInit', 'ngAfterViewChecked', 'writeValue', 'registerOnChange', 'registerOnTouched', 'setDisabledState'
];

// signal based members: `foo = input()`, `foo = output()`, `foo = model()`
const SIGNAL_MEMBER_FACTORIES = ['input', 'output', 'model'];
// signal based queries are not part of the public template api, skip them
const SIGNAL_QUERY_FACTORIES = ['viewChild', 'viewChildren', 'contentChild', 'contentChildren'];
// wrappers to strip so that docs show `string` instead of `InputSignal<string>`
const SIGNAL_TYPE_WRAPPERS = [
  'InputSignal', 'InputSignalWithTransform', 'ModelSignal', 'OutputEmitterRef', 'WritableSignal', 'Signal'
];

function isInternalMember(member, typeChecker) {
  // todo: could be an issue, as for now lets skip members without a symbol
  if (!member.symbol) {
    return true;
  }
  const jsDoc = ts.displayPartsToString(member.symbol.getDocumentationComment(typeChecker));
  return jsDoc.trim().length === 0 || hasInternalTag(member.symbol, typeChecker);
}

// `getDocumentationComment()` returns the description only, jsdoc tags have to be read separately,
// so `@internal` is never found by searching the description text
function hasInternalTag(symbol, typeChecker) {
  if (typeof symbol.getJsDocTags !== 'function') {
    return false;
  }

  return symbol.getJsDocTags(typeChecker).some(tag => tag.name === 'internal');
}

function isAngularLifecycleHook(methodName) {
  return ANGULAR_LIFECYCLE_METHODS.indexOf(methodName) >= 0;
}

// TypeScript 5.0 removed `node.decorators`, decorators are read off `node.modifiers` since then
function getDecorators(node) {
  if (!ts.canHaveDecorators(node)) {
    return [];
  }

  return ts.getDecorators(node) || [];
}

// only self contained values are worth printing as a default, expressions are resolved at runtime
function isLiteralDefaultValue(node) {
  switch (node.kind) {
    case ts.SyntaxKind.StringLiteral:
    case ts.SyntaxKind.NumericLiteral:
    case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
    case ts.SyntaxKind.ArrayLiteralExpression:
    case ts.SyntaxKind.ObjectLiteralExpression:
    case ts.SyntaxKind.PrefixUnaryExpression:
    case ts.SyntaxKind.NullKeyword:
      return true;
    case ts.SyntaxKind.Identifier:
      return node.text === 'undefined';
    default:
      return false;
  }
}

// own members shadow inherited ones of the same name
function mergeMembers(own, inherited) {
  const ownNames = own.map(member => member.name);
  const merged = own.concat(inherited.filter(member => ownNames.indexOf(member.name) === -1));

  return merged.sort(getNamesCompareFn());
}

// splits `boolean, unknown` into ['boolean', 'unknown'] without breaking on nested generics
function splitTypeArguments(typeArgs) {
  const parts = [];
  let depth = 0;
  let current = '';

  for (const char of typeArgs) {
    if (char === '<' || char === '(' || char === '[' || char === '{') {
      depth++;
    } else if (char === '>' || char === ')' || char === ']' || char === '}') {
      depth--;
    } else if (char === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
      continue;
    }
    current += char;
  }

  if (current.trim()) {
    parts.push(current.trim());
  }

  return parts;
}

function isPrivateOrInternal(member, typeChecker) {
  const modifiers = ts.getCombinedModifierFlags(member);
  return ((modifiers & ts.ModifierFlags.Private) !== 0) || isInternalMember(member, typeChecker);
}

class APIDocVisitor {
  constructor(fileNames) {
    this.program = ts.createProgram(fileNames, {});
    this.typeChecker = this.program.getTypeChecker(true);
  }

  visitSourceFile(fileName) {
    const sourceFile = this.program.getSourceFile(fileName);

    if (!sourceFile) {
      throw new Error(`File doesn't exist: ${fileName}.`)
    }

    return sourceFile.statements.reduce((directivesSoFar, statement) => {
      if (statement.kind === ts.SyntaxKind.ClassDeclaration) {
        return directivesSoFar.concat(this.visitClassDeclaration(fileName, statement));
      } else if (statement.kind === ts.SyntaxKind.InterfaceDeclaration) {
        return directivesSoFar.concat(this.visitInterfaceDeclaration(fileName, statement));
      }

      return directivesSoFar;
    }, []);
  }

  visitInterfaceDeclaration(fileName, interfaceDeclaration) {
    const symbol = this.program.getTypeChecker().getSymbolAtLocation(interfaceDeclaration.name);
    const description = getDescription(symbol, this.typeChecker);
    const className = interfaceDeclaration.name.text;
    const members = this.visitMembers(interfaceDeclaration.members);

    return [{
      fileName,
      className,
      description,
      methods: members.methods,
      properties: members.properties
    }];
  }

  visitClassDeclaration(fileName, classDeclaration) {
    const symbol = this.program.getTypeChecker().getSymbolAtLocation(classDeclaration.name);
    const description = getDescription(symbol, this.typeChecker);
    const className = classDeclaration.name.text;
    // `node.decorators` was removed from the AST in TypeScript 5.0, decorators now live in `node.modifiers`
    const classDecorators = getDecorators(classDeclaration);
    let directiveInfo, members;

    if (classDecorators.length) {
      for (let i = 0; i < classDecorators.length; i++) {
        if (this.isDirectiveDecorator(classDecorators[i])) {
          directiveInfo = this.visitDirectiveDecorator(classDecorators[i]);
          members = this.visitInheritedMembers(classDeclaration);

          return [{
            fileName,
            className,
            description,
            selector: directiveInfo.selector,
            exportAs: directiveInfo.exportAs,
            inputs: members.inputs,
            outputs: members.outputs,
            properties: members.properties,
            methods: members.methods
          }];
        } else if (this.isServiceDecorator(classDecorators[i])) {
          members = this.visitInheritedMembers(classDeclaration);

          return [{
            fileName,
            className,
            description,
            methods: members.methods,
            properties: members.properties
          }];
        }
      }
    } else if (description) {
      members = this.visitInheritedMembers(classDeclaration);

      return [{
        fileName,
        className,
        description,
        methods: members.methods,
        properties: members.properties
      }];
    }

    // a class that is not a directive or a service, not documented for now
    return [];
  }

  visitDirectiveDecorator(decorator) {
    const properties = decorator.expression.arguments[0].properties;
    let selector, exportAs;

    for (let i = 0; i < properties.length; i++) {
      if (properties[i].name.text === 'selector') {
        // TODO: this will only work if selector is initialized as a string literal
        selector = properties[i].initializer.text;
      }
      if (properties[i].name.text === 'exportAs') {
        // TODO: this will only work if selector is initialized as a string literal
        exportAs = properties[i].initializer.text;
      }
    }

    return {selector, exportAs};
  }

  /**
   * Collects the members of a class together with the ones it inherits, so that
   * `BsDaterangepickerConfig extends BsDatepickerConfig` documents the whole surface.
   * Members redeclared by the subclass win over the inherited ones.
   */
  visitInheritedMembers(classDeclaration, visited) {
    const seen = visited || new Set();
    seen.add(classDeclaration);

    const members = this.visitMembers(classDeclaration.members);
    const baseClass = this.getBaseClassDeclaration(classDeclaration);

    if (!baseClass || seen.has(baseClass)) {
      return members;
    }

    const inherited = this.visitInheritedMembers(baseClass, seen);

    return {
      inputs: mergeMembers(members.inputs, inherited.inputs),
      outputs: mergeMembers(members.outputs, inherited.outputs),
      methods: mergeMembers(members.methods, inherited.methods),
      properties: mergeMembers(members.properties, inherited.properties)
    };
  }

  getBaseClassDeclaration(classDeclaration) {
    const heritageClauses = classDeclaration.heritageClauses || [];
    const extendsClause = heritageClauses
      .filter(clause => clause.token === ts.SyntaxKind.ExtendsKeyword)[0];

    if (!extendsClause || !extendsClause.types.length) {
      return null;
    }

    let symbol = this.typeChecker.getSymbolAtLocation(extendsClause.types[0].expression);
    if (symbol && (symbol.flags & ts.SymbolFlags.Alias)) {
      symbol = this.typeChecker.getAliasedSymbol(symbol);
    }

    const declarations = (symbol && symbol.declarations) || [];

    return declarations.filter(node => node.kind === ts.SyntaxKind.ClassDeclaration)[0] || null;
  }

  visitMembers(members) {
    const inputs = [];
    const outputs = [];
    const methods = [];
    const properties = [];
    let inputDecorator, outDecorator, signalFactory;

    for (let i = 0; i < members.length; i++) {
      inputDecorator = this.getDecoratorOfType(members[i], 'Input');
      outDecorator = this.getDecoratorOfType(members[i], 'Output');
      signalFactory = inputDecorator || outDecorator ? null : this.getSignalFactory(members[i]);

      if (inputDecorator) {
        inputs.push(this.visitInput(members[i], inputDecorator));

      } else if (outDecorator) {
        outputs.push(this.visitOutput(members[i], outDecorator));

      } else if (signalFactory && signalFactory.kind === 'input') {
        inputs.push(this.visitSignalInput(members[i], signalFactory));

      } else if (signalFactory && signalFactory.kind === 'output') {
        outputs.push(this.visitSignalOutput(members[i], signalFactory));

      } else if (signalFactory && signalFactory.kind === 'model') {
        // a model is a two way binding: it is both an input and a `<name>Change` output
        const modelInput = this.visitSignalInput(members[i], signalFactory);
        inputs.push(modelInput);
        outputs.push({
          name: `${modelInput.name}Change`,
          type: modelInput.type,
          description: modelInput.description ||
            `<p>Emits when <code>${modelInput.name}</code> changes, supports two-way binding</p>\n`
        });

      } else if (!isPrivateOrInternal(members[i], this.typeChecker)) {
        if ((members[i].kind === ts.SyntaxKind.MethodDeclaration ||
          members[i].kind === ts.SyntaxKind.MethodSignature) &&
          !isAngularLifecycleHook(members[i].name.text)) {
          methods.push(this.visitMethodDeclaration(members[i]));
        } else if (
          members[i].kind === ts.SyntaxKind.PropertyDeclaration ||
          members[i].kind === ts.SyntaxKind.PropertySignature || members[i].kind === ts.SyntaxKind.GetAccessor) {
          const nested = this.expandObjectLiteralProperty(members[i]);
          nested ? properties.push(...nested) : properties.push(this.visitProperty(members[i]));
        }
      }
    }

    inputs.sort(getNamesCompareFn());
    outputs.sort(getNamesCompareFn());
    properties.sort(getNamesCompareFn());

    return {inputs, outputs, methods, properties};
  }

  visitMethodDeclaration(method) {
    return {
      name: method.name.text,
      description: getDescription(method.symbol, this.typeChecker),
      args: method.parameters ? method.parameters.map((prop) => this.visitArgument(prop)) : [],
      returnType: this.visitType(method.type)
    }
  }

  visitArgument(arg) {
    return {name: arg.name.text, type: this.visitType(arg)}
  }

  visitInput(property, inDecorator) {
    const inArgs = inDecorator.expression.arguments;
    return {
      name: inArgs.length ? inArgs[0].text : property.name.text,
      defaultValue: property.initializer ? this.stringifyDefaultValue(property.initializer) : undefined,
      type: this.visitType(property),
      description: getDescription(property.symbol, this.typeChecker)
    };
  }

  stringifyDefaultValue(node) {
    if (node.text) {
      return node.text;
    } else if (node.kind === ts.SyntaxKind.FalseKeyword) {
      return 'false';
    } else if (node.kind === ts.SyntaxKind.TrueKeyword) {
      return 'true';
    }
  }

  /**
   * Recognises signal based members and reports which factory declared them:
   * `input()`, `input.required()`, `output()`, `model()`, `model.required()`.
   * Returns null for anything else, including signal queries such as `viewChild()`.
   */
  getSignalFactory(member) {
    if (member.kind !== ts.SyntaxKind.PropertyDeclaration || !member.initializer) {
      return null;
    }
    if (member.initializer.kind !== ts.SyntaxKind.CallExpression) {
      return null;
    }

    const callee = member.initializer.expression;
    let kind, required = false;

    if (callee.kind === ts.SyntaxKind.Identifier) {
      kind = callee.text;
    } else if (callee.kind === ts.SyntaxKind.PropertyAccessExpression &&
      callee.expression.kind === ts.SyntaxKind.Identifier) {
      // only `<factory>.required()` is a signal member, e.g. `viewChild.required()` stays a query
      if (callee.name.text !== 'required') {
        return null;
      }
      kind = callee.expression.text;
      required = true;
    } else {
      return null;
    }

    if (SIGNAL_QUERY_FACTORIES.indexOf(kind) > -1 || SIGNAL_MEMBER_FACTORIES.indexOf(kind) === -1) {
      return null;
    }

    return {kind, required};
  }

  visitSignalInput(property, signalFactory) {
    return {
      name: this.signalAlias(property, signalFactory) || property.name.text,
      defaultValue: this.signalDefaultValue(property, signalFactory),
      type: this.unwrapSignalType(property),
      description: getDescription(property.symbol, this.typeChecker)
    };
  }

  visitSignalOutput(property, signalFactory) {
    return {
      name: this.signalAlias(property, signalFactory) || property.name.text,
      type: this.unwrapSignalType(property),
      description: getDescription(property.symbol, this.typeChecker)
    };
  }

  /**
   * The options object holding a possible `alias` is the only argument of
   * `output()` and of the `.required()` variants, and the second one otherwise.
   */
  signalAlias(property, signalFactory) {
    const optionsIndex = signalFactory.kind === 'output' || signalFactory.required ? 0 : 1;
    const options = property.initializer.arguments[optionsIndex];

    if (!options || options.kind !== ts.SyntaxKind.ObjectLiteralExpression) {
      return undefined;
    }

    for (let i = 0; i < options.properties.length; i++) {
      const option = options.properties[i];
      if (option.name && option.name.text === 'alias' && option.initializer) {
        return option.initializer.text;
      }
    }

    return undefined;
  }

  signalDefaultValue(property, signalFactory) {
    // `output()` carries no value and `input.required()` has no default by definition
    if (signalFactory.kind === 'output' || signalFactory.required) {
      return undefined;
    }

    const initialValue = property.initializer.arguments[0];
    if (!initialValue) {
      return undefined;
    }

    const stringified = this.stringifyDefaultValue(initialValue);
    if (stringified) {
      return stringified;
    }

    // defaults such as `this._config.interval` are resolved from the Config service by the docs app,
    // printing the raw expression there would be noise
    return isLiteralDefaultValue(initialValue) ? initialValue.getText() : undefined;
  }

  /**
   * `InputSignal<string>` -> `string`, so that docs describe the bound value
   * rather than the signal wrapper. `InputSignalWithTransform<ReadT, WriteT>` is
   * reported as ReadT: WriteT is whatever the transform accepts, usually `unknown`,
   * which says nothing about the input.
   */
  unwrapSignalType(node) {
    const printed = this.visitType(node);
    const match = /^([A-Za-z0-9_]+)<([\s\S]+)>$/.exec(printed);

    if (!match || SIGNAL_TYPE_WRAPPERS.indexOf(match[1]) === -1) {
      return printed;
    }

    return splitTypeArguments(match[2])[0] || printed;
  }

  visitOutput(property, outDecorator) {
    const outArgs = outDecorator.expression.arguments;
    return {
      name: outArgs.length ? outArgs[0].text : property.name.text,
      description: getDescription(property.symbol, this.typeChecker)
    };
  }

  /**
   * A config holding its defaults in a nested object, as `PaginationConfig.main` does, is documented
   * per key (`main.itemsPerPage`) rather than as one row carrying the whole literal: that is also how
   * such a config is read and written by consumers.
   * Returns null for anything that is not initialized with an object literal.
   */
  expandObjectLiteralProperty(property) {
    if (!property.initializer || property.initializer.kind !== ts.SyntaxKind.ObjectLiteralExpression) {
      return null;
    }

    const nested = property.initializer.properties
      .filter(entry => entry.kind === ts.SyntaxKind.PropertyAssignment && entry.name)
      .map(entry => ({
        name: `${property.name.text}.${entry.name.text}`,
        defaultValue: this.stringifyDefaultValue(entry.initializer) ||
          (isLiteralDefaultValue(entry.initializer) ? entry.initializer.getText() : undefined),
        type: this.visitWidenedType(entry.name),
        description: entry.symbol ? getDescription(entry.symbol, this.typeChecker) : ''
      }));

    return nested.length ? nested : null;
  }

  visitProperty(property) {
    return {
      name: property.name.text,
      defaultValue: property.initializer ? this.stringifyDefaultValue(property.initializer) : undefined,
      type: this.visitType(property),
      description: getDescription(property.symbol, this.typeChecker)
    };
  }

  visitType(node) {
    return node ? this.typeChecker.typeToString(this.typeChecker.getTypeAtLocation(node)) : 'void';
  }

  // inside an object literal a value keeps its literal type, so `false` has to be widened to `boolean`
  visitWidenedType(node) {
    if (!node) {
      return 'void';
    }

    const type = this.typeChecker.getTypeAtLocation(node);

    return this.typeChecker.typeToString(this.typeChecker.getBaseTypeOfLiteralType(type));
  }

  isDirectiveDecorator(decorator) {
    const decoratorIdentifierText = decorator.expression.expression.text;
    return decoratorIdentifierText === 'Directive' || decoratorIdentifierText === 'Component';
  }

  isServiceDecorator(decorator) {
    return decorator.expression.expression.text === 'Injectable';
  }

  getDecoratorOfType(node, decoratorType) {
    const decorators = getDecorators(node);

    for (let i = 0; i < decorators.length; i++) {
      if (decorators[i].expression.expression &&
        decorators[i].expression.expression.text === decoratorType) {
        return decorators[i];
      }
    }

    return null;
  }
}

function parseOutApiDocs(programFiles) {
  const apiDocVisitor = new APIDocVisitor(programFiles);

  return programFiles.reduce(
    (soFar, file) => {
      const directivesInFile = apiDocVisitor.visitSourceFile(file);

      directivesInFile.forEach((directive) => {
        soFar[directive.className] = directive;
      });

      return soFar;
    },
    {});
}

module.exports = parseOutApiDocs;
