import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { PagListaComponent } from './paginas/PagLista/PagLista.component';
import { PagNotFoundComponent } from './paginas/PagNotFound/PagNotFound.component';
import { PagVehiculoComponent } from './paginas/PagVehiculo/PagVehiculo.component';
import { PagVehiculoRegistroComponent } from './paginas/PagVehiculoRegistro/PagVehiculoRegistro.component';
import { PagVehiculoEditarComponent } from './paginas/PagVehiculoEditar/PagVehiculoEditar.component';
import { ClientesComponent } from './paginas/Clientes/Clientes.component';
//app-routing.module usa el root y lo importa en el app.module, se lo puede realizar por modulos o en un solo archivo
const routes: Routes = [
  {
    path:"home",
    component: HomeComponent
  },
  {
    path:"vehiculos",
    component: PagListaComponent,
  pathMatch: 'full' // obligatorio que cumpla CON LA RUTA
  },
  {
    path:"vehiculo",
    component: PagVehiculoRegistroComponent,
  },
  {
    path:"clientes",
    component: ClientesComponent,
    
  },
  {
    path:"vehiculo/:codigo",//: es para que sea dinamico el path RECIBE PARAMETROS
    component: PagVehiculoComponent,
    
  },

  {
    path:"editar/:codigo",//: es para que sea dinamico el path RECIBE PARAMETROS
    component: PagVehiculoEditarComponent,
   
  },
  {
    path:"",
    component: HomeComponent,
    pathMatch: 'full' // obligatorio que cumpla todo el path

  },
  {
    path:"**", //** es para todos los paths que no existen*/
    component: PagNotFoundComponent,
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
