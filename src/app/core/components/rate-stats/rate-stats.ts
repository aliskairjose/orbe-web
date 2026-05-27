import { Component, computed, input } from '@angular/core';
import { IRateStats } from '@core/interfaces';
import { ProgressBar } from '../progress-bar/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rate-stats',
  imports: [ProgressBar, CommonModule],
  templateUrl: './rate-stats.html',
  styleUrl: './rate-stats.css',
})
export class RateStats {
   stats = input.required<IRateStats>();

  starsCount = computed(() => {
    const { average, reviews, ...stars } = this.stats();
    return {
      '5 estrellas': stars.fiveStars,
      '4 estrellas': stars.fourStars,
      '3 estrellas': stars.threeStars,
      '2 estrellas': stars.twoStars,
      '1 estrellas': stars.oneStars,
    };
  });

  getPercents(qty: number): number {
    return (qty / this.stats().reviews) * 100;
  }
}
