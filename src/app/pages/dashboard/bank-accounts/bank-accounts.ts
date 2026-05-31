import { Component, computed, DOCUMENT, inject, model, signal } from '@angular/core';
import { ITEM_PER_PAGE } from '@core/constants';
import { IResponse } from '../../../core/interfaces/response';
import { IAdvisor, IBank, IBankAccount } from '@core/interfaces';
import { httpResource } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { disabled, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { ERole } from '@core/enums';
import { Service } from './service';
import { HSOverlay } from 'flyonui/flyonui';

const INITIAL_FORM_VALUE: BankAccountData = {
  type: '',
  number: '',
  bank: '',
  user: '',
};

interface BankAccountData {
  _id?: string;
  type: string;
  number: string;
  bank: string;
  user: string;
}

const accountModel = signal<BankAccountData>(INITIAL_FORM_VALUE);

@Component({
  selector: 'app-bank-accounts',
  imports: [FormsModule, RouterLink, FormField, FormRoot],
  templateUrl: './bank-accounts.html',
  styleUrl: './bank-accounts.css',
})
export class BankAccounts {
  private readonly document = inject(DOCUMENT);
  protected hasBankAccount = signal(true);

  protected form = form(
    accountModel,
    (validator) => {
      required(validator.type, { message: 'Seleccione tipo de cuenta' });
      required(validator.number, { message: 'La cuenta bancaria es obligatoria' });
      required(validator.bank, { message: 'Seleccione banco' });
      required(validator.user, { message: 'Seleccione asesor' });
      disabled(validator.user, () => this.hasBankAccount());
    },
    {
      submission: {
        action: async (f) =>
          f().value()._id ? this.update(f().value()) : this.create(f().value()),
      },
    },
  );

  protected headers = ['#', 'País', 'Banco', 'Tipo de Cuenta', 'Cuenta', 'Asesor', ''];
  protected search = model<string>('');
  protected selectedBankAccount: IBankAccount | null = null;

  protected readonly itemsPerPage = [5, 10, 15, 20];
  private readonly url = `${API_URL}/v1`;
  protected page = signal(1);
  protected limit = signal(ITEM_PER_PAGE);
  protected selected = 20;

  protected resource = httpResource<IResponse<IBankAccount>>(() => ({
    url: `${this.url}/bank-account`,
    method: 'GET',
    params: {
      page: this.page(),
      limit: this.limit(),
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
      bankAccount: this.hasBankAccount(),
    },
  }));

  private readonly service = inject(Service);

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

  openModal(isEdit: boolean, plan: IBankAccount | null): void {
    this.hasBankAccount.set(isEdit);
    this.selectedBankAccount = plan;
    const body: BankAccountData = {
      type: plan?.type ?? '',
      number: plan?.number ?? '',
      bank: plan?.bank._id ?? '',
      user: plan?.user._id ?? '',
    }
    if (isEdit) {
      body._id = plan!._id;
    }
    accountModel.set(body);
    const modal = new HSOverlay(this.document.querySelector('#form-modal')!);
    modal.open();
  }

  closeModal(): void {
    this.form().reset(INITIAL_FORM_VALUE);
    const modal = new HSOverlay(this.document.querySelector('#form-modal')!);
    modal.close();
  }

  // private async onSubmit(f: BankAccountData) {
  //   this.service.create(f).subscribe((_) => window.location.reload());
  // }

  private async update(f: BankAccountData) {
    console.log(f.number);
    this.service.update(f).subscribe((_) => window.location.reload());
  }
  private async create(f: BankAccountData): Promise<void> {
    this.service.create(f).subscribe((_) => window.location.reload());
  }
}
