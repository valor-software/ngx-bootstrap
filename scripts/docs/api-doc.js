'use strict';

const ts = require('typescript');
const fs = require('fs');
const marked = require('marked');

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => (`<a href=\"${href}\" target="_blank" title=\"${title}\">${text}</a>`);
marked.setOptions({gfm: true});

const getDescription = (symbol) => marked(
  ts.displayPartsToString(symbol.getDocumentationComment()),
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

function isInternalMember(member) {
  // todo: could be an issue, as for now lets skip members without a symbol
  if (!member.symbol) {
    return true;
  }
  const jsDoc = ts.displayPartsToString(member.symbol.getDocumentationComment());
  return jsDoc.trim().length === 0 || jsDoc.indexOf('@internal') > -1;
}

function isAngularLifecycleHook(methodName) {
  return ANGULAR_LIFECYCLE_METHODS.indexOf(methodName) >= 0;
}

function isPrivateOrInternal(member) {
  return ((member.flags & ts.NodeFlags.Private) !== 0) || isInternalMember(member);
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
    const description = getDescription(symbol);
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
    const description = getDescription(symbol);
    const className = classDeclaration.name.text;
    let directiveInfo, members;

    if (classDeclaration.decorators) {
      for (let i = 0; i < classDeclaration.decorators.length; i++) {
        if (this.isDirectiveDecorator(classDeclaration.decorators[i])) {
          directiveInfo = this.visitDirectiveDecorator(classDeclaration.decorators[i]);
          members = this.visitMembers(classDeclaration.members);

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
        } else if (this.isServiceDecorator(classDeclaration.decorators[i])) {
          members = this.visitMembers(classDeclaration.members);

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
      members = this.visitMembers(classDeclaration.members);

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

  visitMembers(members) {
    const inputs = [];
    const outputs = [];
    const methods = [];
    const properties = [];
    let inputDecorator, outDecorator;

    for (let i = 0; i < members.length; i++) {
      inputDecorator = this.getDecoratorOfType(members[i], 'Input');
      outDecorator = this.getDecoratorOfType(members[i], 'Output');

      if (inputDecorator) {
        inputs.push(this.visitInput(members[i], inputDecorator));

      } else if (outDecorator) {
        outputs.push(this.visitOutput(members[i], outDecorator));

      } else if (!isPrivateOrInternal(members[i])) {
        if ((members[i].kind === ts.SyntaxKind.MethodDeclaration ||
          members[i].kind === ts.SyntaxKind.MethodSignature) &&
          !isAngularLifecycleHook(members[i].name.text)) {
          methods.push(this.visitMethodDeclaration(members[i]));
        } else if (
          members[i].kind === ts.SyntaxKind.PropertyDeclaration ||
          members[i].kind === ts.SyntaxKind.PropertySignature || members[i].kind === ts.SyntaxKind.GetAccessor) {
          properties.push(this.visitProperty(members[i]));
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
      description: getDescription(method.symbol),
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
      description: getDescription(property.symbol)
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

  visitOutput(property, outDecorator) {
    const outArgs = outDecorator.expression.arguments;
    return {
      name: outArgs.length ? outArgs[0].text : property.name.text,
      description: getDescription(property.symbol)
    };
  }

  visitProperty(property) {
    return {
      name: property.name.text,
      defaultValue: property.initializer ? this.stringifyDefaultValue(property.initializer) : undefined,
      type: this.visitType(property),
      description: getDescription(property.symbol)
    };
  }

  visitType(node) {
    return node ? this.typeChecker.typeToString(this.typeChecker.getTypeAtLocation(node)) : 'void';
  }

  isDirectiveDecorator(decorator) {
    const decoratorIdentifierText = decorator.expression.expression.text;
    return decoratorIdentifierText === 'Directive' || decoratorIdentifierText === 'Component';
  }

  isServiceDecorator(decorator) {
    return decorator.expression.expression.text === 'Injectable';
  }

  getDecoratorOfType(node, decoratorType) {
    const decorators = node.decorators || [];

    for (let i = 0; i < decorators.length; i++) {
      if (decorators[i].expression.expression.text === decoratorType) {
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
