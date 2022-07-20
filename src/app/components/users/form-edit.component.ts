import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/models/users/users.model';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {
  form:FormGroup;
  submitted = false;
  users:Users = new Users();
  data:any;


  constructor(private dataService:DataService, private toastr:ToastrService,
    private router:Router, private formBuilder: FormBuilder,
    private activatedRoute:ActivatedRoute) { }
  
  /* Validaciones reactivas */
    createForm(){
      this.form = this.formBuilder.group({
        id: [null, Validators.required],
        name: [null, Validators.required],
        email: ['',[Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
        id_rol: [null, Validators.required]
      });
    }

  ngOnInit(): void {
    this.createForm(),
    this.show();
  }

  get f(){
    return this.form.controls;
  };

  //cargar datos con funciones anonimas para que se editen ---
  //  No me funciono --arreglar
  show():void{
    this.activatedRoute.params.subscribe(
      e=>{
        let id=e['id'];
        if(id){
          this.dataService.getUsers(id).subscribe(
            es=>this.users=es
          );        
        }
      }
    );
  }

  /* Actualizar usuario */
  updateUser(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.dataService.updateUsers(this.users).subscribe(res =>{
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
  }
 
}

