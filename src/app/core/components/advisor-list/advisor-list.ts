import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ITEM_PER_PAGE } from '@core/constants';
import { IAdvisor, IDBUser, IResponse, IUser } from '@core/interfaces';

@Component({
  selector: 'app-advisor-list',
  imports: [DatePipe, FormsModule, RouterLink],
  templateUrl: './advisor-list.html',
  styleUrl: './advisor-list.css',
})
export class AdvisorList {
  protected headers: string[] = ['Usuario', 'Email', 'Status','Rate', 'Usuario desde', 'Última conexión'];

  private readonly url = `${API_URL}/v1/users`;

  protected readonly itemsPerPage = [5, 10, 15, 20];
  protected selected = 20;

  protected limit = signal(ITEM_PER_PAGE);
  protected page = signal(1);
  protected search = model<string>('');

  resource = httpResource<IResponse<IAdvisor>>(
    () => `${this.url}?role=Advisor&limit=${this.limit()}&page=${this.page()}&search=${this.search()}`,
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
