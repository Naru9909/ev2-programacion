/**
 * ============================================================
 * COMPONENTE RAÍZ DE LA APLICACIÓN (AppComponent)
 * ============================================================
 * 
 * Este es el componente principal que contiene el router-outlet
 * de Ionic donde se renderizan todas las páginas.
 * ============================================================
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<ion-app><ion-router-outlet></ion-router-outlet></ion-app>`,
  styleUrls: ['app.component.scss'],
  standalone: false  // Necesario para usar con NgModules
})
export class AppComponent {
  constructor() {}
}
