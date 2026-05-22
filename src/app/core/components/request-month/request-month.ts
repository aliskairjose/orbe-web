import { TitleCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
interface RequestCount {
  type: 'Chat' | 'Voz' | 'Video' ;
  count: number;
}

@Component({
  selector: 'app-request-month',
  imports: [TitleCasePipe],
  templateUrl: './request-month.html',
  styleUrl: './request-month.css',
})
export class RequestMonth {
  protected currentMonth: string = new Date().toLocaleString('default', { month: 'long' });
    requestCount = signal<RequestCount[]>([
    { type: 'Chat', count: 100 },
    { type: 'Voz', count: 35 },
    { type: 'Video', count: 20 },
  ]);

  totalRequests = computed(() => this.requestCount().reduce((sum, item) => sum + item.count, 0));

}
