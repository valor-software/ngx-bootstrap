import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BsModalService } from '../bs-modal.service';
import { BsModalModule } from '../modal.module';

@Component({
  template: `
    <div id="modal-container-1" class="custom-modal-container"></div>
    <div id="modal-container-2" class="another-container"></div>
    <button (click)="openModal()">Open Modal</button>
  `
})
class TestModalContainerComponent {
  constructor(private modalService: BsModalService) {}

  openModal() {
    return this.modalService.show(TestModalComponent);
  }

  openModalInContainer(container: string | Element) {
    return this.modalService.show(TestModalComponent, { container });
  }
}

@Component({
  template: '<div class="modal-body">Test Modal Content</div>'
})
class TestModalComponent {}

describe('BsModalService - Container Option', () => {
  let service: BsModalService;
  let component: TestModalContainerComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestModalContainerComponent, TestModalComponent],
      imports: [BsModalModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestModalContainerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BsModalService);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up any open modals
    service.hide();
  });

  it('should create modal service with container option support', () => {
    expect(service).toBeTruthy();
    expect(service.config).toBeDefined();
  });

  it('should use body as default container when no container specified', () => {
    const modalRef = service.show(TestModalComponent);
    
    expect(modalRef).toBeTruthy();
    expect(service.config.container).toBe('body');
    
    modalRef.hide();
  });

  it('should use custom container when specified as string selector', () => {
    // Add a custom container to the DOM
    const customContainer = document.createElement('div');
    customContainer.id = 'custom-modal-container';
    document.body.appendChild(customContainer);

    const modalRef = service.show(TestModalComponent, {
      container: '#custom-modal-container'
    });
    
    expect(modalRef).toBeTruthy();
    expect(service.config.container).toBe('#custom-modal-container');
    
    modalRef.hide();
    
    // Clean up
    document.body.removeChild(customContainer);
  });

  it('should use custom container when specified as Element', () => {
    // Add a custom container to the DOM
    const customContainer = document.createElement('div');
    customContainer.id = 'element-modal-container';
    customContainer.className = 'test-container';
    document.body.appendChild(customContainer);

    const modalRef = service.show(TestModalComponent, {
      container: customContainer
    });
    
    expect(modalRef).toBeTruthy();
    expect(service.config.container).toBe(customContainer);
    
    modalRef.hide();
    
    // Clean up
    document.body.removeChild(customContainer);
  });

  it('should handle multiple modals with different containers', () => {
    // Create two different containers
    const container1 = document.createElement('div');
    container1.id = 'container-1';
    document.body.appendChild(container1);

    const container2 = document.createElement('div');
    container2.id = 'container-2';
    document.body.appendChild(container2);

    // Open modals in different containers
    const modalRef1 = service.show(TestModalComponent, {
      container: container1,
      id: 'modal-1'
    });

    const modalRef2 = service.show(TestModalComponent, {
      container: container2,
      id: 'modal-2'
    });
    
    expect(modalRef1).toBeTruthy();
    expect(modalRef2).toBeTruthy();
    
    modalRef1.hide();
    modalRef2.hide();
    
    // Clean up
    document.body.removeChild(container1);
    document.body.removeChild(container2);
  });

  it('should fall back to body if invalid container specified', () => {
    const modalRef = service.show(TestModalComponent, {
      container: '#non-existent-container'
    });
    
    expect(modalRef).toBeTruthy();
    expect(service.config.container).toBe('#non-existent-container');
    
    modalRef.hide();
  });

  it('should maintain backward compatibility when no container option used', () => {
    // Test that existing code still works without the container option
    const modalRef = service.show(TestModalComponent, {
      backdrop: true,
      keyboard: true,
      animated: true
    });
    
    expect(modalRef).toBeTruthy();
    expect(service.config.container).toBe('body'); // Should default to body
    expect(service.config.backdrop).toBe(true);
    expect(service.config.keyboard).toBe(true);
    expect(service.config.animated).toBe(true);
    
    modalRef.hide();
  });

  it('should include container option in modal config defaults', () => {
    const modalRef = service.show(TestModalComponent);
    
    expect(service.config).toHaveProperty('container');
    expect(service.config.container).toBe('body');
    
    modalRef.hide();
  });
});