import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'isAuthenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authState = signal<boolean>(this.readPersistedAuthState());

  isAuthenticated(): boolean {
    return this.authState();
  }

  login(): void {
    this.authState.set(true);
    this.persistAuthState(true);
  }

  logout(): void {
    this.authState.set(false);
    this.persistAuthState(false);
  }

  private readPersistedAuthState(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  }

  private persistAuthState(isAuthenticated: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEY, String(isAuthenticated));
    } catch {
      // Ignore persistent storage failures.
    }
  }
}
