import { Component, computed, input, output } from '@angular/core';
import { IMetadata } from '@core/interfaces/response';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator {
  limit = input.required<number>();
  metadata = input.required<IMetadata>();

  onPageChange = output<number>();

  goToPage(page: number): void {
    this.onPageChange.emit(page);
  }

  fromPage = computed(() => {
    return this.limit() * (this.metadata().currentPage - 1) + 1;
  });

  toPage = computed(() => {
    this.limit() * (this.metadata().currentPage - 1) + this.metadata().resultsLength;
  });
}
