import { Story, Meta } from '@storybook/angular/types-6-0';
import  AccordionComponent from './accordion.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'accordion',
  component: AccordionComponent,
  decorators: [
    moduleMetadata({
    imports: [AccordionModule.forRoot(), BrowserAnimationsModule],
    }),
  ],
  argTypes: {
    isOpenChange: { action: 'isOpenChange' },

  }
} as Meta;

const Template: Story<AccordionComponent> = (args: AccordionComponent) => ({
  props:args
});

export const Default = Template.bind({});
Default.args = {
  label: 'Another group with changeable label',
  width: 100,
  closeOthers: false,
  customHTML: false,
  isDisabled: false,
  isOpen: true,
  customClass: false,
};


