import { httpResource } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { map } from 'rxjs';
interface RequestCount {
  type: string;
  count: number;
  color: string;
}
interface IStatusRequest {
  _id: string;
  count: number;
}

@Component({
  selector: 'app-request-status-hor-bar',
  imports: [],
  templateUrl: './request-status-hor-bar.html',
  styleUrl: './request-status-hor-bar.css',
})
export class RequestStatusHorBar {
  private readonly url = `${API_URL}/v1/request-logs/summary/status`;

  protected readonly resource = httpResource<IStatusRequest[]>(() => this.url);

  requestCount = computed(() => {
    const res: RequestCount[] = [];
    if (this.resource.hasValue()) {
      this.resource.value().map((r) => {
        res.push({
          type: r._id,
          count: r.count,
          color: r._id === 'Aceptado' ?'#2563eb':'#10b981',
        });
      });
    }
    return res;
  });

  totalRequests = computed(() => this.requestCount().reduce((sum, item) => sum + item.count, 0));

  requestPercent = computed(() => {
    const total = this.totalRequests();
    if (!total) return 0;
    return Math.round(
      ((this.requestCount().find((item) => item.type === 'Chat')?.count ?? 0) / total) * 100,
    );
  });
}
