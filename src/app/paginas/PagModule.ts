import { NgModule } from '@angular/core';
import { PagListaComponent } from './PagLista/PagLista.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilitariosModule } from '../Utilitarios/UtilitariosModule';
import { PagVehiculoComponent } from './PagVehiculo/PagVehiculo.component';
import { ROUTES, Router, RouterModule } from '@angular/router';
import { PagVehiculoRegistroComponent } from './PagVehiculoRegistro/PagVehiculoRegistro.component';
import { HomeComponent } from './home/home.component';
import { AEspacioPipe } from '../Utilitarios/Pipes/AEspacio.pipe';
import { CalificacionesComponent } from '../Utilitarios/componentes/Calificaciones/Calificaciones.component';
import { PagVehiculoEditarComponent } from './PagVehiculoEditar/PagVehiculoEditar.component';
import { ClientesComponent } from './Clientes/Clientes.component';

// se puede crear el root aquí y luego llamar en el app-routing.module
//app-routing.module usa el root y lo importa en el app.module
@NgModule({
    imports: [
        CommonModule, // CommonModule es un modulo de angular para trabajar con el DOM en tiempo real
        FormsModule,
        RouterModule,// para trabajar con rutas en paglista y pagvehiculo
        ReactiveFormsModule // para trabajar con formularios
        
    ],
    declarations: [
        PagListaComponent,
        PagVehiculoComponent,
        PagVehiculoRegistroComponent,
        HomeComponent,
        AEspacioPipe,
        PagVehiculoEditarComponent,
        ClientesComponent
              

        
    ],
    exports: [
        PagListaComponent,
        PagVehiculoComponent,
        PagVehiculoRegistroComponent,
        HomeComponent,
        ClientesComponent
    ]
})
export class PagModule {
    
}