import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../Utilitarios/modelos/Vehiculo';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validadorCodigo } from '../../validaciones/VehiculoValidaciones';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PagVehiculo',
  templateUrl: './PagVehiculo.component.html',
  styleUrls: ['./PagVehiculo.component.css']
})
export class PagVehiculoComponent implements OnInit {
//instanciar el objeto
 vehiculo?: Vehiculo;
  formulario: FormGroup;
  constructor(
    private activatedroute:ActivatedRoute, //ActivatedRoute permite obtener los datos de la url
    private vehiculoService: VehiculoService,
    private formBuilder:FormBuilder,
    private router: Router
    
    
  ) {
    this.formulario = this.formBuilder.group({
      "codigo": ['', [Validators.required, validadorCodigo()] ],
      "marca": ['', Validators.required],
      "modelo": ['', Validators.required],
      "anio": [''],
      "kilometraje": [''],
      "precio": [''],
      "calificacion": [''],
      "foto": ['']
    });
    this.formulario.controls['codigo'].disable();
  }
  
  ngOnInit() {
    //subscribe: es un método que se ejecuta cada vez que hay un cambio 
    //OBSERVABLE (servicio escucha) no pregunta por el cambio, solo escucha y se ejecuta el codigo
    
    this.activatedroute.params.subscribe(params => {
      this.vehiculoService.getVehiculo(params['codigo']).subscribe( data => {
        if(data.codigo == '1'){
          this.vehiculo = data.data;
          this.formulario.controls['codigo'].setValue(this.vehiculo?.codigo);
          this.formulario.controls['marca'].setValue(this.vehiculo?.marca);
          this.formulario.controls['modelo'].setValue(this.vehiculo?.modelo);
          this.formulario.controls['anio'].setValue(this.vehiculo?.anio);
          this.formulario.controls['kilometraje'].setValue(this.vehiculo?.kilometraje);
          this.formulario.controls['precio'].setValue(this.vehiculo?.precio);
          this.formulario.controls['calificacion'].setValue(this.vehiculo?.calificacion);
          this.formulario.controls['foto'].setValue(this.vehiculo?.foto);
        }else{
        Swal.fire({
          title: "Mensaje",
          text: "No se pudo cargar la información",
          icon: "error"
        });
      }
      });
    }) 
    //this.vehiculo = this.vehiculoService.getVehiculo(params['codigo'])
  }
  guardar() {
    if (this.formulario.valid) {
      this.vehiculoService.insertVehiculo({ ...this.formulario.value }).subscribe(data => {
        if (data.codigo === '1') {
          Swal.fire({
            title: "Mensaje",
            text: "Vehículo guardado con éxito",
            icon: "success"
          });
          this.redirectToLista();
        }
      });
    } else {
      Swal.fire({
        title: "Mensaje",
        text: "Faltan campos por llenar",
        icon: "error"
      });
    }
  }
  redirectToLista() {
    console.log('Redirige a lista');
    this.router.navigateByUrl('/vehiculos');
  }
  
  imprimir(data:any){
    console.log('Calificación:',data);
  }
  
}
//Los observables son como promesas, las promesas son peticiones asincronas, se ejecuta una vez

