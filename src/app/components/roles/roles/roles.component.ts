import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { Roles } from 'src/app/models/roles/roles.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  data:any;
  /* arreglos para mostrar roles en index */
  roles:Roles[];

  constructor(private dataService:DataService, private toastr:ToastrService) { }

  ngOnInit(): void { 
     //mostrar roles en el index
     this.dataService.indexRoles().subscribe(
      e=>this.roles=e
    );
  } 

  //Eliminar Rol 
  delete(roles:Roles):void{
    this.dataService.deleteroles(roles.id).subscribe(res =>{
      this.data = res; 
      if(this.data.status === 1) {
        this.dataService.indexRoles().subscribe(
        response=>this.roles=response)
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
