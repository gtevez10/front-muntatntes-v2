
import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {


  transform( heroe: Heroe ): string {
   
    //Excepciones en el pipe 
    if( !heroe.id && !heroe.alt_img ){ // Para mostrar no-image.png cuando se este agregando un heroe 
      return `assets/no-image.png`;
    } else if( heroe.alt_img ){ // si existe alt_img dado por el usuario (copiando direccion url de la imagen) la muestra en la tarjeta 
      return heroe.alt_img;
    } else {
      return `assets/heroes/${ heroe.id }.jpg`;
    }
  }

 
}