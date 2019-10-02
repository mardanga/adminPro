import { APP_ROUTES } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesModule } from './pages/pages.module';
import { ServicesModule } from './services/services.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicoComponent } from './pages/medicos/medico.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MedicoComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    ServicesModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
