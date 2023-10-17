import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  routerOutletActive = true;
  credenciales:any = localStorage.getItem('token')

  constructor(private auth: AuthService,private router: Router) {
   
   }

  
  

}
