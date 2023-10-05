import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {


  constructor(private auth: AuthService,private router: Router) {
   
   }

   cerrarSesion(){
    this.auth.logout()
    this.router.navigate(['/login']);
   }

}
