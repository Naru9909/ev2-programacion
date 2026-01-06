/**
 * ============================================================
 * MÓDULO PRINCIPAL DE LA APLICACIÓN (AppModule)
 * ============================================================
 * 
 * Este es el módulo raíz que configura toda la aplicación Ionic/Angular.
 * 
 * Arquitectura de la aplicación:
 * - AppModule: Módulo principal (este archivo)
 * - SharedModule: Componentes compartidos (QuoteCard)
 * - Lazy loaded modules: Módulos de cada página (cargados bajo demanda)
 * 
 * El componente QuoteCard se declaró en SharedModule para poder
 * usarlo en múltiples páginas con lazy loading.
 * ============================================================
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  // Declaraciones: Componentes, directivas y pipes de este módulo
  declarations: [
    AppComponent  // Componente raíz de la aplicación
    // NOTA: QuoteCard se declaró en SharedModule para lazy loading
  ],
  
  // Imports: Otros módulos necesarios
  imports: [
    BrowserModule,           // Módulo base para apps web
    IonicModule.forRoot(),   // Configura Ionic en el módulo raíz
    AppRoutingModule         // Módulo de rutas con navegación
  ],
  
  // Providers: Servicios e inyección de dependencias
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy  // Estrategia de reutilización de rutas de Ionic
    }
  ],
  
  // Bootstrap: Componente que inicia la aplicación
  bootstrap: [AppComponent]
})
export class AppModule {}