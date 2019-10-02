import { PipesModule } from './../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { RouterModule } from '@angular/router';
import { BusquedaComponent } from './busqueda/busqueda.component';


@NgModule({
    declarations: [
        NotpagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NotpagefoundComponent,
        BusquedaComponent
    ],
    exports: [
        NotpagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NotpagefoundComponent
    ],
    imports: [ RouterModule, 
        CommonModule,
        PipesModule 
    ]
})
export class SharedModule { }
