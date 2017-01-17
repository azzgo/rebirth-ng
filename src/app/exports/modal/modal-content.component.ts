import {
  Component, OnInit, ComponentRef, ViewContainerRef, Injector, OnDestroy, EventEmitter,
  ChangeDetectionStrategy, HostListener
} from '@angular/core';
import { ModalOptions } from './modal-options.model';
import { Modal } from './modal.model';

@Component({
  selector: 're-modal-content',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'modalContent'
})
export class ModalContentComponent implements OnInit, OnDestroy {

  modalContentRef: ComponentRef<Modal>;

  constructor(private modalContentContainer: ViewContainerRef, private  injector: Injector) {

  }

  @HostListener('click', ['$event'])
  onContentClick($event: Event) {
    console.log("onContentClick============");
    $event.stopPropagation();
  }

  addContent<T>(options: ModalOptions, resolveEventEmitter: EventEmitter<any>) {
    const componentFactory = options.componentFactoryResolver.resolveComponentFactory(options.component);
    this.modalContentRef = this.modalContentContainer
      .createComponent(componentFactory, this.modalContentContainer.length, options.injector || this.injector);
    const instance: Modal = this.modalContentRef.instance;
    instance.dismiss = resolveEventEmitter;
    this.handleResolve(options, instance);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.modalContentRef.destroy();
  }

  private handleResolve(options: ModalOptions, instance: Modal) {
    const resolve = options.resolve || {};
    if (resolve.then) {
      resolve.then(data => instance.context = data);
    } else if (resolve.subscribe) {
      resolve.subscribe(data => instance.context = data);
    } else {
      instance.context = resolve;
    }
  }
}
