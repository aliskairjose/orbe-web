import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { IPlan } from '@core/interfaces';
import { HSOverlay } from 'flyonui/flyonui';

interface PlanData {
  amount: number;
  bonus: number;
  isActive: boolean;
}
const planModel = signal<PlanData>({
  amount: 0,
  bonus: 0,
  isActive: false,
});

@Component({
  selector: 'app-plans',
  imports: [CurrencyPipe, FormRoot, FormField],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans {
  protected readonly resource = httpResource<IPlan[]>(() => `${API_URL}/v1/plan`);
  
  protected form = form(planModel, () => {}, {
    submission: {
      action: async (f) => await this.onSubmit(f().value()),
    },
  });



  private readonly document = inject(DOCUMENT);
  protected selectedPlan: IPlan | null = null;

  async onSubmit(planData: PlanData): Promise<void> {
    if (!this.selectedPlan) return;
  }

  openModal(plan: IPlan): void {
    this.selectedPlan = plan;
    planModel.set(plan);
    const modal = new HSOverlay(this.document.querySelector('#update-form-modal')!);
    modal.open();
  }

  closeModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#update-form-modal')!);
    modal.close();
  }
}
