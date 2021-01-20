import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  
  private url = "http://localhost:3000";
  public socket;

  constructor() { 
    this.socket = io(this.url, {transports: ['websocket']});
    
   }

  // join game room
  public joinGameRoom(roomName: string) {
    this.socket.emit('game-play-room', roomName);
  }

  public sendDataToGameRoom(roomName: string, data: any) {
    this.socket.emit('game-play-data', roomName, data);
  }

  public getGameRoomData = () => {
    return Observable.create((observer: any) => {
      this.socket.on('game-play-data', (gameRoomData: any) => {
        if (gameRoomData) {
          observer.next(gameRoomData);
          console.log(gameRoomData);
        } else {
          observer.console.error('Unable to reach server');
        }
      })
    })
  }

}
