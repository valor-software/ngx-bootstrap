import { Observable } from "rxjs";

export interface IModalDialogButton {
    text: string;
    class?: string;
    /**
     * Specifies a value that indicates whether the Button is `disabled` or not.
     * @default false.
     */
    disabled?: boolean;
    click?: ModalDialogOnAction;
}

export type ModalDialogOnAction = () => Promise<any> | Observable<any> | boolean | void;