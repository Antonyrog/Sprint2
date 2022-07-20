import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Permissions } from 'src/app/models/permissions/permissions.model';
import { ToastrService } from 'ngx-toastr'; 


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  data:any;
  /* arreglo para mostrar en el index todos los registros */
  permissions:Permissions[];


  constructor(private dataService:DataService, private toastr:ToastrService) { }


  ngOnInit(): void {
    //mostrar permisos en el index
    this.dataService.indexPermissions().subscribe(
      e=>this.permissions=e
    );
  }

}
