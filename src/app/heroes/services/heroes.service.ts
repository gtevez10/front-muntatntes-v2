import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl; // Como la URL es LocalHost lo coloco en los environment para usarla MIENTRAS este es desarrollo, REVISAR environment.prod para modificar la url cuando vaya a desplegar la App a produccion

  constructor( private http: HttpClient ) { }

  /* getHeroes() Importante colocar el return, para que me devuelva un Observable en el componente que lo vaya a consumir (heroe-listado )
  Con este metodo realizo el llamado http pero lo consumo en el componente */
  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes`);
  }

  /* getHeroePorId() me devuelva un Observable en el componente que lo vaya a consumir (heroe- agregar )
  Con este metodo realizo el llamado http pero lo consumo en el componente */
  getHeroePorId( id: string ):Observable<Heroe> {
    return this.http.get<Heroe>(`${ this.baseUrl }/heroes/${ id }`);
  }

  /* getSugerencias() me devuelva un Observable en el componente que lo vaya a consumir (heroes- buscar )
  Con este metodo realizo el llamado http pero lo consumo en el componente */
  getSugerencias( termino: string ): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes?q=${ termino }&_limit=6`);
  }

  /*Peticion POST para AGREGAR , La consumo en agregar.component*/

  agregarHeroe( heroe:Heroe ){
    return this.http.post<Heroe>(`${ this.baseUrl }/heroes`, heroe)
  }

   /*Peticion PUT  para EDITAR , La consumo en agregar.component*/
  editarHeroe( heroe:Heroe ):Observable<Heroe>{
    return this.http.put<Heroe>(`${ this.baseUrl }/heroes/${ heroe.id }`,heroe);

  }
  /*Peticion DELETE  para ELIMINIAR , La consumo en agregar.component*/
  eliminarHeroe( id:string ):Observable<any>{
    return this.http.delete<any>(`${ this.baseUrl }/heroes/${ id }`);

  }

  

}
