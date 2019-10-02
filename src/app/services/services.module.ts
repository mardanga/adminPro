
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { LoginGuard } from './guards/login.guard';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SidebarService, SharedService, UsuarioService, HospitalService, MedicoService } from './services.index';

@NgModule({
    imports: [ CommonModule  ],
    declarations: [  ],
    bootstrap:    [  ],
    providers: [
        SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        LoginGuard,
        SubirArchivoService,
        HospitalService,
        MedicoService
    ]
})
export class ServicesModule { }
