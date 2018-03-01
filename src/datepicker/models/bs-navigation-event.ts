import { TimeUnit } from 'ngx-bootstrap/chronos';
import { BsNavigationDirection } from './bs-navigation-direction';

export interface BsNavigationEvent {
  direction?: BsNavigationDirection;
  step?: TimeUnit;
}
