import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { form, min, FormField, FormRoot, required } from '@angular/forms/signals';
import { IPlan } from '@core/interfaces';
import { HSOverlay } from 'flyonui/flyonui';
import { PlanService } from './services/plans';

const INITIAL_FORM_VALUE: PlanData = {
  amount: 0,
  bonus: 0,
  isActive: true,
};

interface PlanData {
  _id?: string;
  amount: number;
  bonus: number;
  isActive: boolean;
}
const planModel = signal<PlanData>(INITIAL_FORM_VALUE);

@Component({
  selector: 'app-plans',
  imports: [CurrencyPipe, FormRoot, FormField],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans {
  protected readonly resource = httpResource<IPlan[]>(() => `${API_URL}/v1/plan`);
  protected readonly service = inject(PlanService);

  protected form = form(
    planModel,
    (validator) => {
      required(validator.amount, { message: 'El monto es requerido' });
      min(validator.amount, 1, { message: 'El monto debe ser al menos 1' });
      required(validator.bonus, { message: 'El bono es requerido' });
      min(validator.bonus, 1, { message: 'El bono debe ser al menos 1' });
    },
    {
      submission: {
        action: async (f) =>
          f().value()._id ? await this.update(f().value()) : await this.create(f().value()),
      },
    },
  );

  private readonly document = inject(DOCUMENT);
  protected selectedPlan: IPlan | null = null;

  openModal(isEdit: boolean, category: IPlan | null): void {
    this.selectedPlan = category;

    const body: PlanData = {
      amount: category?.amount ?? 0,
      bonus: category?.bonus ?? 0,
      isActive: category?.isActive ?? true,
    };

    if (isEdit) {
      body._id = category!._id;
    }
    planModel.set(body);
    const modal = new HSOverlay(this.document.querySelector('#update-form-modal')!);
    modal.open();
  }
  closeModal(): void {
    this.form().reset(INITIAL_FORM_VALUE);
    const modal = new HSOverlay(this.document.querySelector('#update-form-modal')!);
    modal.close();
  }

  async update(f: PlanData): Promise<void> {
    this.service.update(f).subscribe(() => window.location.reload());
  }

  async create(f: PlanData): Promise<void> {
    this.service.create(f).subscribe(() => window.location.reload());
  }
}
