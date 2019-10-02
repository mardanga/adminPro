import { Router, ActivatedRoute } from '@angular/router';
import { HospitalService } from './../../services/hospitales/hospital.service';
import { MedicoService } from './../../services/medicos/medico.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  medico: Medico = new Medico('','','','');
  hospitales: Hospital[] = []
  hospital: any = new Hospital('','','');

  constructor(private _ms: MedicoService, private _hs: HospitalService, private router: Router, private ar: ActivatedRoute) { }

  ngOnInit() {
    this._hs.obtenerHospitales(0).subscribe(resp => {
      this.hospitales = resp.hospitales});

    this.ar.params.subscribe( params => {       
      if(params['id'] !== 'nuevo'){
        this.medico._id = params['id'];     
        this._ms.obtenerMedico(this.medico._id).subscribe((resp: any )=> {
          this.medico = resp.medico;
          this.medico.hospital = resp.medico.hospital._id;
          this.cambiarHospital(this.medico.hospital);
        });   
      }
    });
  }

  cambiarHospital(id) {
    this._hs.obtenerHospital(id).subscribe((res)=> {
      this.hospital = res.hospital;
    })
  }


  guardarMedico(f: NgForm){
    if(f.invalid)
      return;
 
    this._ms.guardarMedico(this.medico).subscribe((r : any)=> {
      this.router.navigate(['/medico', r.medico._id]);
    });
  }
}
