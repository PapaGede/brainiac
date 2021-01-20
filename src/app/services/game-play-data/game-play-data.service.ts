import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamePlayDataService {

  gamePlayData: any;

  constructor() { }

  setGamePlayData(gamePlayData: any){
    this.gamePlayData = gamePlayData;
  }

  getGamePlayData(){
    return this.gamePlayData;
  }

}
