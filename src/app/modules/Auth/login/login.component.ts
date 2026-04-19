import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  onAccept(event: Event): void {
    event.preventDefault();
    alert('Se procederá a validar las credenciales de acceso');
  }
}
