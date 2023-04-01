import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, StorageReference, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private configureFirebase() {
    const firebaseConfig = {
      authDomain: "plasentir-backend.firebaseapp.com",
      projectId: "plasentir-backend",
      storageBucket: "plasentir-backend.appspot.com",
    };
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    return { storage }
  }

  getStoredImage(image: string): Promise<string> {
    const { storage } = this.configureFirebase();
    const storageRef = ref(storage, image);

    const imageUrl = getDownloadURL(storageRef)
      .then((url) => {
        return url;
      }).catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            console.log(error.code);
            return '';
          case 'storage/unauthorized':
            console.log(error.code);
            return '';
          case 'storage/canceled':
            console.log(error.code);
            return '';
          case 'storage/unknown':
            console.log(error.code);
            return '';
          default:
            return '';
        }
      });
    return imageUrl;
  }
}
