import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-plans',
  imports: [CurrencyPipe],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans {
  plans = [
    {name: 'Basic', amount: 15, bonus: 2, status: 'active'},
    {name: 'Pro', amount: 30, bonus: 5, status: 'active'},
    {name: 'Enterprise', amount: 50, bonus: 7, status: 'active'}
  ]
}
