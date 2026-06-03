import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ERole } from '@core/enums';
import { IMessage } from '@core/interfaces';

@Component({
  selector: 'app-chat-bubble',
  imports: [DatePipe],
  templateUrl: './chat-bubble.html',
  styleUrl: './chat-bubble.css',
})
export class ChatBubble {
  readonly message = input.required<IMessage>();
  protected role = ERole;
}
