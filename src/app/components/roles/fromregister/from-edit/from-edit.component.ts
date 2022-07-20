import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/models/roles/roles.model'; 
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-from-edit',
  templateUrl: './from-edit.component.html',
  styleUrls: ['./from-edit.component.css']
})
export class FromEditComponent implements OnInit {
  form:FormGroup;
  submitted = false;
  roles:Roles = new Roles(); //nuevo rol
  data:any;

  constructor(private dataService:DataService, private toastr:ToastrService,
    private router:Router, private formBuilder: FormBuilder,
    private activatedRoute:ActivatedRoute) { }

  /* validaciones reactivas */
  createForm(){
    this.form = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.createForm(),
    this.show();
  }


  get f(){
    return this.form.controls;
  };

  /* cacturar datos para mostrarlos al editar  */
  show():void{
    this.activatedRoute.params.subscribe(
      e=>{
        let id=e['id'];
        if(id){
          this.dataService.getRoles(id).subscribe(
            es=>this.roles=es
          );        
        }
      }
    );
  }

  /* Realizar actualización */
  updateRole(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.dataService.updateRoles(this.roles).subscribe(res =>{
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
  }
 
}
