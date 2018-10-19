export declare class ModalOptions {
    /**
     *  Includes a modal-backdrop element. Alternatively,
     *  specify static for a backdrop which doesn't close the modal on click.
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
    /**
     * Modal data
     */
    initialState?: Object;
}
export declare const modalConfigDefaults: ModalOptions;
export declare const CLASS_NAME: any;
export declare const SELECTOR: any;
export declare const TRANSITION_DURATIONS: any;
export declare const DISMISS_REASONS: {
    BACKRDOP: string;
    ESC: string;
};
