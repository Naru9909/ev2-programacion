/**
 * ============================================================
 * PUNTO DE ENTRADA DE LA APLICACIÓN (main.ts)
 * ============================================================
 * 
 * Este archivo es el punto de entrada principal de Angular.
 * Inicializa la plataforma del navegador y arranca el módulo
 * principal de la aplicación (AppModule).
 * ============================================================
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Habilitar modo producción si el environment lo indica
if (environment.production) {
  enableProdMode();
}

// Arrancar la aplicación con el módulo principal
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
