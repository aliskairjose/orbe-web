import { Component, signal } from '@angular/core';
import { Table } from '@core/components';
import { ITable } from '@core/components/table/interfaces/table';

@Component({
  selector: 'app-categories',
  imports: [Table],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  dataTable = signal<ITable>({
    headers: ['Nombre', 'Activo', 'Fecha', ' Ult. Act.'],
    rows: [
      [
        {
          label: 'Paquete 1',
          type: 'text',
        },
        {
          label: 'Sí',
          type: 'badge',
        },
        {
          label: '2024-01-01',
          type: 'date',
        },
        {
          label: '2024-01-10',
          type: 'date',
        },
      ],
    ],
  });
}
