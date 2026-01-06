/**
 * ============================================================
 * MÓDULO DE LA PÁGINA GESTIÓN DE CITAS (GestionCitasPageModule)
 * ============================================================
 * 
 * Este módulo encapsula la página de gestión de citas.
 * Permite agregar nuevas citas mediante un formulario con
 * validaciones y listar/eliminar las citas existentes.
 * 
 * Se utiliza ReactiveFormsModule para manejar formularios
 * reactivos con validaciones avanzadas.
 * ============================================================
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

// Importamos ReactiveFormsModule para formularios reactivos con validaciones
import { ReactiveFormsModule } from '@angular/forms';

// Importamos el módulo compartido para usar QuoteCardComponent
import { SharedModule } from '../../shared/shared.module';
import { GestionCitasPage } from './gestion-citas.page';

// Definición de rutas para este módulo (lazy loading)
const routes: Routes = [
  {
    path: '',               // Ruta vacía porque la ruta padre ya define '/gestion-citas'
    component: GestionCitasPage
  }
];

@NgModule({
  // Importamos los módulos necesarios
  imports: [
    CommonModule,                    // Directivas comunes (*ngIf, *ngFor)
    IonicModule,                     // Componentes de Ionic
    ReactiveFormsModule,             // Para formularios reactivos con validaciones
    RouterModule.forChild(routes),   // Rutas hijas para lazy loading
    SharedModule                     // Módulo compartido con QuoteCardComponent
  ],
  // Declaramos la página que pertenece a este módulo
  declarations: [GestionCitasPage]
})
export class GestionCitasPageModule { }
