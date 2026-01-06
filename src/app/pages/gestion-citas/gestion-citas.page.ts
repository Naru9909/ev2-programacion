/**
 * ============================================================
 * PÁGINA GESTIÓN DE CITAS
 * ============================================================
 * 
 * Esta página permite:
 * - Agregar nuevas citas mediante un formulario con validaciones
 * - Listar todas las citas guardadas
 * - Eliminar citas existentes
 * 
 * FORMULARIOS REACTIVOS (ReactiveFormsModule):
 * - FormBuilder: Crea el formulario y define validadores
 * - FormGroup: Agrupa controles del formulario
 * - Validators: Reglas de validación (required, minLength, etc.)
 * 
 * Validaciones implementadas:
 * - Frase: Obligatorio, mínimo 5 caracteres
 * - Autor: Obligatorio, mínimo 2 caracteres
 * ============================================================
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { CitasService } from 'src/app/services/citas.service';
import { Quote } from 'src/app/interfaces/quote.interface';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.page.html',
  styleUrls: ['./gestion-citas.page.scss'],
  standalone: false  // Necesario para usar con NgModules
})
export class GestionCitasPage implements ViewWillEnter {
  
  /**
   * FormGroup que contiene los controles del formulario.
   * Cada control tiene sus propias validaciones.
   */
  formulario: FormGroup;
  
  /**
   * Array que almacena todas las citas cargadas desde SQLite.
   * Se actualiza cada vez que se agrega o elimina una cita.
   */
  listaCitas: Quote[] = [];

  /**
   * ============================================================
   * CONSTRUCTOR
   * ============================================================
   * 
   * Inyección de dependencias:
   * - FormBuilder: Facilita la creación de formularios reactivos
   * - CitasService: Servicio para operaciones CRUD con SQLite
   * 
   * Aquí se define la estructura del formulario y sus validaciones.
   * ============================================================
   */
  constructor(
    private fb: FormBuilder,
    private citasService: CitasService
  ) {
    // Creación del formulario reactivo con validaciones
    this.formulario = this.fb.group({
      
      // Campo 'phrase' (Frase de la cita)
      // Validaciones:
      // - required: Campo obligatorio
      // - minLength(5): Mínimo 5 caracteres
      phrase: ['', [
        Validators.required, 
        Validators.minLength(5)
      ]],
      
      // Campo 'author' (Autor de la cita)
      // Validaciones:
      // - required: Campo obligatorio
      // - minLength(2): Mínimo 2 caracteres
      author: ['', [
        Validators.required, 
        Validators.minLength(2)
      ]]
    });
  }

  /**
   * ============================================================
   * CICLO DE VIDA: ionViewWillEnter
   * ============================================================
   * 
   * Se ejecuta cada vez que el usuario navega a esta página.
   * Inicializa la base de datos y carga las citas actualizadas.
   * 
   * Usamos ionViewWillEnter en lugar de ngOnInit porque:
   * - ngOnInit solo se ejecuta una vez al crear el componente
   * - ionViewWillEnter se ejecuta cada vez que la página es visible
   * ============================================================
   */
  async ionViewWillEnter(): Promise<void> {
    // Asegurar que la BD esté inicializada
    await this.citasService.initializeDatabase();
    
    // Cargar lista actualizada de citas
    await this.cargarCitas();
  }

  /**
   * ============================================================
   * CARGAR CITAS DESDE LA BASE DE DATOS
   * ============================================================
   * 
   * Obtiene todas las citas almacenadas en SQLite
   * y las asigna al array listaCitas para mostrarlas.
   * ============================================================
   */
  async cargarCitas(): Promise<void> {
    this.listaCitas = await this.citasService.getQuotes();
  }

  /**
   * ============================================================
   * GUARDAR NUEVA CITA
   * ============================================================
   * 
   * Procesa el envío del formulario:
   * 1. Verifica que el formulario sea válido
   * 2. Si es válido: guarda la cita y resetea el formulario
   * 3. Si no es válido: marca todos los campos como "touched"
   *    para mostrar los mensajes de error
   * ============================================================
   */
  async guardarCita(): Promise<void> {
    // Verificar si el formulario cumple todas las validaciones
    if (this.formulario.valid) {
      // Guardar la cita en SQLite
      // this.formulario.value contiene {phrase: '...', author: '...'}
      await this.citasService.addQuote(this.formulario.value);
      
      // Limpiar el formulario para ingresar otra cita
      this.formulario.reset();
      
      // Recargar la lista para mostrar la nueva cita
      await this.cargarCitas();
      
    } else {
      // Si el formulario no es válido, marcar todos los campos como "touched"
      // Esto activa la visualización de mensajes de error en el template
      this.formulario.markAllAsTouched();
    }
  }

  /**
   * ============================================================
   * ELIMINAR CITA
   * ============================================================
   * 
   * Elimina una cita de la base de datos por su ID
   * y recarga la lista para reflejar el cambio.
   * 
   * @param id - Identificador único de la cita a eliminar
   * ============================================================
   */
  async borrarCita(id: number): Promise<void> {
    // Eliminar de SQLite
    await this.citasService.deleteQuote(id);
    
    // Recargar lista actualizada
    await this.cargarCitas();
  }

  /**
   * ============================================================
   * GETTERS PARA ACCESO RÁPIDO A CONTROLES
   * ============================================================
   * 
   * Estos getters facilitan el acceso a los controles del formulario
   * desde el template, haciendo el código más limpio.
   * 
   * Uso en template: 
   * *ngIf="phrase.errors?.['required'] && phrase.touched"
   * ============================================================
   */
  get phrase() {
    return this.formulario.get('phrase');
  }

  get author() {
    return this.formulario.get('author');
  }
}