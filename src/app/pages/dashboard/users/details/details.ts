import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { AnnualTimeChart, RateStats } from '@core/components';
import { EConnectStatus } from '@core/enums';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  imports: [CommonModule, AnnualTimeChart, RateStats],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  @Input() id!: string;
  @Input() role!: string;

  private sanitizer = inject(DomSanitizer);

  protected readonly connectStatus = EConnectStatus;
  protected user = httpResource<any>(() => `${API_URL}/v1/users/${this.id}`);

  protected safeDniImage = computed(()=>this.sanitizer.bypassSecurityTrustResourceUrl(this.user.value().advisor.dniImage));  

  currentIndex = signal<number>(0);

  slides = signal<number[]>([1,2]);
 
  // Computed para verificar los límites de manera limpia
  totalSlides = computed(() => this.slides().length);

  nextSlide(): void {
    this.currentIndex.update((index) => (index + 1) % this.totalSlides());
  }

  prevSlide(): void {
    this.currentIndex.update((index) => (index - 1 + this.totalSlides()) % this.totalSlides());
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
  }
}
