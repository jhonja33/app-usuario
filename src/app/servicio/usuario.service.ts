import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/usuario';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  url:String = environment.baseUrl
  constructor(private http:HttpClient) { }

  public getUsuarios(){
    return this.http.get<Usuario[]>(this.url+'/usuario')
  }

  public agregarUsuario(obj:Usuario){
    return this.http.post<Usuario>(this.url+'/usuario', obj);
  }

  public eliminarUsuario(id:String){
    return this.http.delete(this.url+`/usuario/${id}`)
  }

  public getUsuario(id:String){
    return this.http.get<Usuario>(this.url+`/usuario/${id}`)
  }

  public editarUsuario(obj:Usuario){
    return this.http.put(this.url+'/usuario', obj);
  }
}
