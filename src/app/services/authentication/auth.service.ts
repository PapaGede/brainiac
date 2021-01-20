import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { HostNameService } from 'src/app/services/host-name/host-name.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: SocialUser;
  domainAddress: any = "@turntabl.io";
  localHolder: any;
  type!: string;

  constructor(
    private authService: SocialAuthService, 
    private router: Router,
    private hostNameService: HostNameService) { }

    hostSignInWithGoogle(): void{
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.authService.authState.subscribe(userData=>{
        this.user = userData;
        this.hostNameService.setHostName(this.user.name);
        if (this.user.email.includes(this.domainAddress)) {
          var details = {name: userData.name, type: 'host'};
        localStorage.setItem('name', JSON.stringify(details));
          this.router.navigate(['/host-dashboard'])
        } else {
          alert("Invalid Account")
        }
        }, error => {
          console.log(error)
      })
  }

  playerSignInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      if (this.user.email.includes(this.domainAddress)) {
        var details = {name: userData.name, type: 'player'};
        localStorage.setItem('name', JSON.stringify(details));
        this.router.navigate(['/gamer-gameplay'])
      } else {
        alert("Invalid Account")
      }
      }, error => {
        console.log(error)
    });
    
  }

  isNotLogin(){
    if(localStorage.getItem('name')==null){
   this.router.navigate(['/signin']);
    }
  }

  isLogin(){
    this.localHolder = localStorage.getItem('name');
    if(this.localHolder!=null){
    this.type = JSON.parse(this.localHolder).type;
      if(this.type=="host"){
      this.router.navigate(['host-dashboard']);
      }else if(this.type=="player"){
      this.router.navigate(['gamer-gameplay']);
      }
  
       }
  }
  logout(){
    this.authService.signOut;
    localStorage.removeItem('name');
    this.router.navigate(['/signin']);
  }
}
