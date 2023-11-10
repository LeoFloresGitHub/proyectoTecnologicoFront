import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PrincipalComponent } from './inicio/principal/principal.component';
import { RecuperarContraComponent } from './recuperar-contra/recuperar-contra.component';
import { ConfirmacionCorreoComponent } from './confirmacion-correo/confirmacion-correo.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LayoutComponent } from './inicio/layout/layout.component';
import { AuthService } from './auth/auth.service';
import { CrearEmpleadoComponent } from './admin/crear-empleado/crear-empleado.component';
import { ReservaCanchaComponent } from './reserva-cancha/reserva-cancha.component';
import { MisreservasComponent } from './misreservas/misreservas.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    RecuperarContraComponent,
    ConfirmacionCorreoComponent,
    PerfilComponent,
    LayoutComponent,
    CrearEmpleadoComponent,
    ReservaCanchaComponent,
    MisreservasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
