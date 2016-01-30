export declare class PositionService {
    private window;
    private document;
    private getStyle(nativeEl, cssProp);
    private isStaticPositioned(nativeEl);
    private parentOffsetEl(nativeEl);
    position(nativeEl: any): {
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
    positionElements(hostEl: any, targetEl: any, positionStr: any, appendToBody: any): {
        top: number;
        left: number;
    };
}
export declare const positionService: PositionService;
