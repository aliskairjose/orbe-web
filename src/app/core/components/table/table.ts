import { Component, input } from '@angular/core';
import { ITable } from './interfaces/table';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  data = input.required<ITable>() 
}
