import { Injectable } from "@angular/core";

export type AvailablePlacement = 'start' | 'end' | 'top' | 'bottom';
export type OffcanvasConfigType = {
  placement: Partial<AvailablePlacement>;
  headerTitle: string;
  backdrop: boolean;
  backdropScrolling: boolean;
};

/** Default offcanvas configuration */
@Injectable({
  providedIn: 'root'
})
export class OffcanvasConfig implements OffcanvasConfigType{
  /** default placement of element is left side */
  placement: Partial<AvailablePlacement> = 'start';
  /** default headerTitle is empty */
  headerTitle =  '';
  /** in default configuration backdrop is available */
  backdrop = true;
  /** in default configuration backdrop scrolling is enabled */
  backdropScrolling = true;
};
