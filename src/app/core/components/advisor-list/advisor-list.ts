import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, DOCUMENT, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { COUNTRIES, ITEM_PER_PAGE } from '@core/constants';
import { IAdvisor, ICategory, IResponse } from '@core/interfaces';
import { FileUpload } from '../file-upload/file-upload';
import { EConnectStatus, ERole, EStatus } from '@core/enums';
import { HSOverlay } from 'flyonui/flyonui';
import { User } from '@core/services';

interface ICountry {
  country: string;
  code: string;
  iso: string;
}

@Component({
  selector: 'app-advisor-list',
  imports: [DatePipe, FormsModule, RouterLink, FileUpload],
  templateUrl: './advisor-list.html',
  styleUrl: './advisor-list.css',
})
export class AdvisorList {
  protected readonly connectStatus = EConnectStatus;
  protected countriesPhoneCodes: ICountry[] = COUNTRIES;
  protected statusEnum = EStatus;
  protected roleEnum = ERole;
  protected readonly status = [
    { val: EStatus.APPROVED, title: 'Aprobado' },
    { val: EStatus.PENDING, title: 'Pendiente de aprobación' },
    { val: EStatus.REJECT, title: 'Rechazado' },
    { val: EStatus.UNDER_REVIEW, title: 'En revisión' },
    { val: EStatus.SUSPENDED, title: 'Suspendida' },
    { val: EStatus.BANNED, title: 'Bloqueado' },
  ];

  protected user = signal<IAdvisor | null>(null);

  protected headers: string[] = [
    '#',
    'Usuario',
    'Email/Phone',
    'Status',
    'Estado',
    'Rate',
    'Registrado',
    'Últ. conexión',
  ];

  private readonly url = `${API_URL}/v1`;
  private readonly document = inject(DOCUMENT);
  private readonly service = inject(User);

  protected readonly itemsPerPage = [5, 10, 15, 20];
  protected selected = 20;

  protected limit = signal(ITEM_PER_PAGE);
  protected page = signal(1);
  protected search = model<string>('');

  protected resource = httpResource<IResponse<IAdvisor>>(() => ({
    url: `${this.url}/users`,
    params: {
      role: ERole.Advisor,
      limit: this.limit(),
      page: this.page(),
      search: this.search(),
    },
  }));

  protected catResource = httpResource<IResponse<IAdvisor>>(() => ({
    url: `${this.url}/categories`,
    params: {
      limit: this.limit(),
    },
  }));

  fromPage = computed(() => {
    return this.limit() * (this.page() - 1) + 1;
  });

  toPage = computed(() => {
    return this.resource.value()?.metadata
      ? this.limit() * (this.page() - 1) + this.resource.value()!.metadata!.resultsLength
      : 0;
  });

  onPageChange({ value }: any): void {
    this.selected = value;
    this.limit.set(value);
    this.page.set(1);
  }

  goTopage(page: number): void {
    this.page.set(page);
  }

  openModal(user: IAdvisor): void {
    this.user.set(user);
    const modal = new HSOverlay(this.document.querySelector('#update-form-modal')!);
    modal.open();
  }

  closeModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#update-form-modal')!);
    modal.close();
  }

  onChangeStatus(event: Event, id: string): void {
    const { value } = event.target as HTMLSelectElement;
    const isActive = value === EStatus.APPROVED;
    const body = { status: value as EStatus, isActive };
    this.service.update(id, body).subscribe((_) => window.location.reload());
  }
}
