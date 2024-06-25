import { Injectable } from '@angular/core';
import { Vehiculo } from '../Utilitarios/modelos/Vehiculo';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//Inyeccion de dependencias tiene como definir la URL, cada vez que se ejecute la aplicacion se ejecuta el servicio
//El servicio es una clase que se encarga de realizar las peticiones
//Decorativo @Injectable
@Injectable({
  providedIn: 'root' // se puede usar en la raiz o en un modulo
})
export class VehiculoService {


  constructor(private http:HttpClient){ }
  baseUrl="http://www.epico.gob.ec/vehiculo/public/api/";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  // Todos vehiculos => GET vehiculos/
  // Insert=> POST vehiculo/
  // Update=> PUT vehiculo/:codigo
  // Delete=> DELETE vehiculo/:codigo
  // Consulta un solo vehiculo => GET vehiculo/:codigo
  

  getVehiculos(filtro?: string, rows?: number, page?: number, filtroCodigo?:string):Observable<Respuesta>{
    let body = new HttpParams();
    body = filtro ? body.set('filtro', filtro) : body;
    body = rows ? body.set('rows', rows) : body;
    body = page ? body.set('page', page) : body;
    body = filtroCodigo ? body.set('filtroCodigo', filtroCodigo) : body;
    console.log('Realizando solicitud GET para obtener todos los vehículos con los parámetros:', body.toString());
    return this.http.get<Respuesta>(this.baseUrl+'vehiculos/', {params: body});}
  
 /*  getVehiculos():Vehiculo[] {
    return this.listaVehiculos;
  } */

  /*
 getVehiculo(filtro:any): Observable<Array<Vehiculo>>{
  const escucha: Observable<Array<Vehiculo>> = new Observable(escuchando => {
    let lista= this.listaVehiculos.filter(ele => ele.marca.toLowerCase().includes(filtro.toLowerCase()))
      escuchando.next(lista);
    });
   return escucha;
 } */
 
 /* getVehiculo(codigo:string): Observable<Vehiculo|undefined>{
  const escucha: Observable<Vehiculo|undefined> = new Observable(escuchando => {
    //setTimeout(() => {
      let vehiculo = this.listaVehiculos.find(ele => ele.codigo == codigo);
      escuchando.next(vehiculo); //next, error, complete son metodos de observables. Next es el que se ejecuta cuando hay un cambio, 
      //error cuando hay un error y complete cuando se termina el observable
      
   // }, 1000);
  })
   return escucha;
 } */

getVehiculo(codigo:string){
  console.log('Realizando solicitud GET para obtener un vehículo específico con código:', codigo);
  return this.http.get<Respuesta>(this.baseUrl+'vehiculo/'+codigo);
} 

 insertVehiculo(vehiculo:Vehiculo){
 
  // Lo de abajo es otra forma de hacer ( parametros tipos formularios )
  let body=new HttpParams(); 
  body=vehiculo.codigo? body.set('codigo',vehiculo.codigo):body;
  body=vehiculo.marca? body.set('marca',vehiculo.marca):body;
  body=vehiculo.modelo? body.set("modelo",vehiculo.modelo):body;
  
  body=vehiculo.anio? body.set("anio",vehiculo.anio):body;
  body=vehiculo.kilometraje? body.set("kilometraje",vehiculo.kilometraje):body;
  body=vehiculo.precio? body.set("precio",vehiculo.precio):body;
  body=vehiculo.calificacion? body.set("calificacion",vehiculo.calificacion):body;
  body=vehiculo.foto? body.set("foto",vehiculo.foto):body;
  console.log('Realizando solicitud POST para insertar un nuevo vehículo:', vehiculo);
   return this.http.post<Respuesta>(this.baseUrl+'vehiculo/', vehiculo, this.httpOptions);
 } 

  //Editar vehiculo. Realiza una solicitud PUT para actualizar la información de un vehículo existente.
  actualizarVehiculo(vehiculo: any, codigo: string) {
    console.log('Realizando solicitud PUT para actualizar un vehículo con id:', codigo);
    return this.http.put<Respuesta>(this.baseUrl + 'vehiculo/' + vehiculo, codigo);
  }
 
  
  guardarNuevoVehiculo(vehiculo: any) {
    
    console.log('Realizando solicitud POST para guardar un nuevo vehículo:', vehiculo);
    return this.http.post<Respuesta>(this.baseUrl + 'vehiculo/', vehiculo, this.httpOptions);
  }
  
  //Para eliminar vehiculos (si funciona). Realiza una solicitud DELETE para eliminar un vehículo por su código.
  eliminarVehiculo(codigo: string) {

    return this.http.delete<Respuesta>(this.baseUrl + 'vehiculo/' + codigo);
  }



}
 

export interface Respuesta{
  codigo:string;
  mensaje:string;
  data: Array<Vehiculo>|Vehiculo|any;
  rows:number;
  pages:number;
  records:number;
  page:number;
}
