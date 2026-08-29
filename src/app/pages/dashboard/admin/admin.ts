import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthSelectors } from '../../auth/store/auth.selectors';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [DatePipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  private readonly store = inject(Store);

  protected user = this.store.selectSnapshot(AuthSelectors.userLogged);

}
