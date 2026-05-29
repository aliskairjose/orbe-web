import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, DOCUMENT, inject } from '@angular/core';
import { IPlan } from '@core/interfaces';
import { HSOverlay } from 'flyonui/flyonui';

@Component({
  selector: 'app-plans',
  imports: [CurrencyPipe],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans {
  private readonly document = inject(DOCUMENT);

  resource = httpResource<IPlan[]>(() => `${API_URL}/v1/plan`);

  openModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#update-form-modal')!);
    modal.open();
  }

  closeModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#update-form-modal')!);
    modal.close();
  }
}
