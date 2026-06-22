import { Component, input, output } from '@angular/core';
import { TModalSize } from '@core/types';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.html'
})
export class Modal {
  title = input<string>('');
  size = input<TModalSize>('default');

  isOpen = input<boolean>(false);
  closeModal = output<boolean>();

  onClose(value: boolean) {
    this.closeModal.emit(value);
  }
}
