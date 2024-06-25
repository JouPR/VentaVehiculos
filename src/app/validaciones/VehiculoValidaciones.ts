import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validadorCodigo(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value;
    if (value && value.trim() !== '') {
      return null; // El campo no está vacío, no hay error
    }
    return { 'codigoValidate': true }; // El campo está vacío, devolver error
  }
}