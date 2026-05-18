import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private notyf: Notyf | null = null;
  /**
   *
   *
   * @param {string} message
   * @param {TToastType} [type='success']
   * @memberof Toast
   */
  show(message: string, type = 'success', duration = 3000): void {
    console.log('Toast');
    this.notyf = new Notyf({
      duration,
      ripple: true,
      dismissible: true,
      position: {
        x: 'right',
        y: 'top',
      },
    });
    this.notyf.open({
      type,
      message,
    });
  }
}
