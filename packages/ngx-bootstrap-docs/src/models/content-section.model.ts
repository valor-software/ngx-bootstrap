import {Component} from "@builder.io/qwik";

export type ComponentApi = {
    title?: string;
    anchor?: string;
    outlet: any;
    showMethods?: boolean;
}

export type ContentSection = {
    name?: string;
    anchor?: string;
    outlet?: any;
    description?: string;
    content?: ComponentExample[];
    importInfo?: string;
    tabName?: 'overview' | 'api' | 'examples';
    usage?: SourceCodeModel;
}

export type SourceCodeModel = {
    default: string;
}

export type ComponentExample = {
    anchor: string;
    title: string;
    description?: string;
    component?: string;
    html: string;
    style?: string;
    css?: string;
    outlet?: any; // ToDo: Component<T>
}
