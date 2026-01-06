import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<ion-app><ion-router-outlet></ion-router-outlet></ion-app>`,
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  constructor() {}
}
