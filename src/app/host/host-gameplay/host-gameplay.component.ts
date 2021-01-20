import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { GamePlayDataService } from "src/app/services/game-play-data/game-play-data.service";

@Component({
  selector: 'app-host-gameplay',
  templateUrl: './host-gameplay.component.html',
  styleUrls: ['./host-gameplay.component.css']
})
export class HostGameplayComponent implements OnInit {

  gamePlayData: any[] = [];
  timer: number = 0;
  points: number = 0;
  reducer: number = 0;
  gamePin: number = 0;
  questions: any[] = [];
  count: number = 0;
  nextButton: boolean = false;
  startButton: boolean = true;
  current_question: any[] = [];
  numberOfQuestions: number = 0;
  

  constructor(private websocketService: WebsocketService, private gamePlayDataSerivce: GamePlayDataService) { }

  ngOnInit(): void {
    this.gamePlayData.push(this.gamePlayDataSerivce.getGamePlayData());

    //keeping track of the number of questions
    this.numberOfQuestions = this.gamePlayData.length;

  
    //looping through the array
    this.gamePlayData.forEach((host: any) => {
      host.quiz.forEach((quiz: any) => {
        this.gamePin = quiz.game_pin;
        quiz.questions.forEach((questions: any) => {
          this.questions.push(questions);
        });
      });
    });

    
    setInterval(() => {
      if(this.timer > 0) {
        this.timer--;
        this.points = parseFloat(((this.points - this.reducer).toFixed(0)));
        if (this.timer == 0){
          this.nextButton = true;
        } else {
          this.nextButton = false;
        }
      } else {
        this.timer;
      }
    },1000);
  }


  sendQuestion(){
    this.current_question.pop();
    this.current_question.push(this.questions[this.count])
    this.current_question.forEach((data: any) => {
      this.timer = data.timer;
      this.points = data.points;
      this.reducer = (this.points/this.timer);
    });
    this.websocketService.sendDataToGameRoom(this.gamePin.toString(), this.current_question);
    this.count = this.count + 1;
    this.startButton = false;
    this.nextButton = false;
    if (this.startButton == false) {
      this.startButton = false;
    } else {
      this.startButton = false;
    }
    
  }

}
