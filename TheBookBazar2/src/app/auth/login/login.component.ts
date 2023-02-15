import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, Validators,FormGroup,FormControl,AbstractControl, NonNullableFormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  
  email : string = '';
  password : string = '';

  constructor(private auth : AuthService,private builder:FormBuilder) { }

  ngOnInit(): void {
    this.loginform = this.builder.group(
      {
        
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      },
    );

  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }

  login() {

    this.submitted = true;
    if (this.loginform.invalid) {
      return;
    } else {
      this.auth.login(this.email,this.password);
    
      this.email = '';
      this.password = '';
  
      // alert("Login Successfully")
    }

   
  }
   
  
}
