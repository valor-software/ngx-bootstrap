import { BaseComponent } from './base.component';

export class ModalsPo extends BaseComponent {
  pageUrl = '/modals';
  pageTitle = 'Modals';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/modal';

  exampleTitlesArr = [
    'Template',
    'Component',
    'Nested',
    'Events',
    'Confirm Window',
    'Option',
    'Static modal',
    'Optional sizes',
    'Child modal',
    'Nested modals',
    'Modal events',
    'Auto shown modal'
  ];

  exampleDemosArr = [
    'demo-modal-service-static',
    'demo-modal-service-component',
    'demo-modal-service-nested',
    'demo-modal-service-events',
    'demo-modal-service-confirm-window',
    'demo-modal-service-options',
    'demo-modal-static',
    'demo-modal-sizes',
    'demo-modal-child',
    'demo-modal-nested',
    'demo-modal-events',
    'demo-modal-auto-shown'
  ];
}
