import { httpResource } from '@angular/common/http';
import { Component, computed, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITEM_PER_PAGE } from '@core/constants';
import { IBank } from '@core/interfaces';
import { IResponse } from '@core/interfaces/response';

@Component({
  selector: 'app-banks',
  imports: [FormsModule],
  templateUrl: './banks.html',
  styleUrl: './banks.css',
})
export class Banks {
  private readonly url = `${API_URL}/v1/bank`;
  protected search = model<string>('');

  protected readonly itemsPerPage = [5, 10, 15, 20];
  protected selected = 20;
  protected limit = signal(ITEM_PER_PAGE);
  protected page = signal(1);

  resource = httpResource<IResponse<IBank>>(
    () => `${this.url}?limit=${this.limit()}&page=${this.page()}&search=${this.search()}`,
  );

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
