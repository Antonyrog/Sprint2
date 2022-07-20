import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token:any;
  userData:any;
  name:any;
  id_rol: any;

  constructor(private router:Router) { }

  /* ingreso de jwt al localStorage */
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.name = this.userData.name; 
  }



  /* logout */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
