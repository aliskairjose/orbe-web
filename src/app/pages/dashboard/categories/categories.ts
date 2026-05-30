import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, model, signal, computed, inject, DOCUMENT } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormField, FormRoot, required, form } from '@angular/forms/signals';
import { ITEM_PER_PAGE } from '@core/constants';
import { ICategory } from '@core/interfaces';
import { IResponse } from '@core/interfaces/response';
import { HSOverlay } from 'flyonui/flyonui';

interface Data {
  name: string;
  isActive: boolean;
}
const Model = signal<Data>({
  name: '',
  isActive: false,
});
@Component({
  selector: 'app-categories',
  imports: [FormsModule, DatePipe, FormField, FormRoot],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  private readonly document = inject(DOCUMENT);

  protected form = form(Model, (validator) => {
    required(validator.name, { message: 'El nombre es requerido' });
  });

  private readonly url = `${API_URL}/v1/categories`;
  protected readonly itemsPerPage = [5, 10, 15, 20];
  protected selected = 20;

  protected limit = signal(ITEM_PER_PAGE);
  protected page = signal(1);
  protected search = model<string>('');

  protected resource = httpResource<IResponse<ICategory>>(() => ({
    url: this.url,
    params: {
      limit: this.limit(),
      page: this.page(),
      search: this.search() ?? '',
    },
  }));

  protected selectedCategory: ICategory | null = null;

  fromPage = computed(() => this.limit() * (this.page() - 1) + 1);

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

  async onSubmit(planData: Data): Promise<void> {
    if (!this.selectedCategory) return;
    // this.service.update(this.selectedCategory._id, planData).subscribe((_) => window.location.reload());
  }

  openModal(category: ICategory): void {
    this.selectedCategory = category;
    Model.set({ name: category.name, isActive: category.isActive });
    const modal = new HSOverlay(this.document.querySelector('#update-form-modal')!);
    modal.open();
  }

  closeModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#update-form-modal')!);
    modal.close();
  }
}
