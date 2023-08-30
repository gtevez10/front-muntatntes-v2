import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin: 10px;
    }
  `]
})
export class HomeComponent implements OnInit {

  get auth(){
    return this.authservice.auth;
  }

  
  constructor( private router: Router, 
                private authservice: AuthService,) { }

  ngOnInit(): void {  }

  logOut() {

    this.router.navigate(['/auth/login']);

  }

}
