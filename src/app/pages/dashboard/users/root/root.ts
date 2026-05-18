import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdvisorList, UserList } from '@core/components';

@Component({
  selector: 'app-root',
  imports: [CommonModule, UserList, AdvisorList],
  templateUrl: './root.html',
  styleUrl: './root.css',
})
export class Root {
  activeTab: 'users' | 'advisors' = 'users';
}
