/**
 * ============================================================
 * MÓDULO DE LA PÁGINA HOME (HomePageModule)
 * ============================================================
 * 
 * Este módulo encapsula la página de inicio de la aplicación.
 * Se carga mediante lazy loading para optimizar el rendimiento
 * inicial de la aplicación.
 * 
 * La página Home muestra una cita aleatoria y permite su
 * eliminación si la configuración lo permite.
 * ============================================================
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

// Importamos el módulo compartido para usar QuoteCardComponent
import { SharedModule } from '../../shared/shared.module';
import { HomePage } from './home.page';

// Definición de rutas para este módulo (lazy loading)
const routes: Routes = [
  {
    path: '',          // Ruta vacía porque la ruta padre ya define '/home'
    component: HomePage
  }
];

@NgModule({
  // Importamos los módulos necesarios
  imports: [
    CommonModule,                    // Directivas comunes (*ngIf, *ngFor)
    IonicModule,                     // Componentes de Ionic
    RouterModule.forChild(routes),   // Rutas hijas para lazy loading
    SharedModule                     // Módulo compartido con QuoteCardComponent
  ],
  // Declaramos la página que pertenece a este módulo
  declarations: [HomePage]
})
export class HomePageModule { }
