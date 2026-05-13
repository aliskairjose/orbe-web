import { MetadataKey } from '@angular/forms/signals';

export interface IResponse<T> {
  results: T[];
  metadata: IMetadata;
}

export interface IMetadata {
  itemPerPage: number;
  resultsLength: number;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}
