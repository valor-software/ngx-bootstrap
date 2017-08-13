/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
export declare class Positioning {
    position(element: HTMLElement, round?: boolean): ClientRect;
    offset(element: HTMLElement, round?: boolean): ClientRect;
    positionElements(hostElement: HTMLElement, targetElement: HTMLElement, placement: string, appendToBody?: boolean): ClientRect;
    private getStyle(element, prop);
    private isStaticPositioned(element);
    private offsetParent(element);
}
export declare function positionElements(hostElement: HTMLElement, targetElement: HTMLElement, placement: string, appendToBody?: boolean): void;
