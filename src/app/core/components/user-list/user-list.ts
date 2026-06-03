import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ITEM_PER_PAGE } from '@core/constants';
import { EConnectStatus, ERole } from '@core/enums';
import { IResponse, IUser } from '@core/interfaces';
import { Paginator } from '../paginator/paginator';

@Component({
  selector: 'app-user-list',
  imports: [DatePipe, FormsModule, RouterLink, Paginator],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  protected headers: string[] = ['#', 'Usuario', 'Email', 'Status', 'Registrado', 'Últ. conexión', ''];
  protected readonly connectStatus = EConnectStatus;

  private readonly url = `${API_URL}/v1/users`;
  protected readonly itemsPerPage = [5, 10, 15, 20];
  protected selected = 20;

  protected limit = signal(ITEM_PER_PAGE);
  protected page = signal(1);
  protected search = model<string>('');

  protected resource = httpResource<IResponse<IUser>>(() => ({
    url: this.url,
    params: {
      role: ERole.User,
      limit: this.limit(),
      page: this.page(),
      search: this.search(),
    },
  }));

  onPageChange({ value }: any): void {
    this.selected = value;
    this.limit.set(value);
    this.page.set(1);
  }

  goTopage(page: number): void {
    this.page.set(page);
  }
}
