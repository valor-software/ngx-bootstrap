import {
  ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ReflectiveInjector, ViewContainerRef,
  ResolvedReflectiveProvider
} from '@angular/core';
import { ConcreteType, isPresent } from '@angular/core/src/facade/lang';
import {DOCUMENT} from '@angular/platform-browser';

/**
 * Components helper class to easily work with
 * allows to:
 * - get application root view container ref
 */
@Injectable()
export class ComponentsHelper {
  public constructor(private applicationRef:ApplicationRef,
                     private componentFactoryResolver:ComponentFactoryResolver,
                     private injector:Injector) {
  }

  public getDocument():any {
    return this.injector.get(DOCUMENT);
  }

  /**
   * This is a name conventional class to get application root view component ref
   * to made this method working you need to add:
   * ```typescript
   *  @Component({
   *   selector: 'my-app',
   *   ...
   *   })
   *  export class MyApp {
   *    constructor(viewContainerRef: ViewContainerRef) {
   *        // A Default view container ref, usually the app root container ref.
   *        // Has to be set manually until we can find a way to get it automatically.
   *        this.viewContainerRef = viewContainerRef;
   *      }
   *  }
   * ```
   * @returns {ViewContainerRef} - application root view component ref
   */
  public getRootViewContainerRef(injector: Injector):ViewContainerRef {
    // The only way for now (by @mhevery)
    // https://github.com/angular/angular/issues/6446#issuecomment-173459525
    // this is a class of application bootstrap component (like my-app)
    const classOfRootComponent = this.applicationRef.componentTypes[0];
    // this is an instance of application bootstrap component
    const appInstance = injector.get(classOfRootComponent);
    return appInstance.viewContainerRef;
  }

  /**
   * Creates an instance of a Component and attaches it to the View Container found at the
   * `location` specified as {@link ViewContainerRef}.
   *
   * You can optionally provide `providers` to configure the {@link Injector} provisioned for this
   * Component Instance.
   *
   * Returns {@link ComponentRef} representing the newly created Component.
   * @param ComponentClass - @Component class
   * @param location - reference to the location
   * @param providers - optional array of providers
   * @returns {ComponentRef<T>} - returns ComponentRef<T>
   */
  public appendNextToLocation<T>(ComponentClass: ConcreteType<T>,
                                 location: ViewContainerRef,
                                 providers?: ResolvedReflectiveProvider[]): ComponentRef<T> {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
    let parentInjector = location.parentInjector;
    let childInjector = isPresent(providers) && providers.length > 0 ?
      ReflectiveInjector.fromResolvedProviders(providers, parentInjector) : parentInjector;
    return location.createComponent(componentFactory, location.length, childInjector);
  }

  /**
   * Helper methods to add ComponentClass(like modal backdrop) with options
   * of type ComponentOptionsClass to element next to application root
   * or next to provided instance of view container
   * @param ComponentClass - @Component class
   * @param ComponentOptionsClass - options class
   * @param options - instance of options
   * @param contextInjector - injector to resolve root view container (any injector except root injector will fit)
   * @returns {ComponentRef<T>} - returns ComponentRef<T>
   */
  public appendNextToRoot<T>(ComponentClass: ConcreteType<T>,
                             ComponentOptionsClass: any,
                             options: any,
                             contextInjector: Injector): ComponentRef<T> {
    let location = this.getRootViewContainerRef(contextInjector);
    let providers = ReflectiveInjector.resolve([
      {provide: ComponentOptionsClass, useValue: options}
    ]);
    return this.appendNextToLocation(ComponentClass, location, providers);
  }
}
