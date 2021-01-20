import { Component, Inject, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Question } from "src/app/classes/question/question";
import { Answer } from "src/app/classes/answer/answer";
import { Host } from 'src/app/classes/host/host';
import { HostNameService } from 'src/app/services/host-name/host-name.service';
import { HostDataService } from "src/app/services/host-data/host-data.service";
import { DOCUMENT } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RequetsService } from "src/app/services/http-requests/requets.service";
import { HttpClient } from '@angular/common/http';



interface Timer {
  value: number;
}

export class Quiz {
  quiz_name: string = '';
  questions: any[] = [];
  quiz_id: number = 0;
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})


export class QuestionsComponent implements OnInit {

  //define API
  apiURL = 'https://tahoot-backend.herokuapp.com';
  

  timers: Timer[] = [
    {value: 5},
    {value: 10},
    {value: 15},
    {value: 20},
    {value: 25},
    {value: 30}
  ];

  isEditable = true;

  question: Question = new Question();
  answer1: Answer = new Answer();
  answer2: Answer = new Answer();
  answer3: Answer = new Answer();
  answer4: Answer = new Answer();

  host: Host = new Host();
  quiz: Quiz = new Quiz();

  questions: any[] = [];

  currentEditQuestion: any;
  @ViewChild('stepper') stepper: any;

  constructor(private hostNameService: HostNameService,
    private hostDataService: HostDataService,
    @Inject(DOCUMENT) private document: Document,
    private _snackBar: MatSnackBar,
    private requestService: RequetsService,
    private http: HttpClient
    ) {
      this.question = new Question()
      this.answer1 = new Answer();
      this.answer2 = new Answer();
      this.answer3 = new Answer();
      this.answer4 = new Answer();
  
      this.question.answer.push(this.answer1, this.answer2, this.answer3, this.answer4)
      this.questions.push(this.question);
      
   }

  ngOnInit(): void {
    this.host.host_name = this.hostNameService.getHostName();
    
  }



  createQuestion(){
    this.question = new Question()
    this.answer1 = new Answer();
    this.answer2 = new Answer();
    this.answer3 = new Answer();
    this.answer4 = new Answer();
    this.question.answer.push(this.answer1, this.answer2, this.answer3, this.answer4);

    this.quiz.questions.length = 0;
    //updating the database
    this.host = new Host();
    this.host = this.hostDataService.getHostData();
    
    this.questions.push(this.question);
    
    this.host.quiz.forEach((quiz: any) => {
      
      this.quiz.quiz_name = quiz.quiz_name;
      this.quiz.questions.push(this.questions[this.questions.length - 2]);
      this.quiz.quiz_id = quiz.quiz_id;
      
    });
    this.requestService.putRequest("quiz", this.quiz.quiz_id, this.quiz).subscribe();
    this.stepper.selectedIndex = this.questions.length - 1;
  }

  nextQuestion(){
    this.stepper.selectedIndex = this.questions.length - 1;
  }


  removeQuestion(index: any){
    index = this.questions.indexOf(index, 0);
    this.questions.splice(index,1);
    this.requestService.getQuiz("quiz", this.quiz.quiz_id).subscribe((quiz: any) => {
      quiz.questions[index]
      // this.requestService.deleteRequest("question", quiz.questions[index].question_id).subscribe(() => {
      //   console.log("Message Deleted!");
      // });
    });
    
  }

  //done setting questions
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  Done(){
    this.question = new Question()
    this.answer1 = new Answer();
    this.answer2 = new Answer();
    this.answer3 = new Answer();
    this.answer4 = new Answer();
    this.question.answer.push(this.answer1, this.answer2, this.answer3, this.answer4);

    this.quiz.questions.length = 0;

    this.host = this.hostDataService.getHostData();

    this.questions.push(this.question);
    
    this.host.quiz.forEach((quiz: any) => {
      
      this.quiz.quiz_name = quiz.quiz_name;
      this.quiz.questions.push(this.questions[this.questions.length - 2]);
      this.quiz.quiz_id = quiz.quiz_id;
      
    });
    this.requestService.putRequest("quiz", this.quiz.quiz_id, this.quiz);
    this._snackBar.open('Quiz Created Successfully!', 'Close', {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['panelColorChange']
    });
    
  }

  Answer(index: number){
    this.questions.forEach((question: any) => {
      question.answer.forEach((answer: any) => {
        answer.is_correct = false;
      });
      if (question.answer[index].is_correct == false) {
        question.answer[index].is_correct = true;  
      } else {
        question.answer[index].is_correct = false;
      }
      
      console.log(question.answer[index]);
    });
  }
}
