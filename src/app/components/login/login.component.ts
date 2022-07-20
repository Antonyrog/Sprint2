import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  submitted = false;
  data: any;
  token: any;

  constructor( private dataService: DataService, private toastr:ToastrService, 
    private formBuilder: FormBuilder, private router: Router) { }

  /* Validaciones reactivas */
  loginForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.loginForm();
  }

  get f() {
    return this.form.controls;
  }

  /* inicio de sesión */
  submit(){
    this.submitted = true;

    if(this.form.invalid){
      return;
    }
    this.dataService.Login(this.form.value).subscribe(res => {
      this.data = res;
      if (this.data.status === 1) {
        this.token = this.data.data.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['']);
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),
        {
          timeOut: 2000,
          progressBar: true
        });
      }else if(this.data.status === 0 ){
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),
        {
          timeOut: 2000,
          progressBar: true
        });
      }

    });
  }
}
