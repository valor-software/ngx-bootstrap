export declare class PositionService {
    position(nativeEl: HTMLElement): {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    offset(nativeEl: any): {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    positionElements(hostEl: HTMLElement, targetEl: HTMLElement, positionStr: string, appendToBody: boolean): {
        top: number;
        left: number;
    };
    private window;
    private document;
    private getStyle(nativeEl, cssProp);
    private isStaticPositioned(nativeEl);
    private parentOffsetEl(nativeEl);
}
export declare const positionService: PositionService;
