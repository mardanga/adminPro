import { LoginGuard } from './guards/login.guard';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SidebarService, SharedService, UsuarioService } from './services.index';

@NgModule({
    imports: [ CommonModule  ],
    declarations: [  ],
    bootstrap:    [  ],
    providers: [
        SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        LoginGuard
    ]
})
export class ServicesModule { }
