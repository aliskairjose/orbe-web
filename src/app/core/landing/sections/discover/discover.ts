import { Component } from '@angular/core';

@Component({
  selector: 'app-discover',
  imports: [],
  templateUrl: './discover.html',
  styleUrl: './discover.css',
})
export class Discover {
  protected categories = [
    {
      'label': 'Amor',
      'imagen':'amor'
    },
    {
      'label': 'Dinero y prosperidad',
      'imagen':'dinero_prosperidad'
    },
    {
      'label': 'Tarot',
      'imagen':'tarot'
    },
    {
      'label': 'Videncia',
      'imagen':'videncia'
    },
    {
      'label': 'Energía',
      'imagen':'energia'
    },
    {
      'label': 'Limpiezas espirituales',
      'imagen':'limpiezas_espirituales'
    },
    {
      'label': 'Orientación personal',
      'imagen':'orientacion_personal'
    },
    {
      'label': 'Lectura general',
      'imagen':'lectura_general'
    },
  ]
}
