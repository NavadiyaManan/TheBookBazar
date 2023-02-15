import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { async } from '@firebase/util';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  IsLogin=false;
  constructor(private fireAuth : AngularFireAuth, private router : Router) { 
    

  }
  login(email : string, password : string) {
    this.fireAuth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');
       
       
        if(res.user?.emailVerified == true) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/varify-email']);
        }


    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }
  // login method
  // async login(email : string, password : string) {
  //   await this.fireAuth.signInWithEmailAndPassword(email,password)
  //   .then( (res) => {
  //       if(res.user?.emailVerified == true) {
  //         this.IsLogin=true;
  //         this.router.navigate(['dashboard']);
       
  //       } 

  //   }, err => {
  //       alert(err.message);
  //       this.router.navigate(['/login']);
  //   })
  // }

  // register method
  async register(email : string, password : string) {{
   await this.fireAuth.createUserWithEmailAndPassword(email, password).then( res => {
   this.IsLogin=true;
   
        
    this.sendEmailForVarification(res.user);
    this.router.navigate(['/varification']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })  
  }
  }

  // sign out
  logout() {
    this.fireAuth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email : string) {
      this.fireAuth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/varify-email']);
      }, err => {
        alert('Something went wrong');
      })
  }

  // email varification
  sendEmailForVarification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/varify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  isLogin(){
    return localStorage.getItem('user')!=null
  }
}
