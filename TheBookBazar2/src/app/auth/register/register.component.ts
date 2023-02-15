import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup,FormControl,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'
import { AuthService } from 'src/app/shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  registerform: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  isLogin =false;
  email : string = '';
  password : string = '';
  IsSignIn=false
  constructor(private auth : AuthService, public afAuth:AngularFireAuth, private router:Router,private builder:FormBuilder,  private toastr: ToastrService) { }

  ngOnInit(): void {
   
    

    this.registerform = this.builder.group(
      {
        name: ['',[Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      },
     
    );
    
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registerform.controls;
  }
  

  async register() {

    this.submitted = true;
    if (this.registerform.invalid) {
      return;
    } 
    else {
      
     
   await this.auth.register(this.email,this.password);
    this.email = '';
    this.password = '';
    this.toastr.success('Registered Successfully')


    }

  
  }

  // RegisterWithGoogle(){
  //   const googleAuthProvider=new firebase.auth.
  //   this.afAuth.signInWithPopup(googleAuthProvider);
    
  // }

 
}
