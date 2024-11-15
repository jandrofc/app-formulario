import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/auth.service';
import { FirestoreService } from 'src/app/firebase/firestore.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //varibales para almacenar el email y pasword

  email: string = '';
  password: string = '';

  error: string = ''; //variable para almacenar el mensaje de error

  constructor(private authService: AuthService, private firestoreService: FirestoreService, private router: Router) {
    this.error = '';
  }

  ngOnInit() {
  }

  async loginUser() {
    try {
      // Iniciar sesión
      const userCredential = await this.authService.login(this.email, this.password);

      // Obtener el UID del usuario autenticado
      const uid = userCredential.user?.uid;

      // Obtener el rol del usuario desde Firestore
      const userData = await this.firestoreService.getUser(uid);
      const rol = userData ? userData['rol'] : null;

      // Redirigir según el rol
      if (rol === 'profesional') {
        this.router.navigate(['/profesional']);
      } else if (rol === '') {
        this.router.navigate(['/alumno']);
      } else {
        console.error('Rol desconocido:', rol);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.error = this.authService.GenerarError(error);
    }
   }

}
