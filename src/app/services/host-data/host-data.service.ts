import { Injectable } from '@angular/core';
import { Host } from "src/app/classes/host/host";

@Injectable({
  providedIn: 'root'
})
export class HostDataService {

  currentHostData: Host = new Host();

  constructor() { }

  setHostData(hostData: any){
    this.currentHostData = hostData.pop();
    console.log(hostData);
  }

  getHostData(){
    return this.currentHostData;
  }
}
