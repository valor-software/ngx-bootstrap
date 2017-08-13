export declare class ModalOptions {
    /**
     *  Includes a modal-backdrop element. Alternatively, specify static for a backdrop which doesn't close the modal on click.
     */
    backdrop?: boolean | 'static';
    /**
     * Closes the modal when escape key is pressed.
     */
    keyboard?: boolean;
    focus?: boolean;
    /**
     * Shows the modal when initialized.
     */
    show?: boolean;
    /**
     * Ignore the backdrop click
     */
    ignoreBackdropClick?: boolean;
    /**
     * Css class for opened modal
     */
    class?: string;
    /**
     * Toggle animation
     */
    animated?: boolean;
}
export declare class BsModalRef {
    /**
     * Hides the modal
     */
    hide(): void;
    /**
     * Reference to a component inside the modal. Null if modal's been created with TemplateRef
     */
    content?: any | null;
}
export declare const modalConfigDefaults: ModalOptions;
export declare const ClassName: any;
export declare const Selector: any;
export declare const TransitionDurations: any;
export declare const DISMISS_REASONS: {
    BACKRDOP: string;
    ESC: string;
};
