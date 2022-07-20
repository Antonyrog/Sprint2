import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/components/register/confirmed.validator'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-from-users',
  templateUrl: './from-users.component.html',
  styleUrls: ['./from-users.component.css']
})
export class FromUsersComponent implements OnInit {
  form:FormGroup;
  submitted = false;
  data:any;
  token:any; 
 


  constructor(private dataService: DataService, private toastr:ToastrService,
    private formBuilder: FormBuilder, private router: Router) { }

  /* Validaciones reativas */
  createForm(){
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', Validators.required],
      id_rol: [null, Validators.required]
    },{
        validator: [MustMatch('password', 'confirmPassword')]
      });
  }

  ngOnInit():void {
    this.createForm();
  }

  get f(){
    return this.form.controls;
  }; 

  /* Registrar usuario */
  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
     this.dataService.register(this.form.value).subscribe(res =>{
      this.data = res;
      if(this.data.status === 1) {
        this.router.navigate(['/users']);
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
    });
  };
 
}
