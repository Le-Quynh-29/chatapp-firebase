import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'La Bàn Phong Thủy';

  constructor() {
    firebase.initializeApp(environment.firebaseConfig);
  }
}
