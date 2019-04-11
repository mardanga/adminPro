import { PipesModule } from './../pipes/pipes.module';

import { GraficoDonaComponent } from './../components/grafico-dona/grafico-dona.component';
import { IncrementadorComponent } from './../components/incrementador/incrementador.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {CommonModule} from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { HomeComponent } from './home.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from '../services/services.index';

import { ChartsModule } from 'ng2-charts';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule(
{
    declarations: [
        HomeComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        SettingsComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        PromesasComponent,
        RxjsComponent,
        PerfilComponent

    ],
    exports: [
        HomeComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        PerfilComponent
    ],
    providers: [SettingsService],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        CommonModule,
        PipesModule

    ]
})    

export class PagesModule { }
