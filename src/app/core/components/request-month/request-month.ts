import { TitleCasePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
interface RequestCount {
  type: 'Chat' | 'Voz' | 'Video';
  count: number;
}

interface Response {
  _id: string;
  total: number;
}

@Component({
  selector: 'app-request-month',
  imports: [TitleCasePipe],
  templateUrl: './request-month.html',
  styleUrl: './request-month.css',
})
export class RequestMonth {
  protected resource = httpResource<Response[]>(
    () => `${API_URL}/v1/request-logs/summary/monthly-type`,
  );
  protected currentMonth: string = new Date().toLocaleString('default', { month: 'long' });
  protected types: any = {
    chat:'Chat',
    voice:'Voz',
    video:'Video'
  }

  totalRequests = computed(() => {
    if (this.resource.hasValue()) {
      return this.resource.value()?.reduce((sum, item) => sum + item.total, 0);
    }
    return 0;
  });
}
