import { LoginGuard } from './../services/guards/login.guard';

import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { HomeComponent } from './home.component';
import { SettingsComponent } from './settings/settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
            { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficos'} },
            { path: 'settings', component: SettingsComponent, data: {titulo: 'Configuracion'} },
            { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
