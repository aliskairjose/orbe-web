import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '@core/services';

@Component({
  selector: 'app-verify-account',
  imports: [CommonModule],
  templateUrl: './verify-account.html',
  styleUrl: './verify-account.css',
})
export class VerifyAccount {
  @Input() id!: string;
  isVerified = signal(false);

  private readonly url = `${API_URL}/auth/verify-account`;

  private readonly service = inject(Auth);
  private readonly route = inject(ActivatedRoute);

  protected resource = httpResource<boolean>(() => `${this.url}/${this.id}`);

  ngOnInit() {
    this.isVerified.set(this.resource.value()!);
  }

}
