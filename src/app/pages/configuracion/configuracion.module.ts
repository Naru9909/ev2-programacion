/**
 * ============================================================
 * MÓDULO DE LA PÁGINA DE CONFIGURACIÓN (ConfiguracionPageModule)
 * ============================================================
 * 
 * Este módulo encapsula la página de configuración de la app.
 * Permite al usuario ajustar preferencias como la opción de
 * mostrar u ocultar el botón de eliminar en la página Home.
 * 
 * Las configuraciones se persisten usando @capacitor/preferences.
 * ============================================================
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

// Importamos FormsModule para el binding del toggle
import { FormsModule } from '@angular/forms';

import { ConfiguracionPage } from './configuracion.page';

// Definición de rutas para este módulo (lazy loading)
const routes: Routes = [
  {
    path: '',                // Ruta vacía porque la ruta padre ya define '/configuracion'
    component: ConfiguracionPage
  }
];

@NgModule({
  // Importamos los módulos necesarios
  imports: [
    CommonModule,                    // Directivas comunes (*ngIf, *ngFor)
    IonicModule,                     // Componentes de Ionic
    FormsModule,                     // Para binding bidireccional con ngModel
    RouterModule.forChild(routes)    // Rutas hijas para lazy loading
  ],
  // Declaramos la página que pertenece a este módulo
  declarations: [ConfiguracionPage]
})
export class ConfiguracionPageModule { }
