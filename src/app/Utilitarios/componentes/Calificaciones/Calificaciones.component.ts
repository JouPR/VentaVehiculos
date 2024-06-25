import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, input } from '@angular/core';

@Component({
  selector: 'app-Calificaciones', //el selector es el nombre de la etiqueta <app-calificaciones>
  templateUrl: './Calificaciones.component.html', //la url del archivo html
  styleUrls: ['./Calificaciones.component.css'] //la url del archivo css
})
export class CalificacionesComponent implements OnInit, OnChanges {

  @Input() calificacion: any = 0; //Input se usa para entrada de datos
  @Output() actionClick = new EventEmitter<any>();
  lista:Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.generar();
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['calificacion'].currentValue){ //Cuando haya cambios en el input generar la calificacion
      this.generar();
    }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
  }

  generar(){
    this.lista = [];
    for (let index = 0; index < this.calificacion; index++) {
      this.lista.push(1);
    }
  }

  
  select(){
    this.actionClick.emit(this.calificacion);
  }

}
