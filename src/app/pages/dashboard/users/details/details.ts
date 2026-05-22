import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, Input } from '@angular/core';
import { IAdvisor, IUser } from '@core/interfaces';
@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  @Input() id!: string;
  @Input() role!: string;

  protected  readonly user = httpResource<IUser | IAdvisor>(
    () => `${API_URL}/v1/users/${this.id}`,
  );


}
