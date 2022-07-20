import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/components/register/confirmed.validator'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-from-roles',
  templateUrl: './from-roles.component.html',
  styleUrls: ['./from-roles.component.css']
})
export class FromRolesComponent implements OnInit {
  form:FormGroup;
  submitted = false;
  data:any;
  token:any; 


  constructor(private dataService: DataService, private toastr:ToastrService,
    private formBuilder: FormBuilder, private router: Router) { }

  /* Validacion reactiva */
  createForm(){
    this.form = this.formBuilder.group({
      name: [null, Validators.required]
    });
  }

  ngOnInit():void {
    this.createForm();
  }

  get f(){
    return this.form.controls;
  };

  /* Registro de roles */
  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
     this.dataService.registerRole(this.form.value).subscribe(res =>{
      this.data = res;
      if(this.data.status === 1) {
        this.router.navigate(['/roles']);
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
