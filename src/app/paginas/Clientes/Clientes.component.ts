import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../servicios/Cliente.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-Clientes',
  templateUrl: './Clientes.component.html',
  styleUrls: ['./Clientes.component.css']
})
export class ClientesComponent implements OnInit {
  mostrarT: boolean = false; 
  id: string = '';
  nombre: string = '';
  apellido: string = '';
  password: string = '';
  email: string = '';
  telefono: string = '';

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  toggleTarjeta(event: any) {
    this.mostrarT = event.target.checked;
  }

  redirectToHome() {
    this.router.navigateByUrl('/home');
  }

  registrarCliente() {
    const user = {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      password: this.password,
      email: this.email,
      telefono: this.telefono
    };

    console.log('Datos del usuario a enviar:', user);

    this.userService.addUser(user).subscribe(
      response => {

        console.log('Cliente registrado exitosamente:', response);

        this.router.navigateByUrl('/home');
        Swal.fire({
          title: 'Registro completo',
          text: 'Cliente registrado con exito',
          icon: 'success'})
      },
      error => {

        console.error('Error al registrar cliente:', error);

      }
    );
  }


}