import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../../components/mat-dialog/mat-dialog.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [ `
    img{
      width: 90%;
      border-radius: 15px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },

    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]

  heroe: Heroe = {
    superhero :'',
    alter_ego : '',
    characters : '',
    first_appearance : '',
    publisher : Publisher.DCComics,
    alt_img : '',

  }

  constructor( private heroesService: HeroesService,
               private ActivatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               public dialog: MatDialog,) { }

  ngOnInit(): void {

    if( this.router.url.includes('editar')){ // SI la URL tiene editar realizo el ActivatedRoute.params, esto para quitar el error cuando se esta agregando un heroe que no tiene un ID aun establecido  

      this.ActivatedRoute.params  /*ActivatedRoute.params me devuelve un Observable que me lee los cambios de los paramtros de la URL*/
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroePorId(id) )
      )
      .subscribe( heroe => this.heroe = heroe );

    } 
     
    
  }

  guardar(){ // AQUI AGREGO Y ACTUALIZO HEROE 

    if( this.heroe.superhero.trim().length === 0 ){ 
      return;
    }

    if( this.heroe.id){ // Si tiene ID, eS porque el heroe existe y se va a ACTUALIZAR
      this.heroesService.editarHeroe(this.heroe)
      .subscribe( heroeEditado => this.mostrarSnackBar('Heroe ACTUALIZADO correctamente') )
      this.router.navigate(['/heroes']);
      
    }else{ // Si NO tiene ID, eS porque SE VA AGREGAR 

      this.heroesService.agregarHeroe( this.heroe )
        .subscribe( heroeAgregado => {
          this.router.navigate(['/heroes/editar',heroeAgregado.id]);
          this.mostrarSnackBar('Heroe AGREGADO correctamente');
        }) 
    }

  }

  borrarHeroe(){ 

    const matDialog= this.dialog.open( MatDialogComponent,{
      width:'250px',
      data: this.heroe
    });

    matDialog.afterClosed()
      .subscribe( result => {
         if( result ){

           this.heroesService.eliminarHeroe(this.heroe.id!)
             .subscribe( resp => {
               this.router.navigate(['/heroes']);
               this.mostrarSnackBar('Heroe ELIMINADO correctamente');
             })
      }
      })




  }

  mostrarSnackBar( mensaje: string ){
    this.snackBar.open( mensaje,'Entendido!',{
       duration: 3000,
       data: this.heroe
    });
  }

}
