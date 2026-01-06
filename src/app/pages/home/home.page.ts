/**
 * ============================================================
 * PÁGINA HOME (Inicio)
 * ============================================================
 * 
 * Esta es la página principal de la aplicación.
 * Muestra una cita aleatoria usando el componente QuoteCard.
 * 
 * Funcionalidades:
 * - Mostrar cita aleatoria del día
 * - Eliminar la cita mostrada (si la configuración lo permite)
 * - Navegar a Gestión de Citas y Configuración
 * 
 * Ciclo de vida utilizado:
 * - ionViewWillEnter: Se ejecuta cada vez que se entra a la página
 *   (a diferencia de ngOnInit que solo se ejecuta una vez)
 * ============================================================
 */

import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { CitasService } from 'src/app/services/citas.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Quote } from 'src/app/interfaces/quote.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false  // Necesario para usar con NgModules
})
export class HomePage implements ViewWillEnter {
  
  /**
   * Almacena la cita aleatoria a mostrar.
   * Puede ser null si no hay citas en la base de datos.
   */
  quote: Quote | null = null;
  
  /**
   * Controla si se muestra el botón de eliminar.
   * Se carga desde SettingsService (Preferences).
   */
  allowDelete: boolean = false;

  /**
   * Inyección de dependencias:
   * - CitasService: Para obtener y eliminar citas (SQLite)
   * - SettingsService: Para leer configuraciones (Preferences)
   */
  constructor(
    private citasService: CitasService,
    private settingsService: SettingsService
  ) {}

  /**
   * ============================================================
   * CICLO DE VIDA: ionViewWillEnter
   * ============================================================
   * 
   * Se ejecuta CADA VEZ que el usuario navega a esta página.
   * Esto es importante porque:
   * - ngOnInit solo se ejecuta una vez (al crear el componente)
   * - ionViewWillEnter se ejecuta cada vez que la página se vuelve visible
   * 
   * Aquí inicializamos la BD, cargamos una cita aleatoria y
   * leemos la configuración de preferencias.
   * ============================================================
   */
  async ionViewWillEnter(): Promise<void> {
    // Asegurar que la base de datos esté inicializada
    await this.citasService.initializeDatabase();
    
    // Cargar una cita aleatoria
    await this.loadRandomQuote();
    
    // Leer configuración: ¿permitir borrar en Home?
    this.allowDelete = await this.settingsService.shouldAllowDeleteInHome();
  }

  /**
   * ============================================================
   * CARGAR CITA ALEATORIA
   * ============================================================
   * 
   * Obtiene una cita aleatoria del servicio y la asigna
   * a la variable 'quote' para mostrarla en el template.
   * ============================================================
   */
  async loadRandomQuote(): Promise<void> {
    this.quote = await this.citasService.getRandomQuote();
  }

  /**
   * ============================================================
   * MANEJAR ELIMINACIÓN DE CITA
   * ============================================================
   * 
   * Este método es llamado cuando el componente QuoteCard
   * emite el evento 'deleteClicked'.
   * 
   * Flujo:
   * 1. QuoteCard emite ID -> 2. Este método recibe ID ->
   * 3. Elimina la cita -> 4. Carga nueva cita aleatoria
   * 
   * @param id - ID de la cita a eliminar (emitido por QuoteCard)
   * ============================================================
   */
  async handleDelete(id: number): Promise<void> {
    // Eliminar la cita de la base de datos
    await this.citasService.deleteQuote(id);
    
    // Cargar una nueva cita aleatoria para reemplazar la eliminada
    await this.loadRandomQuote();
  }
}