import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, User } from '@angular/fire/auth';
import { FirestoreService } from './firestore.service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private authStateSubject = new BehaviorSubject<any>(null); // variable observable para saber si el usuario esta logeado o no
    authState$ = this.authStateSubject.asObservable(); // variable observable para saber si el usuario esta logeado o no

  constructor(private afAuth: Auth, private firestoreService: FirestoreService) {
    //escuchar cambios en el estado de autenticacion

    onAuthStateChanged(this.afAuth, async (user) => {
      if (user){
        //si el usuario esta autenticado, obtener datos adicionales desde firebase
        const userData = await this.firestoreService.getUser(user.uid);
        const fullUserData = {
          uid: user.uid,
          email: user.email,
          ...userData // combinar los datos de autentificacion con los datos adicionales
      };
      this.authStateSubject.next(fullUserData); //emitir todos los datos
    } else {
      //si no hay usuario autenticado, emitir null
      this.authStateSubject.next(null);
    }
    });

  }

  //metodo para registrar un nuevo usuario con email y password
  register(email: string, password: string){
    return createUserWithEmailAndPassword(this.afAuth,email,password);
  }
  //metodo para iniciar sesion con email y password
  login(email: string, password: string){
    return signInWithEmailAndPassword(this.afAuth,email,password);
  }
  //metodo para cerrar sesion
  logout(){
    return signOut(this.afAuth).then(() => {
      this.authStateSubject.next(null); // emitir null cuando el usuario cierra sesion
    });
  }
  //metodo para obtener el estado de autenticacion(no observar si no el valor actual)
  getAuthState(){
    return this.authStateSubject.value;
  }
  GenerarError(tipo: any){
    let error: string = '';
    // Verificar el código del error para personalizar el mensaje
    switch (tipo.code) {
      case 'auth/email-already-in-use':
        error = 'El correo electrónico ya está en uso';
        break;
      case 'auth/invalid-email':
        error = 'El correo electrónico no es válido';
        break;
      case 'auth/user-not-found':
        error = 'Usuario no encontrado';
        break;
      case 'auth/wrong-password':
        error = 'Contraseña incorrecta';
        break;
      case 'auth/network-request-failed':
        error = 'Error de red. Verifique su conexión a internet';
        break;
      case 'auth/invalid-credential':
        error = 'Credenciales inválidas';
        break;
      default:
        error = 'Error: ' + tipo.message;
    }

    return error;
  }
}
