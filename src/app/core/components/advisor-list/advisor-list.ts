import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, DOCUMENT, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { COUNTRIES, ITEM_PER_PAGE } from '@core/constants';
import { IAdvisor, IResponse } from '@core/interfaces';
import { FileUpload } from '../file-upload/file-upload';
import { EConnectStatus, ERole, EStatus } from '@core/enums';
import { HSOverlay } from 'flyonui/flyonui';
import { User } from '@core/services';
import { disabled, form, FormField, FormRoot, required, min } from '@angular/forms/signals';
import { Paginator } from '../paginator/paginator';
import { TableFilter } from '../table-filter/table-filter';

interface ICountry {
  name: string;
  code: string;
  iso: string;
}

const INITIAL_FORM_DATA: FormData = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  country: 'Venezuela',
  dob: new Date(),
  alias: '',
  dni: '',
  category: '',
  description: '',
  experience: '',
  dniImage: '',
  videointro: '',
  chatPrice: 0,
  callPrice: 0,
  enabledCall: false,
};
interface FormData {
  _id?: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  dni: string;
  dob: Date;
  alias: string;
  category: string;
  description: string;
  experience: string;
  dniImage: string;
  videointro: string;
  chatPrice: number;
  callPrice: number;
  enabledCall: boolean;
}

const formModel = signal<FormData>(INITIAL_FORM_DATA);

@Component({
  selector: 'app-advisor-list',
  imports: [
    DatePipe,
    FormsModule,
    RouterLink,
    FileUpload,
    FormRoot,
    FormField,
    Paginator,
    TableFilter,
  ],
  templateUrl: './advisor-list.html',
  styleUrl: './advisor-list.css',
})
export class AdvisorList {
  form = form(
    formModel,
    (v) => {
      required(v.name, { message: 'Name is required' });
      required(v.lastName, { message: 'Last name is required' });
      required(v.email, { message: 'Email is required' });
      required(v.phone, { message: 'Phone is required' });
      required(v.country, { message: 'Country is required' });
      required(v.dob, { message: 'Date of birth is required' });
      required(v.alias, { message: 'Alias is required' });
      required(v.dni, { message: 'DNI is required' });
      required(v.chatPrice, { message: 'Chat price is required' });
      min(v.chatPrice, 0.25, { message: 'Chat price must be at least 0.25' });
      required(v.callPrice, { message: 'Call price is required' });
      disabled(v.callPrice, ({ valueOf }) => !valueOf(v.enabledCall));
      required(v.category, { message: 'Category is required' });
      required(v.description, { message: 'Description is required' });
      required(v.experience, { message: 'Experience is required' });
      required(v.dniImage, { message: 'DNI image is required' });
      required(v.videointro, { message: 'Video intro is required' });
    },
    {
      submission: {
        action: async (f) => console.log(f().value()),
      },
    },
  );

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
    'Email',
    'Status',
    'Estado',
    'Rate',
    'Registrado',
    'Últ. conexión',
    '',
  ];

  private readonly url = `${API_URL}/v1`;
  private readonly document = inject(DOCUMENT);
  private readonly service = inject(User);

  protected readonly itemsPerPage = [5, 10, 15, 20];
  protected selected = 20;

  protected limit = signal(ITEM_PER_PAGE);
  protected page = signal(1);
  protected search = signal<string>('');

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

  onSearch(query: string): void {
    this.search.set(query);
  }

  pageChange(value: number): void {
    this.selected = value;
    this.limit.set(value);
    this.page.set(1);
  }

  goTopage(page: number): void {
    this.page.set(page);
  }

  openModal(isEdit: boolean, user: IAdvisor | null): void {
    const body: FormData = {
      name: user?.name ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      country: user?.country ?? '',
      dob: new Date(user?.dob ?? ''),
      alias: user?.advisor?.alias ?? '',
      dni: user?.advisor?.dni ?? '',
      category: user?.advisor?.category ?? '',
      description: user?.advisor?.description ?? '',
      experience: user?.advisor?.experience ?? '',
      dniImage: '',
      videointro: '',
      chatPrice: user?.advisor?.chatPrice || 0,
      callPrice: user?.advisor?.callPrice || 0,
      enabledCall: !!user?.advisor?.enabledCall,
    };
    if (isEdit) {
      body._id = user!._id;
    }
    formModel.set(body);

  }

  closeModal(): void {
    this.form().reset(INITIAL_FORM_DATA);
  }

  openNotificationModal(user: IAdvisor): void {
    console.log(user);
    const modal = new HSOverlay(this.document.querySelector('#notification-modal')!);
    modal.open();
  }

  closeNotificationModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#notification-modal')!);
    modal.close();
  }

  onChangeStatus(event: Event, id: string): void {
    const { value } = event.target as HTMLSelectElement;
    const isActive = value === EStatus.APPROVED;
    const body = { status: value as EStatus, isActive };
    this.service.update(id, body).subscribe((_) => window.location.reload());
  }
}
