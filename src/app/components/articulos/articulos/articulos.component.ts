import { Component, OnInit } from '@angular/core';
import { Articulos } from 'src/app/models/articulos/articulos.model';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  data:any;
  /* Arreglo para mostrar usuarios */
  articulos:Articulos[];

  constructor(private dataService:DataService, private toastr:ToastrService) { }

  ngOnInit(): void {
    //mostrar producto
    this.dataService.indexProducts().subscribe(
      e=>this.articulos=e
    );
  }

   //Eliminar Producto 
   delete(articulos:Articulos):void{
    this.dataService.deleterProducts(articulos.id).subscribe(res =>{
      this.data = res; 
      if(this.data.status === 1) {
        this.dataService.indexProducts().subscribe(
        response=>this.articulos=response)
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
