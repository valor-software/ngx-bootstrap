import {
  ApplicationRef, ViewContainerRef, ComponentRef, ComponentResolver, Type, ComponentFactory,
  Injectable, ReflectiveInjector, Provider, Injector
} from '@angular/core';

/**
 * Components helper class to easily work with
 * allows to:
 * - get application root view container ref
 */
@Injectable()
export class ComponentsHelper {

  private applicationRef:ApplicationRef;
  private componentResolver:ComponentResolver;
  private injector: Injector;

  public constructor(applicationRef:ApplicationRef, componentResolver:ComponentResolver, injector: Injector) {
    this.applicationRef = applicationRef;
    this.componentResolver = componentResolver;
    this.injector = injector;
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
  public getRootViewContainerRef():ViewContainerRef {
    // The only way for now (by @mhevery)
    // https://github.com/angular/angular/issues/6446#issuecomment-173459525
    // this is a class of application bootstrap component (like my-app)
    const classOfRootComponent = this.applicationRef.componentTypes[0];
    // this is an instance of application bootstrap component
    const appInstance = this.injector.get(classOfRootComponent);
    return appInstance.viewContainerRef;
  }

  /**
   * Helper methods to add ComponentClass(like modal backdrop) with options
   * of type ComponentOptionsClass to element next to application root
   * or next to provided instance of view container
   * @param ComponentClass - @Component class
   * @param ComponentOptionsClass - options class
   * @param options - instance of options
   * @param _viewContainerRef - optional instance of ViewContainerRef
   * @returns {Promise<ComponentRef<T>>} - returns a promise with ComponentRef<T>
   */
  public appendNextToRoot<T extends Type,N>(ComponentClass:T, ComponentOptionsClass:N, options:any, _viewContainerRef?:ViewContainerRef):Promise<ComponentRef<any>> {
    return this.componentResolver
      .resolveComponent(ComponentClass)
      .then((componentFactory:ComponentFactory<T>) => {
        const viewContainerRef = _viewContainerRef || this.getRootViewContainerRef();
        let bindings = ReflectiveInjector.resolve([
          new Provider(ComponentOptionsClass, {useValue: options})
        ]);
        const ctxInjector = viewContainerRef.parentInjector;

        const childInjector = Array.isArray(bindings) && bindings.length > 0 ?
          ReflectiveInjector.fromResolvedProviders(bindings, ctxInjector) : ctxInjector;
        return viewContainerRef.createComponent(componentFactory, viewContainerRef.length, childInjector);
      });
  }
}
