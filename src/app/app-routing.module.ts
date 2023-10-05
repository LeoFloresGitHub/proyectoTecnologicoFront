import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { RecuperarContraComponent } from './recuperar-contra/recuperar-contra.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { UnauthGuardService } from './auth/unauth-guard.service';
import { ConfirmacionCorreoComponent } from './confirmacion-correo/confirmacion-correo.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,canActivate: [UnauthGuardService] },
  { path: 'home', component: PrincipalComponent, canActivate: [AuthGuardService] },
  { path: 'recuperarContra/:token', component: RecuperarContraComponent },
  { path: 'auth/confirmar/:token', component: ConfirmacionCorreoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
