import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { EMPTY } from 'rxjs';

import { BsModalService, ModalOptions } from '../../modal/index';

class TestService { }

describe('Service: BsModal', () => {
  let mockModalComponentRef: any;
  let mockComponentLoader: any;
  let bsModalService: BsModalService;

  function createMockComponentLoader(baseName: string): any {
    const componentLoader = jasmine.createSpyObj(baseName, [
      'attach',
      'getInnerComponent',
      'hide',
      'provide',
      'show',
      'instance',
      'to'
    ]);
    componentLoader.attach.and.returnValue(componentLoader);
    componentLoader.hide.and.returnValue(componentLoader);
    componentLoader.provide.and.returnValue(componentLoader);
    componentLoader.to.and.returnValue(componentLoader);
    componentLoader.instance.and.returnValue(componentLoader);

    componentLoader.onBeforeShow = EMPTY;
    componentLoader.onShown = EMPTY;
    componentLoader.onBeforeHide = EMPTY;
    componentLoader.onHidden = EMPTY;

    return componentLoader;
  }

  beforeEach(() => {
    mockModalComponentRef = null;
    let createdBackdrop = false;
    const mockBackdropComponentLoader = createMockComponentLoader('backdropComponentLoader');
    mockComponentLoader = createMockComponentLoader('modalComponentLoader');
    const mockComponentLoaderFactory = jasmine.createSpyObj('componentLoaderFactory', [
      'createLoader'
    ]);
    TestBed.configureTestingModule({
      providers: [
        { provide: ComponentLoaderFactory, useValue: mockComponentLoaderFactory },
        BsModalService
      ]
    });

    mockComponentLoader.show.and.callFake(mockShow);
    mockComponentLoaderFactory.createLoader.and.callFake(mockCreateLoader);

    bsModalService = TestBed.inject(BsModalService);

    function mockCreateLoader() {
      if (createdBackdrop) {
        return mockComponentLoader;
      } else {
        createdBackdrop = true;

        return mockBackdropComponentLoader;
      }
    }
  });

  function mockShow() {
    return mockModalComponentRef;
  }

  describe('showModal', () => {
    it('should add providers to modal injector', () => {
      const content = 'testContent';
      const provider: StaticProvider = {
        provide: TestService,
        useClass: TestService
      };
      const options: ModalOptions = {
        providers: [
          provider
        ]
      };
      const mockModalInstance = jasmine.createSpyObj('modalInstance', [
        'hide'
      ]);
      mockModalComponentRef = {
        instance: mockModalInstance
      };

      bsModalService.show(content, options);

      expect(mockComponentLoader.provide).toHaveBeenCalledWith(provider);
    });
  });
});
