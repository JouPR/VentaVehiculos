import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PagVehiculoEditar',
  templateUrl: './PagVehiculoEditar.component.html',
  styleUrls: ['./PagVehiculoEditar.component.css']
})
export class PagVehiculoEditarComponent implements OnInit {

  vehiculo: any = {};
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private service: VehiculoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    
    this.form = this.formBuilder.group({
      codigo: [''],
      marca: [''],
      modelo: [''],
      anio: [''],
      kilometraje: [''],
      precio: [''],
      calificacion: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.service.getVehiculo(params['codigo']).subscribe((respuesta: any) => {
        console.log('Datos del vehículo:', respuesta);
        this.vehiculo = respuesta?.data;
        this.form.patchValue({
          codigo: this.vehiculo?.codigo,
          marca: this.vehiculo?.marca,
          modelo: this.vehiculo?.modelo,
          anio: this.vehiculo?.anio,
          kilometraje: this.vehiculo?.kilometraje,
          precio: this.vehiculo?.precio,
          calificacion: this.vehiculo?.calificacion,
        });
      });
    });
  }

  updateVehiculo(){
    this.service.actualizarVehiculo(this.vehiculo.codigo,this.form.value)
    .subscribe((respuesta)=>{
      Swal.fire({
        title: 'Actualización completa',
        text: 'Vehículo actualizado con exito',
        icon: 'success'})
    })
  }
  redirectToHome() {
    this.router.navigateByUrl('/vehiculos');
  }

}
