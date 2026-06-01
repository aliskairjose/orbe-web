import { CurrencyPipe, DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ITEM_PER_PAGE } from '@core/constants';
import { IResponse, ITransaction } from '@core/interfaces';

@Component({
  selector: 'app-transactions',
  imports: [DatePipe, FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  protected headers = ['Usuario', 'Id transacción', 'Monto', ' Origen', 'Descripción', ' Fecha',''];

  private readonly url = `${API_URL}/v1/payments`;
  protected search = model<string>('');

  protected readonly itemsPerPage = [5, 10, 15, 20];
  protected selected = 20;
  protected limit = signal(ITEM_PER_PAGE);
  protected page = signal(1);

  protected resource = httpResource<IResponse<ITransaction>>(() => ({
    url: this.url,
    params: {
      limit: this.limit(),
      page: this.page(),
      search: this.search() ?? '',
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
