export interface Vehiculo {
    codigo: string;
    marca: string;
    modelo: string;
    anio: number;
    kilometraje: string;
    precio: number;
    calificacion?: number; //? indica que es opcional
    foto: string|null;
}