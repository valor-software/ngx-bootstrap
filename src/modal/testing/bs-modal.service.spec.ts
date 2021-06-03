import { StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { EMPTY } from 'rxjs';
import { createSpyObj } from 'jest-createspyobj';

import { BsModalService, ModalOptions } from '../index';

class TestService { }

describe('Service: BsModal', () => {
  let mockModalComponentRef: { instance: {[k: string]: jest.Mock} } | undefined;
  let mockComponentLoader: { [k: string]: jest.Mock };
  let bsModalService: BsModalService;

  function createMockComponentLoader(baseName: string): { [k: string]: jest.Mock } {
    const componentLoader = createSpyObj(baseName, [
      'attach',
      'getInnerComponent',
      'hide',
      'provide',
      'show',
      'instance',
      'to'
    ]);
    componentLoader.attach.mockReturnValue(componentLoader);
    componentLoader.hide.mockReturnValue(componentLoader);
    componentLoader.provide.mockReturnValue(componentLoader);
    componentLoader.to.mockReturnValue(componentLoader);
    componentLoader.instance.mockReturnValue(componentLoader);

    Object.defineProperties(componentLoader, {
      onBeforeShow: {value: EMPTY},
      onShown: {value: EMPTY},
      onBeforeHide: {value: EMPTY},
      onHidden: {value: EMPTY},
    });

    return componentLoader;
  }

  beforeEach(() => {
    mockModalComponentRef = void 0;
    let createdBackdrop = false;
    const mockBackdropComponentLoader = createMockComponentLoader('backdropComponentLoader');
    mockComponentLoader = createMockComponentLoader('modalComponentLoader');
    const mockComponentLoaderFactory = createSpyObj('componentLoaderFactory', [
      'createLoader'
    ]);
    TestBed.configureTestingModule({
      providers: [
        { provide: ComponentLoaderFactory, useValue: mockComponentLoaderFactory },
        BsModalService
      ]
    });

    mockComponentLoader.show.mockImplementation(mockShow);
    // mockComponentLoader.show.and.callFake(mockShow);
    mockComponentLoaderFactory.createLoader.mockImplementation(mockCreateLoader);
    // mockComponentLoaderFactory.createLoader.and.callFake(mockCreateLoader);

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
      const mockModalInstance = createSpyObj('modalInstance', ['hide']);
      mockModalComponentRef = { instance: mockModalInstance };

      bsModalService.show(content, options);

      expect(mockComponentLoader.provide).toHaveBeenCalledWith(provider);
    });
  });
});
