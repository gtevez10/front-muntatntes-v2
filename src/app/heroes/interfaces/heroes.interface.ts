export interface Heroe {
    id?:              string; // se pone '?' ya que para los metodos  editar y eliminar requiero el ID PERO en agregar no tengo id  
    superhero:        string;
    publisher:        Publisher;
    alter_ego:        string;
    first_appearance: string;
    characters:       string;
    alt_img?:         string; // https://kasdfjaskdfajsdf.com/img.png
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}
