import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form:FormGroup;
  submitted = false;
  data:any;
  token:any;

  constructor(private dataService: DataService, private toastr:ToastrService,
    private formBuilder: FormBuilder, private router: Router) { }

    /* Validaciones */
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
  }

  get f(){
    return this.form.controls;
  };

  /* Registrar productos */
  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
     this.dataService.registerProducts(this.form.value).subscribe(res =>{
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
  };

}
