type AvailablePlacement = 'start' | 'end' | 'top' | 'bottom';
export type OffcanvasConfigType = {
  placement: AvailablePlacement;
  headerTitle: string;
  backdrop: boolean;
}

export const OffcanvasConfig: OffcanvasConfigType = {
  /** default placement of element is left side */
  placement: 'start',
  /** default headerTitle is empty */
  headerTitle: '',
  /** in default config backdrop is available */
  backdrop: true
}
