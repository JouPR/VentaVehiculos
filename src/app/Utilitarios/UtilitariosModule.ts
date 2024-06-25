import { NgModule } from "@angular/core";
import { AEspacioPipe } from "./Pipes/AEspacio.pipe";
import { CalificacionesComponent } from "./componentes/Calificaciones/Calificaciones.component";
import { CommonModule } from "@angular/common";

@NgModule({
declarations:[ //Se declaran todos los componentes, pipes, directivas que se van a utilizar
    
    CalificacionesComponent
],
imports:[ //Se importa todo lo que se necesita (modulos)para que pueda funcionar y crear los componentes 
    CommonModule
],

exports:[ //Se exponen todos los componentes,pipes,services que se van a utilizar en otro modulo
    
    CalificacionesComponent
]
})
export class UtilitariosModule{
//crear un Pipe


}