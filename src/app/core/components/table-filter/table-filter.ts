import { Component, effect, output, signal } from '@angular/core';
import { form, debounce, Field, FormRoot, FormField } from '@angular/forms/signals';

interface SearchData {
  query: string;
}
const searchModel = signal<SearchData>({
  query: '',
});

@Component({
  selector: 'app-table-filter',
  imports: [FormRoot, FormField],
  templateUrl: './table-filter.html',
  styleUrl: './table-filter.css',
})
export class TableFilter {
  onPageChange = output<number>();
  onModalOpen = output<any>();
  onSearch = output<string>();
  
  protected readonly itemsPerPage = [5, 10, 15, 20];
  protected readonly searchForm = form(searchModel, (schemaPath) => {
    debounce(schemaPath.query, 500);
  });

   constructor() {
    effect(() => {
      const currentQuery = this.searchForm().value().query;
      this.onSearch.emit(currentQuery);
    });
  }

  pageChange({ value }: any): void {
    this.onPageChange.emit(value);
  }

  openModal(bool: boolean, value: any): void {
    this.onModalOpen.emit({ bool, value });
  }
}
