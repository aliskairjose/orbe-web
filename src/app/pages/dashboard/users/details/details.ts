import { httpResource } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  @Input() id!: string;

  protected resource = httpResource(() => `${API_URL}/v1/users/${this.id}`);
}
