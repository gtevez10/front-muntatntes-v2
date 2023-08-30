import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {

  heroes$: Observable<Heroe[]> = new Observable<Heroe[]>();
  
  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void { 
     //Consumo la peticion Http mand0ada en el servicio 

    this.heroes$ = this.heroesService.getHeroes()

  }

}
