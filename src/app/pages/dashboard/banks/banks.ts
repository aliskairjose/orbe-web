import { httpResource } from '@angular/common/http';
import { Component, computed, DOCUMENT, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { ITEM_PER_PAGE } from '@core/constants';
import { IBank } from '@core/interfaces';
import { IResponse } from '@core/interfaces/response';
import { HSOverlay } from 'flyonui/dist';
import { BankService } from './service/bank';
import { Paginator } from '@core/components';

const INITIAL_FORM_VALUE: Data = {
  name: '',
  country: '',
  isActive: true,
};

interface Data {
  _id?: string;
  name: string;
  country: string;
  isActive: boolean;
}

const Model = signal<Data>(INITIAL_FORM_VALUE);

@Component({
  selector: 'app-banks',
  imports: [FormField, FormRoot, FormsModule, Paginator],
  templateUrl: './banks.html',
  styleUrl: './banks.css',
})
export class Banks {
  private readonly document = inject(DOCUMENT);
  private readonly service = inject(BankService);

  protected readonly countries: string[] = ['Venezuela', 'Colombia'];

  protected form = form(
    Model,
    (validator) => {
      required(validator.name, { message: 'El nombre es requerido' });
      required(validator.country, { message: 'El país es requerido' });
    },
    {
      submission: {
        action: async (f) => 
          f().value()._id ? this.update(f().value()) : this.create(f().value()),
      },
    },
  );

  private readonly url = `${API_URL}/v1/bank`;
  protected search = model<string>('');

  protected readonly itemsPerPage = [5, 10, 15, 20];
  protected selected = 20;
  protected limit = signal(ITEM_PER_PAGE);
  protected page = signal(1);

  protected selectedBank = signal<IBank | null>(null);

  protected resource = httpResource<IResponse<IBank>>(() => ({
    url: this.url,
    params: {
      limit: this.limit(),
      page: this.page(),
      search: this.search() ?? '',
    },
  }));

  onPageChange({ value }: any): void {
    this.selected = value;
    this.limit.set(value);
    this.page.set(1);
  }

  goTopage(page: number): void {
    this.page.set(page);
  }

  openModal(isEdit: boolean, category: IBank | null): void {
    this.selectedBank.set(category);

    const body: Data ={
      name: category?.name ?? '',
      country: category?.country ?? '',
      isActive: category?.isActive ?? true,
    }

    if(isEdit) {
      body._id = category!._id;
    }
    Model.set(body);
    const modal = new HSOverlay(this.document.querySelector('#update-form-modal')!);
    modal.open();
  }

  closeModal(): void {
    this.form().reset(INITIAL_FORM_VALUE);

    const modal = new HSOverlay(this.document.querySelector('#update-form-modal')!);
    modal.close();
  }

  async update(f: Data): Promise<void> {
    this.service.update(f).subscribe(() => window.location.reload());
  }

  async create(f: Data): Promise<void> {
    this.service.create(f).subscribe(() => window.location.reload());
  }
}
