import { Component, computed, signal } from '@angular/core';
interface RequestCount {
  type: 'Chat' | 'Llamada';
  count: number;
  color: string;
}

@Component({
  selector: 'app-request-month',
  imports: [],
  templateUrl: './request-month.html',
  styleUrl: './request-month.css',
})
export class RequestMonth {
    requestCount = signal<RequestCount[]>([
    { type: 'Chat', count: 100, color: '#2563eb' },
    { type: 'Llamada', count: 35, color: '#10b981' },
  ]);



  totalRequests = computed(() => this.requestCount().reduce((sum, item) => sum + item.count, 0));


  requestPercent = computed(() => {
    const total = this.totalRequests();
    if (!total) return 0;
    return Math.round(
      ((this.requestCount().find((item) => item.type === 'Chat')?.count ?? 0) / total) * 100,
    );
  });
}
