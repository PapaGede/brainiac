import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { GamerNameService } from "src/app/services/gamer-name/gamer-name.service";
import { GamerAnswer } from "src/app/classes/gamer-answer/gamer-answer";
import { AuthService } from "src/app/services/authentication/auth.service";


@Component({
  selector: 'app-gamer-name',
  templateUrl: './gamer-gameplay.component.html',
  styleUrls: ['./gamer-gameplay.component.css']
})
export class GamerGameplayComponent implements OnInit {

  timer: number = 0;
  points: number = 0;
  reducer: number = 0;

  correctAnswer: string = '';

  roomName: string = '';
  gamerName: string = '';
  gamePlayData: any[] = [];  
  gamerDetails: boolean = true;
  gamePlayContent: boolean = false;
  spinnerDisplay: boolean = false;

  // cards displayed when answer is choosen
  correctCard: boolean = false;
  wrongCard: boolean = false;
  timeoutCard: boolean = false;

  //gamer-answer
  gamerAnswer: GamerAnswer = new GamerAnswer();

  constructor(private websocketService: WebsocketService,
    private gamerNameService: GamerNameService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isNotLogin();

    this.gamerDetails = true;
    this.gamePlayContent = false;
    this.spinnerDisplay = false;

    // cards displayed when answer is choosen
    this.correctCard = false;
    this.wrongCard = false;
    this.timeoutCard = false;

    this.websocketService.getGameRoomData().subscribe((question: any) => {
      this.gamePlayData = question;
      
      if (this.gamePlayData.length > 0){
        
        this.correctCard = false;
        this.wrongCard = false;
        this.timeoutCard = false;

        this.spinnerDisplay = false;    
        this.gamePlayContent = true;
        this.timer = 0;
        this.points = 0;

        this.gamePlayData.forEach((question: any) => {
            this.points = question.points;
            this.timer = question.timer;
            this.reducer = (this.points/this.timer);
            question.answer.forEach((answer: any) => {
              if (answer.is_correct == true) {
                this.correctAnswer = answer.answer_body;
              }
            });
        });

        setInterval(() => {
          if(this.timer > 0) {
            this.timer = this.timer - 1;
            this.points = parseFloat(((this.points - this.reducer).toFixed(0)));
          } else {
            this.timer;
            this.gamePlayData.length = 0;
            if (this.correctCard == false && this.wrongCard == false) {
              this.timeoutCard = true;
              this.wrongCard = false;
              this.correctCard = false;
              this.gamePlayContent = false;
            } else if (this.correctCard == true || this.wrongCard == true) {
              this.timeoutCard = false;
            }
          }
        },1000);
      } 
      else {
        this.correctCard = false;
        this.wrongCard = false;
        this.timeoutCard = false;
      }
      });
  }


  sendGamerName(){
    //joining game room and sending gamer name to game room
    this.gamerNameService.setGamerName(this.gamerName);
    this.websocketService.joinGameRoom(this.roomName);
    this.websocketService.sendDataToGameRoom(this.roomName, this.gamerName);
    this.gamerDetails = false;
    this.spinnerDisplay = true;
    this.gamerAnswer.gamer_name = this.gamerNameService.getGamerName();
  }

  playerAnswer: any;
  pointsGotten: number = 0;

  choosenAnswer(index: number){
    this.pointsGotten = this.points;
    this.gamePlayData.forEach((question: any) => {
        this.playerAnswer = question.answer[index];
      });

      if (this.playerAnswer.is_correct == true) {
        this.gamePlayContent = false;
        this.wrongCard = false;
        this.timeoutCard = false;
        
        this.gamerAnswer.points = this.gamerAnswer.points + this.pointsGotten;
        this.correctCard = true;
      } else if (this.playerAnswer.is_correct == false) {
        this.gamerAnswer.points = this.gamerAnswer.points - this.pointsGotten;
        this.gamePlayContent = false;
        this.correctCard = false;
        this.timeoutCard = false;
        this.wrongCard = true;
      }

      return this.gamerAnswer.points;
  }


}
