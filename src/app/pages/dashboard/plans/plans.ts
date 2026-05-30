import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { IPlan } from '@core/interfaces';
import { HSOverlay } from 'flyonui/flyonui';
import { PlanService } from './services/plans';

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
  protected readonly service = inject(PlanService);

  protected form = form(planModel, () => {}, {
    submission: {
      action: async (f) => await this.onSubmit(f().value()),
    },
  });

  private readonly document = inject(DOCUMENT);
  protected selectedPlan: IPlan | null = null;

  async onSubmit(planData: PlanData): Promise<void> {
    if (!this.selectedPlan) return;
    this.service
      .update(this.selectedPlan._id, planData)
      .subscribe((_) => window.location.reload());
  }

  openModal(plan: IPlan): void {
    this.selectedPlan = plan;
    planModel.set({ amount: plan.amount, bonus: plan.bonus, isActive: plan.isActive });
    const modal = new HSOverlay(this.document.querySelector('#update-form-modal')!);
    modal.open();
  }

  closeModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#update-form-modal')!);
    modal.close();
  }
}
