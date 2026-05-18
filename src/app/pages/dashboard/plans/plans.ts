import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { IPlan } from '@core/interfaces';

@Component({
  selector: 'app-plans',
  imports: [CurrencyPipe],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans {

  resource = httpResource<IPlan[]>(()=>`${API_URL}/v1/plan`);
}
