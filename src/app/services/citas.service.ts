import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Quote } from '../interfaces/quote.interface';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private dbName = 'citas_db';
  private initialized = false;

  constructor() { }

  async initializeDatabase(): Promise<void> {
    if (this.initialized && this.db) {
      return;
    }
    
    try {
      this.db = await this.sqlite.createConnection(
        this.dbName,
        false,
        'no-encryption',
        1,
        false
      );
      
      await this.db.open();
      
      const schema = `
        CREATE TABLE IF NOT EXISTS quotes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          phrase TEXT NOT NULL,
          author TEXT NOT NULL
        );
      `;
      
      await this.db.execute(schema);
      
      this.initialized = true;
      
      console.log('Base de datos inicializada correctamente');
      
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      throw error;
    }
  }

  async getQuotes(): Promise<Quote[]> {
    if (!this.db) await this.initializeDatabase();
    
    const result = await this.db.query('SELECT * FROM quotes');
    
    return result.values || [];
  }

  async addQuote(quote: Quote): Promise<void> {
    if (!this.db) await this.initializeDatabase();
    
    const query = 'INSERT INTO quotes (phrase, author) VALUES (?, ?)';
    
    await this.db.run(query, [quote.phrase, quote.author]);
    
    console.log('Cita agregada correctamente');
  }

  async deleteQuote(id: number): Promise<void> {
    if (!this.db) await this.initializeDatabase();
    
    await this.db.run('DELETE FROM quotes WHERE id = ?', [id]);
    
    console.log(`Cita con ID ${id} eliminada correctamente`);
  }

  async getRandomQuote(): Promise<Quote | null> {
    const quotes = await this.getQuotes();
    
    if (quotes.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    
    return quotes[randomIndex];
  }
}