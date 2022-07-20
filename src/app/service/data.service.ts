import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'frontend/node_modules/rxjs/dist/types';
import { Users } from '../models/users/users.model';
import { Roles } from '../models/roles/roles.model';
import { Articulos } from '../models/articulos/articulos.model';
import { Permissions } from '../models/permissions/permissions.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  constructor(private http:HttpClient) { }

  //Regisstro de usuarios desde el home
  registerUser(data: any){
    return this.http.post('/api/auth/registerUser/', data);
  }

  //inicio de sesión
  Login(data: any){
    return this.http.post('/api/auth/login/', data);
  }

  //----gestion de usuarios----////
  //--mostar usuarios---
  indexUsers():Observable<Users[]>{
    return this.http.get<Users[]>('/api/auth/index/');
  }
  //---Crear usuarios por el Admin---
  register(users:Users):Observable<Users>{
    return this.http.post<Users>('/api/auth/register/', users);
  }
  //--Obtener un usuario para actualizar
  getUsers(id:any):Observable<Users>{
    return this.http.get<Users>('/api/auth/show/'+id);
  }
  //--Actualizar usuarios
  updateUsers(users:Users):Observable<Users>{
    return this.http.put<Users>('/api/auth/update/id', users);
  }
  //Eliminar usuarios
  deleteUsers(id:any):Observable<Users>{
    return this.http.delete<Users>('/api/auth/destroy/'+id);
  }

  //----Roles-----///
  //Mostar roles
  indexRoles():Observable<Roles[]>{
    return this.http.get<Roles[]>('/api/rol/index/');
  }
  //---Crear roles
  registerRole(roles:Roles):Observable<Roles>{
    return this.http.post<Roles>('/api/rol/store/', roles);
  }
  //--Obtener un rol para actualizar
  getRoles(id:any):Observable<Roles>{
    return this.http.get<Roles>('/api/rol/show/'+id);
  }
  //--Actualizar roles
  updateRoles(roles:Roles):Observable<Roles>{
    return this.http.put<Roles>('/api/rol/update/id', roles);
  }
  //Eliminar rol
  deleteroles(id:any):Observable<Roles>{
    return this.http.delete<Roles>('/api/rol/destroy/'+id);
  }

  ///-----Permissions----
  //Mostar Permisos
  indexPermissions():Observable<Permissions[]>{
    return this.http.get<Permissions[]>('/api/permission/index/');
  }
  //asignar permisos de vendedor
  registerSell(permissions:Permissions):Observable<Permissions>{
    return this.http.post<Permissions>('/api/permission/UserCreateVendedor', permissions);
  }
  //asignar permisos de cliente
  registerClient(permissions:Permissions):Observable<Permissions>{
    return this.http.post<Permissions>('/api/permission/UserCreateCliente', permissions);
  }

  //----Productos----
  //mostrar productos
  indexProducts():Observable<Articulos[]>{
    return this.http.get<Articulos[]>('/api/articulo/index/');
  }
  //---Crear roles
  registerProducts(articulos:Articulos):Observable<Articulos>{
    return this.http.post<Articulos>('/api/articulo/store/', articulos);
  }
  //--Obtener un rol para actualizar
  getProducts(id:any):Observable<Articulos>{
    return this.http.get<Articulos>('/api/articulo/show/'+id);
  }
  //--Actualizar roles 
  updateProducts(articulos:Articulos):Observable<Articulos>{
    return this.http.put<Articulos>('/api/articulo/update/id', articulos);
  }
  //Eliminar rol
  deleterProducts(id:any):Observable<Articulos>{
    return this.http.delete<Articulos>('/api/articulo/destroy/'+id);
  }




  /* validaciones del token  */
  IsLoggedIn(){
    return localStorage.getItem('token');
  }
  GetToken(){
    return localStorage.getItem('token')||''
  }
}
