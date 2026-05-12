import { isPlatformBrowser } from '@angular/common';
import { ApplicationRef, Component, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Notyf } from 'notyf';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('orbe-web');
  protected readonly router = inject(Router);
  protected notyf: Notyf | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.notyf = new Notyf();
    }
    inject(ApplicationRef)
      .isStable.pipe(first((isStable) => isStable))
      .subscribe(() => console.log('App is stable'));
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.HSStaticMethods) {
            window.HSStaticMethods.autoInit();
          }
        }, 100);
      }
    });
  }
}
