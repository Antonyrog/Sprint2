import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './confirmed.validator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;
  submitted = false;
  data:any;

  constructor(private dataService: DataService, private toastr:ToastrService,
     private formBuilder: FormBuilder, private router: Router) { }

  /* validaciones reactivas */
  createForm(){
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: [MustMatch('password', 'confirmPassword')]
    });
  }

  ngOnInit(): void {
    this.createForm();
  } 

  get f(){
    return this.form.controls;
  }; 

  /* Registro de cliente */
  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
     this.dataService.registerUser(this.form.value).subscribe(res =>{
      this.data = res;
      if(this.data.status === 1) {
        this.router.navigate(['/login']);
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut: 2000,
          progressBar: true
        });
      }else{
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        });
      }
     })

  };

}
