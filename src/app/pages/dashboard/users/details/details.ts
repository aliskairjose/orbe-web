import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { AnnualTimeChart, RateStats } from '@core/components';
@Component({
  selector: 'app-details',
  imports: [CommonModule, AnnualTimeChart, RateStats],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  @Input() id!: string;
  @Input() role!: string;

  protected  user = httpResource<any>(
    () => `${API_URL}/v1/users/${this.id}`,
  );


}
