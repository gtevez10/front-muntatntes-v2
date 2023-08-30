import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad,CanActivate {

  constructor( private authService: AuthService,
               private router: Router  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> |  Promise<boolean> | boolean{


      return this.authService.verificarAutentificaion()
        .pipe(
          tap( usuarioAutentificado => {

            if( !usuarioAutentificado ){
              this.router.navigate([ '/auth/login' ])
            }

          } )
        )
      
      // if( this.authService.auth.id ){
      //   return true   
      // }

      // console.log('Bloqueado por canActive');

      // return false;
  }


  canLoad(  // Me protege para que el usuario no pueda cargar el modulo de auntentificacion, abriendo el path de heroes manualmente  y ver el listado  OJO si el modulo esta ya previamente cargado el usuario podra ver la ruta sin problema, para solucionar esto esta CanActivate
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificarAutentificaion()
        .pipe(
          tap( usuarioAutentificado => {

            if( !usuarioAutentificado ){
              this.router.navigate([ '/auth/login' ])
            }

          } )
        )
      
      // if( this.authService.auth.id ){
      //   return true 
      
      // }s

      // console.log('Debes autentificarte primero en el Login - canLoad');
      // return false 
      
  }
}
