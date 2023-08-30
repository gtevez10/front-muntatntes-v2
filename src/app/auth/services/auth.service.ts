import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: User | undefined ; // Aqui guardo el usuario que se logueo 

  
  constructor( private http: HttpClient ) { }

  get auth():User {
    return { ...this._auth! } // retorno una copia de mi _auth la cual contiene la informacion del usuario logueado
  }

  verificarAutentificaion(): Observable<boolean>{

    if( !localStorage.getItem('id') ){

      return of(false); //of. Me sirve para resolver un observable, otra solucion es decir   verificarAutentificaion(): Observable<boolean> | boolean
    }

    return this.http.get<User>(`${ this.baseUrl }/usuarios/1`)
      .pipe( 
        map( user => {
          this._auth = user
          return true
        })
       )

  }

  login(){

    return this.http.get<User>(`${ this.baseUrl }/usuarios/1`)
      .pipe(  // tap me permite hacer operaciones rjx antes del Subscribe del LoginComponent, ya que no es posible tener dos subscriptores por eso se usa TAP
        tap( user => this._auth = user ),
        tap( user => localStorage.setItem( 'id', user.id )) // graba el id del usuario logueado en el localStorage para mantener la sesion iniciada aun cuando se recargue le navegador 
      );
      
    
  }


}
