import { Component, computed, model, signal } from '@angular/core';
import { ITEM_PER_PAGE } from '@core/constants';
import { IResponse } from '../../../core/interfaces/response';
import { IAdvisor, IBank, IBankAccount } from '@core/interfaces';
import { httpResource } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { ERole } from '@core/enums';

interface BankAccountData {
  type: string;
  number: string;
  bank: '';
  user: ''
}

const accountModel =signal<BankAccountData>({
  type: '',
  number: '',
  bank: '',
  user: ''
});

@Component({
  selector: 'app-bank-accounts',
  imports: [FormsModule, RouterLink, FormField, FormRoot],
  templateUrl: './bank-accounts.html',
  styleUrl: './bank-accounts.css',
})
export class BankAccounts {
    form = form(
    accountModel,
    (validator) => {
      required(validator.type, { message: 'Seleccione tipo de cuenta' });
      required(validator.number, { message: 'La cuenta bancaria es obligatoria' });
      required(validator.bank, { message: 'Seleccione bank' });
      required(validator.user, { message: 'Seleccione asesor' });
    },
    {
      submission: {
        action: async (f) => console.log(f().value()),
      },
    },
  );

  protected headers = ['País', 'Banco', 'Tipo de Cuenta', 'Cuenta', 'Asesor'];

  protected search = model<string>('');

  protected readonly itemsPerPage = [5, 10, 15, 20];
  private readonly url = `${API_URL}/v1`;
  protected page = signal(ITEM_PER_PAGE);
  protected limit = signal(1);
  protected selected = 20;

  protected resource = httpResource<IResponse<IBankAccount>>(() => ({
    url: `${this.url}/bank-account`,
    method: 'GET',
    params: {
      limit: this.limit(),
      page: this.page(),
    },
  }));

  protected banksResource = httpResource<IResponse<IBank>>(() => ({
    url: `${this.url}/bank`,
    params: {
      limit: 0,
    },
  }));

  protected advisorResource = httpResource<IResponse<IAdvisor>>(() => ({
    url: `${this.url}/users`,
    method: 'GET',
    params: {
      limit: 0,
      role: ERole.Advisor,
      isActive: true,
      bankAccount: false,
    },
  }));

  fromPage = computed(() => {
    return this.limit() * (this.page() - 1) + 1;
  });

  toPage = computed(() => {
    return this.resource.value()?.metadata
      ? this.limit() * (this.page() - 1) + this.resource.value()!.metadata!.resultsLength
      : 0;
  });

  onPageChange({ value }: any): void {
    this.selected = value;
    this.limit.set(value);
    this.page.set(1);
  }

  goTopage(page: number): void {
    this.page.set(page);
  }
}
