/**
 * ============================================================
 * MÓDULO COMPARTIDO (SharedModule)
 * ============================================================
 * 
 * Este módulo centraliza los componentes, directivas y pipes
 * que se utilizan en múltiples páginas de la aplicación.
 * 
 * El patrón SharedModule evita declarar componentes múltiples
 * veces y facilita su reutilización en módulos con lazy loading.
 * ============================================================
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Importamos el componente reutilizable QuoteCard
import { QuoteCardComponent } from '../components/quote-card/quote-card.component';

@NgModule({
  // Declaramos los componentes que pertenecen a este módulo
  declarations: [
    QuoteCardComponent  // Componente para mostrar tarjetas de citas
  ],
  // Importamos módulos necesarios para el funcionamiento de los componentes
  imports: [
    CommonModule,  // Directivas comunes como *ngIf, *ngFor
    IonicModule    // Componentes de Ionic (ion-card, ion-button, etc.)
  ],
  // Exportamos los componentes para que otros módulos puedan usarlos
  exports: [
    QuoteCardComponent  // Disponible para páginas que importen SharedModule
  ]
})
export class SharedModule { }
