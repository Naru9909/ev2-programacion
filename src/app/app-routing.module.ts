/**
 * ============================================================
 * MÓDULO DE RUTAS (AppRoutingModule)
 * ============================================================
 * 
 * Este módulo define la navegación de la aplicación usando
 * el Router de Angular.
 * 
 * LAZY LOADING:
 * Las páginas se cargan bajo demanda (cuando el usuario navega)
 * en lugar de cargarse todas al inicio. Esto mejora el
 * rendimiento inicial de la aplicación.
 * 
 * loadChildren: Carga el módulo de la página de forma asíncrona
 * 
 * Estructura de navegación:
 * - /home: Página principal con cita aleatoria
 * - /gestion-citas: Formulario y lista de citas
 * - /configuracion: Ajustes de la aplicación
 * ============================================================
 */

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Definición de las rutas de la aplicación
const routes: Routes = [
  {
    // Ruta raíz: redirige a Home
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'  // Solo coincide si la ruta está completamente vacía
  },
  {
    // PÁGINA HOME (Inicio)
    // URL: /home
    // Muestra una cita aleatoria del día
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    // PÁGINA GESTIÓN DE CITAS
    // URL: /gestion-citas
    // Formulario para agregar y lista para ver/eliminar citas
    path: 'gestion-citas',
    loadChildren: () => import('./pages/gestion-citas/gestion-citas.module').then(m => m.GestionCitasPageModule)
  },
  {
    // PÁGINA CONFIGURACIÓN
    // URL: /configuracion
    // Ajustes de la aplicación (toggle para permitir borrar)
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      // PreloadAllModules: Precarga todos los módulos lazy en segundo plano
      // Esto mejora la navegación posterior (ya están cargados)
      preloadingStrategy: PreloadAllModules 
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }