import { SlideComponent } from '../slide.component';

export interface SlideWithIndex {
  item: SlideComponent;
  index: number;
}

export interface IndexedSlideList {
  list: SlideWithIndex[];
  index: number;
}
