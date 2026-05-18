import { Component, computed, model, signal } from '@angular/core';
import { ITEM_PER_PAGE } from '@core/constants';
import { IResponse } from '../../../core/interfaces/response';
import { IBankAccount } from '@core/interfaces';
import { httpResource } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bank-accounts',
  imports: [FormsModule, RouterLink],
  templateUrl: './bank-accounts.html',
  styleUrl: './bank-accounts.css',
})
export class BankAccounts {
  protected headers = ['País', 'Banco', 'Tipo de Cuenta', 'Cuenta', 'Asesor'];

  protected search = model<string>('');

  protected readonly itemsPerPage = [5, 10, 15, 20];
  private readonly url = `${API_URL}/v1/bank-account`;
  protected page = signal(ITEM_PER_PAGE);
  protected limit = signal(1);
  protected selected = 20;

  protected resource = httpResource<IResponse<IBankAccount>>(()=>`${this.url}?page=${this.page()}&limit=${this.page()}`);

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
