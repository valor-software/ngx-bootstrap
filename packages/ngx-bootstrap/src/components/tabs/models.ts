export interface TabsetCustomEvent {
    tabsetId: string;
    tab: Partial<ITab>
}

export interface ITab {
    heading?: string;
    id: string;
    disabled?: boolean;
    removable?: boolean;
    customClass?: string;
    active?: boolean;
    hasCustomTemplate?: boolean;
}

