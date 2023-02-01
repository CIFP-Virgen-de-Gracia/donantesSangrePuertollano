import { Injectable } from "@angular/core";
import { UsuarioLogin } from "../interfaces/usuarios.interface";

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    login(usr: UsuarioLogin): any {
        console.log(usr);
    }
}