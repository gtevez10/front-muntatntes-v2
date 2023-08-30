import { HeroesService } from '../../services/heroes.service';
import { AgregarComponent } from './agregar.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { MaterialModule } from 'src/app/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('AgregarComponent', () => {
  let component: AgregarComponent;
  let fixture: ComponentFixture<AgregarComponent>;
  let activatedRoute: ActivatedRoute;
  let heroesService: HeroesService;
  let router: Router;
  let snackBar: MatSnackBar;

  const mockSnackBar = {
    open: jasmine.createSpy('open'),
  };

  beforeEach(async () => {
    activatedRoute = {
      params: of({ id: 1 }), // Simula el valor del parámetro 'id'
    } as any;
    await TestBed.configureTestingModule({
      declarations: [AgregarComponent, ImagenPipe],
      providers: [
        HeroesService,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        { provide: MatSnackBar, useClass: class { open = jasmine.createSpy('open'); } }
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MaterialModule,
        NoopAnimationsModule,
        FormsModule
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AgregarComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService);
    router = TestBed.inject(Router);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create, AgregarComponent correctly ', () => {
    expect(component).toBeTruthy();
  });

  it('should call agregarHeroe(heroe:Heroe) when heroe has no id ', () => {

    const heroeToAdd: Heroe= {
        id: undefined,
      superhero: 'Superman',
      alter_ego: 'Clark Kent',
      characters: 'Superman characters',
      first_appearance: 'Action Comics #1',
      publisher: Publisher.DCComics,
      alt_img: 'url-to-image',
    };

    spyOn(heroesService, 'agregarHeroe').and.returnValue(of({ ...heroeToAdd, id: "1"}));
    component.heroe= heroeToAdd;
    component.guardar();
    expect(heroesService.agregarHeroe).toHaveBeenCalledWith(heroeToAdd);
    expect(router.navigate).toHaveBeenCalledWith(['/heroes/editar', "1" ]);
    expect(snackBar.open).toHaveBeenCalledWith('Heroe AGREGADO correctamente', 'Entendido!', jasmine.any(Object));
  });
});
