import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [

  // LAZY LOAD DE RUTAS HIJAS SE COLOCAN PRIMERO
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),// Se debe cargar el modulo que contiene al modulo de rutas
  
    
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule ), // Se debe cargar el modulo que contiene al modulo de rutas
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ]
    
  },
  //RUTAS PRINCIPALES
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]


@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
