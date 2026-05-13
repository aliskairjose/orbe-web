import { httpResource } from '@angular/common/http';
import { Component, model, signal, effect, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategory } from '@core/interfaces';
import { IResponse } from '@core/interfaces/response.';

@Component({
  selector: 'app-categories',
  imports: [FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  private readonly url = `${API_URL}/v1/categories`;

  protected limit = signal(20);
  protected page = signal(1);
  protected search = model<string>('');


  resource = httpResource<IResponse<ICategory>>(
    () => `${this.url}?limit=${this.limit()}&page=${this.page()}&search=${this.search()}`,
  );

  onPageChange({ value }: any): void {
    this.limit.set(value);
  }

  nextPage(value: any): void {
    this.page.set(value);
  }

  prevPage(value: any): void {
    this.page.set(value);
  }
}
