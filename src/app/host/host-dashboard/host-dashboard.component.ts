import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { GamePlayDataService } from "src/app/services/game-play-data/game-play-data.service";
import { HostNameService } from 'src/app/services/host-name/host-name.service';
import { Host } from 'src/app/classes/host/host';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { RequetsService } from "src/app/services/http-requests/requets.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css'],
})
export class HostDashboardComponent implements OnInit {

  currentQuiz: any[] = [];

  host: Host = new Host();

  quiz_number: number = 0;
  host_data: any[] = [];



  constructor(private router: Router, public dialog: MatDialog,
    private websocketService: WebsocketService, private gamePlayDataSerivce: GamePlayDataService,
    private hostNameService: HostNameService, private authService: AuthService,
    private requestService: RequetsService, private httpClient: HttpClient
    )
    {
        this.requestService.getRequest("/gethost").subscribe((data: any) => {
          // tslint:disable-next-line:no-conditional-assignment
          data.forEach((element: any) => {
            if (element.quiz.length !== 0){

              this.host_data.push(element);
              this.quiz_number = this.host_data.length;
            }
          });
          });

    }

  ngOnInit(): void {
    this.authService.isNotLogin();
    this.host.host_name = this.hostNameService.getHostName();
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  // constructor(private httpClient: HttpClient){};

  //side menu trigger
  slideCheck: boolean = false;

  slideTrigger(){
    if (this.slideCheck == false) {
        this.slideCheck = true;
      } else {
        this.slideCheck = false;
      }
    }

  signOut(): void {
    this.authService.logout();
    }

    //hiding and showing question contents
    questioncontentshow: boolean = false;
    questioncontenthide: boolean = true;
    quiz_cards: boolean = false;

  questionContentShow(){
    this.questioncontentshow = true;
    this.questioncontenthide = false;
    this.quiz_cards = false;
    }

  questionContentHide(){
      this.questioncontentshow = false;
      this.questioncontenthide = true;
      this.quiz_cards = false;
  }

  showQuizCards(){
    this.quiz_cards = true;
    this.questioncontentshow = false;
    this.questioncontenthide = true;
  }

  //begin the quiz
  // tslint:disable-next-line:typedef
  startQuiz(index: number){
    this.gamePlayDataSerivce.setGamePlayData(this.host_data[index]);

    this.currentQuiz.push(this.host_data[index]);
    this.currentQuiz.forEach((host: any) => {
      host.quiz.forEach((quiz: any) => {
        this.websocketService.joinGameRoom(quiz.game_pin);
      });
    });
    this.router.navigate(['/game']);
  }


  // tslint:disable-next-line:typedef
  deletePost(index: number) {
    // tslint:disable-next-line:prefer-const
    this.currentQuiz.push(this.host_data[index])
    this.currentQuiz.forEach((host: any) => {
      const endPoints = "/quiz/";
      let url ="http://tahoot-backend.herokuapp.com/";
      let currentUrl = this.router.url;
      host.quiz.forEach((quiz: any) => {
        this.httpClient.delete(url + endPoints + quiz.quiz_id).subscribe(data => {
          console.log(data);
          this.router.navigate([currentUrl]);
        });
      });
    });
  }


}
