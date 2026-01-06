/**
 * ============================================================
 * PÁGINA DE CONFIGURACIÓN
 * ============================================================
 * 
 * Esta página permite al usuario ajustar las preferencias
 * de la aplicación. Las configuraciones se guardan usando
 * @capacitor/preferences para persistir entre sesiones.
 * 
 * Configuraciones disponibles:
 * - Permitir borrar citas en la página de inicio (Home)
 * 
 * Capacitor Preferences:
 * - Almacena datos como pares clave-valor
 * - Los datos persisten incluso al cerrar la app
 * - Ideal para configuraciones simples (booleanos, strings)
 * ============================================================
 */

import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: false  // Necesario para usar con NgModules
})
export class ConfiguracionPage implements ViewWillEnter {
  
  /**
   * Estado del toggle "Permitir borrar en Home".
   * Este valor se sincroniza con Preferences.
   */
  allowDelete: boolean = false;

  /**
   * Inyección del servicio de configuración.
   * Este servicio maneja la lectura/escritura en Preferences.
   */
  constructor(private settingsService: SettingsService) { }

  /**
   * ============================================================
   * CICLO DE VIDA: ionViewWillEnter
   * ============================================================
   * 
   * Se ejecuta cada vez que el usuario navega a esta página.
   * Carga el estado actual de la configuración desde Preferences.
   * 
   * Usamos ionViewWillEnter para asegurar que el toggle refleje
   * el valor actual guardado, incluso si el usuario navegó a
   * otra página y volvió.
   * ============================================================
   */
  async ionViewWillEnter(): Promise<void> {
    // Cargar el valor guardado en Preferences
    this.allowDelete = await this.settingsService.shouldAllowDeleteInHome();
  }

  /**
   * ============================================================
   * MANEJAR CAMBIO EN EL TOGGLE
   * ============================================================
   * 
   * Este método se ejecuta cada vez que el usuario cambia
   * el estado del toggle (ion-toggle).
   * 
   * Flujo:
   * 1. Usuario cambia el toggle
   * 2. Se dispara el evento (ionChange)
   * 3. Este método extrae el nuevo valor
   * 4. Se guarda en Preferences para persistir el cambio
   * 
   * @param event - Evento del ion-toggle con el nuevo estado
   * ============================================================
   */
  async onToggleChange(event: CustomEvent): Promise<void> {
    // Extraer el nuevo valor del toggle desde el evento
    // event.detail.checked es true si está activado, false si no
    this.allowDelete = event.detail.checked;
    
    // Guardar el nuevo valor en Preferences (persistencia)
    await this.settingsService.setAllowDeleteInHome(this.allowDelete);
    
    console.log('Configuración guardada: permitir borrar =', this.allowDelete);
  }
}