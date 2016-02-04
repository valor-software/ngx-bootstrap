import {Accordion, AccordionPanel} from './components/accordion';
import {Alert} from './components/alert';
import {ButtonCheckbox, ButtonRadio} from './components/buttons';
import {Carousel, Slide} from './components/carousel';
import {Collapse} from './components/collapse';
import {DatePicker} from './components/datepicker';
import {Dropdown} from './components/dropdown';
import {Pagination, Pager} from './components/pagination';
import {Progressbar, Progress} from './components/progressbar';
import {Rating} from './components/rating';
import {Tabset, Tab, TabHeading} from './components/tabs';
import {Timepicker} from './components/timepicker';
import {Tooltip} from './components/tooltip';
import {Typeahead} from './components/typeahead';

export * from  './components/accordion';
export * from  './components/alert';
export * from  './components/buttons';
export * from  './components/carousel';
export * from  './components/collapse';
export * from  './components/datepicker';
export * from  './components/dropdown';
export * from  './components/pagination';
export * from  './components/progressbar';
export * from  './components/rating';
export * from  './components/tabs';
export * from  './components/timepicker';
export * from  './components/tooltip';
export * from  './components/typeahead';

export * from  './components/position'
export * from  './components/common'
export * from  './components/ng2-bootstrap-config';

export default {
  directives: [Dropdown, Progress, Tab, TabHeading],
  components: [
    Accordion,
    AccordionPanel,
    ButtonCheckbox,
    ButtonRadio,
    Carousel,
    Slide,
    Collapse,
    DatePicker,
    Pagination,
    Pager,
    Rating,
    Tabset,
    Timepicker,
    Tooltip,
    Typeahead
  ]
}
