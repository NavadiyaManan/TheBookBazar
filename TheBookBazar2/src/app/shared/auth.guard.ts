import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
 constructor(private authFire:AngularFireAuth, private toastr: ToastrService ) {}
 
  async canActivate(
      route: ActivatedRouteSnapshot,
      state:RouterStateSnapshot):Promise<boolean|UrlTree>{

        const user=await this.authFire.currentUser;
        const isAuth =user ? true :false;
        if(!isAuth){
          this.toastr.error("Please Login First !")
        }
        
        return isAuth;
      }

  
}
