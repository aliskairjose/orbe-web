import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  @Input() id!: string;

  protected  readonly user = httpResource<any>(
    () => `${API_URL}/v1/users/${this.id}`,
  );


}
