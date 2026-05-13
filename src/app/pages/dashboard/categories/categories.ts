import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, model, signal, effect, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategory } from '@core/interfaces';
import { IResponse } from '@core/interfaces/response';

@Component({
  selector: 'app-categories',
  imports: [FormsModule, DatePipe],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  private readonly url = `${API_URL}/v1/categories`;

  protected readonly itemsPerPage = [5, 10, 15, 20];
  protected selected = 20;

  protected limit = signal(5);
  protected page = signal(1);
  protected search = model<string>('');

  resource = httpResource<IResponse<ICategory>>(
    () => `${this.url}?limit=${this.limit()}&page=${this.page()}&search=${this.search()}`,
  );

  fromPage = computed(() => {
    return this.limit() * (this.page() - 1) + 1;
  });
  
  toPage = computed(() => {
    if (this.resource.value()?.metadata) {
      return this.limit() * (this.page() - 1) + this.resource.value()!.metadata!.resultsLength;
    }
    return 0;
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
