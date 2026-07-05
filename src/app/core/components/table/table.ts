import { Component, input } from '@angular/core';
import { ITable } from './interfaces/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [DatePipe],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  data = input.required<ITable>()
}
