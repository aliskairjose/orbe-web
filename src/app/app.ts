import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ApplicationRef, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, Event, NavigationEnd } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Notyf } from 'notyf';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App implements AfterViewInit, OnInit {
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
    if (isPlatformBrowser(this.platformId)) {

      // Importamos dinámicamente FlyonUI para que el empaquetador de producción lo procese correctamente
      import('flyonui/flyonui').then((flyonui) => {

        // Primera inicialización al cargar la app
        this.initFlyonUI();

        // Reinicialización en cada cambio de ruta
        this.router.events.subscribe((event: Event) => {
          if (event instanceof NavigationEnd) {
            setTimeout(() => {
              document.querySelectorAll('.overlay-backdrop').forEach(el => el.remove());
              document.body.style.overflow = '';
              document.body.style.paddingRight = '';
              this.initFlyonUI();
            }, 100);
          }
        });

      });
    }

  }

  ngAfterViewInit() {
    // Esto asegura que el script interactivo solo se ejecute en el navegador
    if (isPlatformBrowser(this.platformId)) {
      // Accede al inicializador global inyectado por el script de angular.json
      if ((window as any).IHSComponents) {
        (window as any).IHSComponents.init();
      }
    }
  }

  private initFlyonUI() {
    if (typeof window !== 'undefined' && window.HSStaticMethods) {
      // Inicializa todos los componentes genéricos reconocidos en el DOM
      window.HSStaticMethods.autoInit();

      // Forzar el escaneo específico de elementos tipo Overlay (Modales / Drawers)
      if ((window.HSStaticMethods as any).autoInitElements) {
        (window.HSStaticMethods as any).autoInitElements(['overlay']);
      }
    }
  }
}
