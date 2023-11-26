import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './inicio/principal/principal.component';
import { RecuperarContraComponent } from './recuperar-contra/recuperar-contra.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { UnauthGuardService } from './auth/unauth-guard.service';
import { ConfirmacionCorreoComponent } from './confirmacion-correo/confirmacion-correo.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LayoutComponent } from './inicio/layout/layout.component';
import { CrearEmpleadoComponent } from './admin/crear-empleado/crear-empleado.component';
import { ReservaCanchaComponent } from './reserva-cancha/reserva-cancha.component';
import { MisreservasComponent } from './misreservas/misreservas.component';
import { ReservaPiscinaComponent } from './reserva-piscina/reserva-piscina.component';
import { ReservaSalonComponent } from './reserva-salon/reserva-salon.component';
import { PasarelaComponent } from './pasarela/pasarela.component';
import { PanelComponent } from './panel/panel.component';
import { GestionarRolesComponent } from './gestionar-roles/gestionar-roles.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,canActivate: [UnauthGuardService],data: { requireAuthenticated: true } },
  { path: 'home', component: LayoutComponent ,
  children: [
    { path: '', component: PrincipalComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'reservacancha', component: ReservaCanchaComponent },
    { path: 'reservapiscina', component: ReservaPiscinaComponent },
    { path: 'permisos', component: GestionarRolesComponent , canActivate: [UnauthGuardService], data: { requireAuthenticated: false, requirePermission: true , permisoID:5} },
    { path: 'reservasalon', component: ReservaSalonComponent },
    { path: 'misreservas', component: MisreservasComponent },
  ],},
  { path: 'pasarela', component: PasarelaComponent },
  { path: 'prueba', component: PanelComponent },

  { path: 'recuperarContra/:token', component: RecuperarContraComponent },
  { path: 'auth/confirmar/:token', component: ConfirmacionCorreoComponent },
  { path: 'crearempl', component: CrearEmpleadoComponent, canActivate: [UnauthGuardService], data: { requireAuthenticated: false, requirePermission: true , permisoID:4} },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
