import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { Router } from "@angular/router";
import { GamePlayDataService } from "src/app/services/game-play-data/game-play-data.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gamers: string[] = [];
  playerCount: number = 0;
  gamePlayData: any[] = [];

  nextButton: boolean = false;

  constructor(private websocketService: WebsocketService, private router: Router, 
    private gamePlayDataService: GamePlayDataService) { }

  ngOnInit(): void {

    this.gamePlayData.push(this.gamePlayDataService.getGamePlayData());

    this.gamePlayData.forEach((host: any) => {
      host.quiz.forEach((quiz: any) => {
        this.websocketService.joinGameRoom(quiz.game_pin);
        this.websocketService.getGameRoomData().subscribe((gameRoom: any) => {
        this.gamers.push(gameRoom);
        if (this.gamers.length > 0) {
          this.nextButton = true;
        } else {
          this.nextButton = false;
        }
        this.playerCount = this.gamers.length;
        console.log(this.gamers);
      });
      });
  });
    
  }

  gameSetup: boolean = true;
  hostGameplay: boolean = false;
  startGame(){
    // this.gamePlayData.forEach((host: any) => {
    //   host.quiz.forEach((quiz: any) => {
    //     this.websocketService.sendDataToGameRoom(quiz.game_pin, quiz);
    //   });
    // });
    this.gameSetup = false;
    this.hostGameplay = true;
    //this.router.navigate(['/host-gameplay']);
    
  }

  backToHostDashboard(){
    this.router.navigate(['/host-dashboard']);
  }

}
