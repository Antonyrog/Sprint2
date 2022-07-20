import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulos } from 'src/app/models/articulos/articulos.model';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  form:FormGroup;
  submitted = false;
  articulos:Articulos = new Articulos();
  data:any;

  constructor(private dataService:DataService, private toastr:ToastrService,
    private router:Router, private formBuilder: FormBuilder,
    private activatedRoute:ActivatedRoute) { }

  /* Realizar validaciones formulario reactivo */
  createForm(){
    this.form = this.formBuilder.group({
      id: [null, Validators.required],
      descripcion: [null, Validators.required],
      precio: [null, Validators.required],
      stock: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.show();
  }

  get f(){
    return this.form.controls;
  };

  /* mostrar datos para actualizar */
  show():void{
    this.activatedRoute.params.subscribe(
      e=>{
        let id=e['id'];
        if(id){
          this.dataService.getProducts(id).subscribe(
            es=>this.articulos=es
          );        
        }
      }
    );
  }

  /* Edtar producto */
  updateProducts(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.dataService.updateProducts(this.articulos).subscribe(res =>{
      this.data = res;
      if(this.data.status === 1) {
        this.router.navigate(['/products']);
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
