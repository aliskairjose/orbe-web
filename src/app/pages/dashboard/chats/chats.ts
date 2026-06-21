import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, DOCUMENT, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChatBubble, Modal, Paginator } from '@core/components';
import { ITEM_PER_PAGE } from '@core/constants';
import { IResponse, IRoom } from '@core/interfaces';
import { HSOverlay } from 'flyonui/flyonui';

@Component({
  selector: 'app-chats',
  imports: [DatePipe, FormsModule, RouterLink, ChatBubble, Paginator, Modal],
  templateUrl: './chats.html',
  styleUrl: './chats.css',
})
export class Chats {
  isChatOpen = signal<boolean>(false);

  private document = inject(DOCUMENT);

  protected headers = ['cliente', 'Asesor', 'Mensajes', 'Fecha', ''];
  private readonly url = `${API_URL}/v1/chat/rooms`;
  protected readonly itemsPerPage = [5, 10, 15, 20];
  protected selected = 20;

  protected limit = signal(ITEM_PER_PAGE);
  protected page = signal(1);
  protected search = model<string>('');
  protected roomID = signal<string>('');

  resource = httpResource<IResponse<IRoom>>(() => ({
    url: this.url,
    params: {
      limit: this.limit(),
      page: this.page(),
      search: this.search() ?? '',
    },
  }));

  protected room = httpResource<IRoom>(() => `${this.url}/${this.roomID()}`);

  onPageChange({ value }: any): void {
    this.selected = value;
    this.limit.set(value);
    this.page.set(1);
  }

  goTopage(page: number): void {
    this.page.set(page);
  }

  openChat(id: string): void {
    this.roomID.set(id);
    this.isChatOpen.set(true);
  }

  closeChat(res: boolean): void {
    this.isChatOpen.set(false);
  }
}
