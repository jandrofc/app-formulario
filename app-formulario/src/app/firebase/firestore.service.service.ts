import { inject,Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { Firestore, doc, setDoc, getDoc} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  //metodo para obtener la coleccion de usuarios

  createUser(uid:string,userData: User){
    //referencia a la coleccion de usuarios
    const userDocRef = doc(this.firestore,`users/${uid}`);

    //almanecenamos los datos del usuario en el documento
    return setDoc(userDocRef,userData);
  }
  //metodo para obtener un usuario por su id
  async getUser(uid: string){
    const userDocRef = doc(this.firestore,`users/${uid}`);
    const userDoc = await getDoc(userDocRef);
  }

}
