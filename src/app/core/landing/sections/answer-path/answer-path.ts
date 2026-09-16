import { Component } from '@angular/core';

@Component({
  selector: 'app-answer-path',
  imports: [],
  templateUrl: './answer-path.html',
  styleUrl: './answer-path.css',
})
export class AnswerPath {
  protected readonly answerPath = [
    { title: 'Pregunta', dscription: 'Cuéntanos qué quieres descubir.', icon: 'zoom' },
    { title: 'Encuentra', dscription: 'Conecta con el experto indicado para tí.', icon: 'users' },
    { title: 'Descubre', dscription: 'Realiza tu consulta por chat o llamada.', icon: 'message' },
  ];
}
