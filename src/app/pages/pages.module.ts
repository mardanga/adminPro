import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { HomeComponent } from './home.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from '../services/services.index';



@NgModule(
{
    declarations: [
        HomeComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        SettingsComponent
    ],
    exports: [
        HomeComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
    providers: [SettingsService],
    imports: [
        SharedModule,
        PAGES_ROUTES

    ]
})

export class PagesModule { }
