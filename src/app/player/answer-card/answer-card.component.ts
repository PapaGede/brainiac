import { Component, OnInit } from '@angular/core';
import { takeLast } from 'rxjs-compat/operator/takeLast';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.css']
})
export class AnswerCardComponent implements OnInit {

  correctCard: boolean = true;
  wrongCard: boolean = true;
  timeoutCard: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
