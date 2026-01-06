/**
 * ============================================================
 * SERVICIO DE CONFIGURACIÓN (SettingsService)
 * ============================================================
 * 
 * Este servicio gestiona la persistencia de las preferencias
 * del usuario utilizando @capacitor/preferences.
 * 
 * Capacitor Preferences (antes Storage) almacena pares
 * clave-valor de forma persistente. Es ideal para guardar
 * configuraciones simples como booleanos o strings.
 * 
 * A diferencia de SQLite, Preferences es más simple pero
 * menos potente (no soporta consultas complejas).
 * ============================================================
 */

import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'  // El servicio está disponible en toda la aplicación
})
export class SettingsService {
  
  /**
   * Clave para almacenar la preferencia de permitir borrar en Home.
   * Usar constantes evita errores de tipeo en las claves.
   */
  private readonly KEY_DELETE_HOME = 'allow_delete_home';

  constructor() { }

  /**
   * ============================================================
   * OBTENER CONFIGURACIÓN: ¿Permitir borrar en Home?
   * ============================================================
   * 
   * Lee el valor almacenado en Preferences para determinar
   * si se debe mostrar el botón de eliminar en la página Home.
   * 
   * @returns true si está permitido, false en caso contrario
   * ============================================================
   */
  async shouldAllowDeleteInHome(): Promise<boolean> {
    // Obtener el valor almacenado (siempre es string o null)
    const { value } = await Preferences.get({ key: this.KEY_DELETE_HOME });
    
    // Convertir string a boolean
    // Si value es 'true' retorna true, cualquier otro valor retorna false
    return value === 'true';
  }

  /**
   * ============================================================
   * GUARDAR CONFIGURACIÓN: ¿Permitir borrar en Home?
   * ============================================================
   * 
   * Guarda el valor de la preferencia en el almacenamiento
   * persistente. El valor se mantiene incluso al cerrar la app.
   * 
   * @param allow - true para permitir, false para no permitir
   * ============================================================
   */
  async setAllowDeleteInHome(allow: boolean): Promise<void> {
    await Preferences.set({
      key: this.KEY_DELETE_HOME,
      value: String(allow)  // Preferences solo guarda strings
    });
    
    console.log(`Preferencia 'permitir borrar en Home' guardada: ${allow}`);
  }
}