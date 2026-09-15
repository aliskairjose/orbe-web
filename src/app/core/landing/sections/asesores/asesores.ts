import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { IAdvisor } from '@core/interfaces';

@Component({
  selector: 'app-asesores',
  imports: [CurrencyPipe],
  templateUrl: './asesores.html',
  styleUrl: './asesores.css',
})
export class Asesores {
  private readonly url = `${API_URL}/v1/dashboard/advisors`;

  protected resource = httpResource<IAdvisor[]>(() => this.url);
}
