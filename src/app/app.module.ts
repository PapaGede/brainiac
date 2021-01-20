import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HostDashboardComponent } from './host/host-dashboard/host-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsComponent } from './host/questions/questions.component';
import { QuizComponent } from './host/quiz/quiz.component';
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { GameComponent } from './host/game/game.component';
import { GamerGameplayComponent } from './player/gamer-gameplay/gamer-gameplay.component';
import { HostGameplayComponent } from './host/host-gameplay/host-gameplay.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule, MatSpinner } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { AnswerCardComponent } from './player/answer-card/answer-card.component';



@NgModule({
  declarations: [
    AppComponent,
    HostDashboardComponent,
    QuestionsComponent,
    QuizComponent,
    GameComponent,
    GamerGameplayComponent,
    HostGameplayComponent,
    AnswerCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatStepperModule,
    MatSnackBarModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '940579741287-kfuigse06tgq7anb7v6a03llnl7ph1gp.apps.googleusercontent.com'
          )
        }]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
