import { httpResource } from '@angular/common/http';
import {  Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IBank } from '@core/interfaces';
import { IResponse } from '@core/interfaces/response';

@Component({
  selector: 'app-banks',
  imports: [FormsModule],
  templateUrl: './banks.html',
  styleUrl: './banks.css',
})
export class Banks  {
  private readonly url = `${API_URL}/v1/bank`;

  protected readonly itemsPerPage = [5, 10, 15, 20];
  protected selected = 20;
  protected limit = signal(5);
  protected page = signal(2);
  protected search = model<string>('');

  resource = httpResource<IResponse<IBank>>(
    () => `${this.url}?limit=${this.limit()}&page=${this.page()}&search=${this.search()}`,
  );

  onPageChange({ value }: any): void {
    this.selected = value;
    this.limit.set(value);
  }

  goTopage(page: number): void {
    this.page.set(page);
  }
}
