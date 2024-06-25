import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { validadorCodigo } from '../../validaciones/VehiculoValidaciones';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-PagVehiculoRegistro',
  templateUrl: './PagVehiculoRegistro.component.html',
  styleUrls: ['./PagVehiculoRegistro.component.css']
})
export class PagVehiculoRegistroComponent implements OnInit {
  
  //vehiculo: Vehiculo
  formulario: FormGroup
  constructor(
    private vehiculoServicio: VehiculoService,
    private formBuilder:FormBuilder // formBuilder sirve para gestionar y manejar todos los estados del formulario
     ) 
  { 
   
    this.formulario = this.formBuilder.group({
      "codigo": ['',[Validators.required, validadorCodigo()]], // También se puede declarar un objeto con un string vacío "codigo": "",
      "codigo_confirm": [],
      "marca": ['',[Validators.required]], // En este[] se colocará la inicialización del objeto,no es array 
      "modelo": ['',[Validators.required]], // [] es igual que new FormControl("")
      "anio": ['', Validators.required], //Existen otros tipos de validadores ejm : Validators.pattern('^[0-9]*$')
      "kilometraje": ['', Validators.required],
      "precio": [],
      "calificacion": ['', Validators.required],
    },/* {
      validators:validarCodigoComparativo() //Aquí se escriben los validadores del formulario
    } */);
  }
//Se puede crear tus propios validadores o usar los validadores de angular
  ngOnInit() {
   // this.formulario.controls['codigo'].disable(); Para desabilitar el campo del formulario
  }
  guardar(){
    if (this.formulario.valid) {
      console.log('Guardando vehículo:', this.formulario.value);
      this.vehiculoServicio.insertVehiculo(this.formulario.value).subscribe(
        respuesta => {
          // 1 = exito
          if (respuesta.codigo == '1') {
            Swal.fire({
              title: 'Mensaje Completo',
              text: 'Vehiculo registrado con exito',
              icon: 'success'
            }).then(() => {
              this.formulario.reset();
            });
          } else {
            Swal.fire({
              title: 'Mensaje',
              text: 'No se pudo registrar el vehiculo: ' + respuesta.mensaje,
              icon: 'error'
            });
          }
        },
        error => {
          console.error('Error al intentar guardar el vehículo:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al intentar guardar el vehículo. Por favor, inténtelo de nuevo más tarde.',
            icon: 'error'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Mensaje Incompleto',
        text: 'Existen campos sin llenar o con datos inválidos',
        icon: 'error'
      });
    }
  }
}



//Se puede crear tus propios validadores o usar los validadores de angular

//Se está creando un nuevo validador
/* export function validadorCodigo():ValidatorFn{
  return(control:AbstractControl): ValidationErrors | null =>{
    const codigoV= /^[A-Z]\d{4}$/;
    let value = control.value;
    if(codigoV.test(value)){
      return null;
    }
    return {'codigoValidate':true};
  }
} */

export function validarCodigoComparativo(){
  return(formulario:FormGroup):ValidationErrors | null =>{
    let valor=formulario.controls['codigo'].value;
    let valor2=formulario.controls['codigo_confirm'].value;
    if(valor===valor2){
      return null;
    }
    return {'codigoComparativo':true};
  }
}
