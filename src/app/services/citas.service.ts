/**
 * ============================================================
 * SERVICIO DE CITAS (CitasService)
 * ============================================================
 * 
 * Este servicio gestiona la persistencia de las citas utilizando
 * SQLite a través del plugin @capacitor-community/sqlite.
 * 
 * SQLite es una base de datos relacional ligera ideal para
 * aplicaciones móviles que necesitan almacenamiento local
 * persistente.
 * 
 * Funcionalidades CRUD implementadas:
 * - Create (Crear): addQuote()
 * - Read (Leer): getQuotes(), getRandomQuote()
 * - Update (Actualizar): No implementado en este taller
 * - Delete (Eliminar): deleteQuote()
 * ============================================================
 */

import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Quote } from '../interfaces/quote.interface';

@Injectable({
  providedIn: 'root'  // El servicio está disponible en toda la aplicación
})
export class CitasService {
  
  // Conexión principal a SQLite (singleton pattern)
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  
  // Conexión específica a nuestra base de datos
  private db!: SQLiteDBConnection;
  
  // Nombre de la base de datos
  private dbName = 'citas_db';
  
  // Flag para evitar inicializaciones múltiples
  private initialized = false;

  constructor() { }

  /**
   * ============================================================
   * INICIALIZACIÓN DE LA BASE DE DATOS
   * ============================================================
   * 
   * Este método debe llamarse antes de cualquier operación CRUD.
   * Se recomienda llamarlo en ionViewWillEnter() o ngOnInit()
   * de las páginas que usen este servicio.
   * 
   * Crea la conexión a la BD y la tabla 'quotes' si no existe.
   * ============================================================
   */
  async initializeDatabase(): Promise<void> {
    // Evitar reinicialización si ya está conectado
    if (this.initialized && this.db) {
      return;
    }
    
    try {
      // Crear conexión a la base de datos
      // Parámetros: nombre, encriptado, modo encriptación, versión, solo lectura
      this.db = await this.sqlite.createConnection(
        this.dbName,      // Nombre de la base de datos
        false,            // Sin encriptación
        'no-encryption',  // Modo de encriptación
        1,                // Versión de la base de datos
        false             // No es solo lectura
      );
      
      // Abrir la conexión a la base de datos
      await this.db.open();
      
      // SQL para crear la tabla si no existe
      // AUTOINCREMENT genera IDs únicos automáticamente
      const schema = `
        CREATE TABLE IF NOT EXISTS quotes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          phrase TEXT NOT NULL,
          author TEXT NOT NULL
        );
      `;
      
      // Ejecutar el schema para crear la tabla
      await this.db.execute(schema);
      
      // Marcar como inicializado
      this.initialized = true;
      
      console.log('Base de datos inicializada correctamente');
      
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      throw error;
    }
  }

  /**
   * ============================================================
   * OBTENER TODAS LAS CITAS (Read)
   * ============================================================
   * 
   * Consulta todas las citas almacenadas en la base de datos.
   * Retorna un array vacío si no hay citas.
   * ============================================================
   */
  async getQuotes(): Promise<Quote[]> {
    // Asegurar que la BD está inicializada
    if (!this.db) await this.initializeDatabase();
    
    // Ejecutar consulta SELECT
    const result = await this.db.query('SELECT * FROM quotes');
    
    // Retornar los valores o array vacío si no hay resultados
    return result.values || [];
  }

  /**
   * ============================================================
   * AGREGAR NUEVA CITA (Create)
   * ============================================================
   * 
   * Inserta una nueva cita en la base de datos.
   * El ID se genera automáticamente (AUTOINCREMENT).
   * 
   * @param quote - Objeto Quote con phrase y author
   * ============================================================
   */
  async addQuote(quote: Quote): Promise<void> {
    // Asegurar que la BD está inicializada
    if (!this.db) await this.initializeDatabase();
    
    // Query parametrizada para prevenir SQL injection
    const query = 'INSERT INTO quotes (phrase, author) VALUES (?, ?)';
    
    // Ejecutar la inserción con los valores
    await this.db.run(query, [quote.phrase, quote.author]);
    
    console.log('Cita agregada correctamente');
  }

  /**
   * ============================================================
   * ELIMINAR CITA (Delete)
   * ============================================================
   * 
   * Elimina una cita de la base de datos por su ID.
   * 
   * @param id - Identificador único de la cita a eliminar
   * ============================================================
   */
  async deleteQuote(id: number): Promise<void> {
    // Asegurar que la BD está inicializada
    if (!this.db) await this.initializeDatabase();
    
    // Query parametrizada para prevenir SQL injection
    await this.db.run('DELETE FROM quotes WHERE id = ?', [id]);
    
    console.log(`Cita con ID ${id} eliminada correctamente`);
  }

  /**
   * ============================================================
   * OBTENER CITA ALEATORIA
   * ============================================================
   * 
   * Obtiene una cita aleatoria de la base de datos.
   * Útil para mostrar una "cita del día" en la página Home.
   * 
   * @returns Quote aleatorio o null si no hay citas
   * ============================================================
   */
  async getRandomQuote(): Promise<Quote | null> {
    // Obtener todas las citas
    const quotes = await this.getQuotes();
    
    // Si no hay citas, retornar null
    if (quotes.length === 0) {
      return null;
    }
    
    // Generar índice aleatorio entre 0 y (longitud - 1)
    const randomIndex = Math.floor(Math.random() * quotes.length);
    
    // Retornar la cita en la posición aleatoria
    return quotes[randomIndex];
  }
}