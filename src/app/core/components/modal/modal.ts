import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.html'
})
export class Modal {
  title = input<string>('');
  // Recibe si la modal debe estar abierta (Angular Signals)
  isOpen = input<boolean>(false);

  // Evento para notificar el cierre al componente padre
  closeModal = output<boolean>();

  onClose(value: boolean) {
    this.closeModal.emit(value);
  }
}
