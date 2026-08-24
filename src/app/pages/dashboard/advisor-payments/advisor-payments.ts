import { CurrencyPipe, DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Paginator, TableFilter } from '@core/components';
import { ITEM_PER_PAGE } from '@core/constants';
import { IAdvisorPayment, IResponse } from '@core/interfaces';

@Component({
  selector: 'app-advisor-payments',
  imports: [DatePipe, FormsModule, RouterLink, Paginator, TableFilter, CurrencyPipe],
  templateUrl: './advisor-payments.html',
  styleUrl: './advisor-payments.css',
})
export class AdvisorPayments {

  protected headers = [
    '', 'Acum / Pago(40%)', 'Banco', 'País', 'Fecha'
  ];
  protected search = signal<string>('');
  protected readonly itemsPerPage = [5, 10, 15, 20];
  private readonly url = `${API_URL}/v1`;
  protected page = signal(1);
  protected limit = signal(ITEM_PER_PAGE);
  protected selected = 20;

  protected resource = httpResource<IResponse<IAdvisorPayment>>(() => ({
    url: `${this.url}/advisor-payments`,
    method: 'GET',
    params: {
      page: this.page(),
      limit: this.limit(),
      search: this.search(),
    },
  }));

  onSearch(query: string): void {
    this.search.set(query)
  }

  pageChange(value: number): void {
    this.selected = value;
    this.limit.set(value);
    this.page.set(1);
  }

  goTopage(page: number): void {
    this.page.set(page);
  }

}
