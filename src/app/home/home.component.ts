import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicio/usuario.service';
import { Usuario } from '../modelo/usuario';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarios:Usuario[] = [];
  id=''

  usuarioForm = new FormGroup({
    nombre: new FormControl(''),
    id_Rol: new FormControl(''),
    activo: new FormControl('')   
  })

  constructor(private servicio:UsuarioService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  private getUsuarios(){
    this.servicio.getUsuarios().subscribe( res =>{
        console.log(res)
        this.usuarios = res
    }, error=>{
      console.log(error)
    })
  }

  public agregarUsuario(){
    this.servicio.agregarUsuario(this.usuarioForm.value)
    .subscribe(res =>{
      this.usuarios.push(res)
      this.usuarioForm.reset('')
    }, error=>{
      console.log(error)
    })
  }
  
  public eliminarUsuario(id:String){
    this.servicio.eliminarUsuario(id).subscribe(() =>{
      this.getUsuarios()
    },error=>{
      console.log(error)
    })
  }

  public getUsuario(id:string){
    this.servicio.getUsuario(id).subscribe(res =>{
      const {id_Usuario,nombre,id_Rol,activo} =res
      this.id = id_Usuario
      this.usuarioForm.setValue({nombre,id_Rol,activo})
    },error =>{
      console.log(error)
    })
  }

  public editarUsuario(){
    let obj = this.usuarioForm.value
    obj.id = this.id
    this.servicio.editarUsuario(obj).subscribe(() =>{
      this.getUsuarios()
      this.usuarioForm.reset('')
    }, error =>{
      console.log(error);
    })
  }

}
