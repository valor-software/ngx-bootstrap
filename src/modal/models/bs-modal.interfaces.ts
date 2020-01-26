export interface ModalDialogButton {
    text: string;
    class?: string;
    /**
     * Specifies a value that indicates whether the Button is `disabled` or not.
     * @default false.
     */
    disabled?: boolean;
    click?: ModalDialogOnAction;
}

export type ModalDialogOnAction = () => void;
