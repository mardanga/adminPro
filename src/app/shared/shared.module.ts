import { NgModule } from '@angular/core';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        NotpagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NotpagefoundComponent
    ],
    exports: [
        NotpagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NotpagefoundComponent
    ],
    imports:[RouterModule]
})
export class SharedModule { }
