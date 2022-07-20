import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users/users.model';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  data:any;
  users:Users[]; //arreglo para mostrar en index

  constructor(private dataService:DataService, private toastr:ToastrService) { }

  
  ngOnInit(): void {
    //mostrar usuarios en el index
    this.dataService.indexUsers().subscribe(
      e=>this.users=e
    );
   
  } 

  //Eliminar usuarios
  delete(users:Users):void{
    this.dataService.deleteUsers(users.id).subscribe(res =>{
      this.data = res;
      if(this.data.status === 1) {
        this.dataService.indexUsers().subscribe(
        response=>this.users=response)
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
