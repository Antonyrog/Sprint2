import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private router:Router) { }

    token:any;

    /* guard validacion del token, si no tiene redireciona al login */
    canActivate(){
        this.token = localStorage.getItem('token');
        if (!this.token) {
            this.router.navigate(['login']);            
        }
        return true;
    }
}