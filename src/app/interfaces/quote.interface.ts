/**
 * ============================================================
 * INTERFAZ QUOTE (Cita)
 * ============================================================
 * 
 * Esta interfaz define la estructura de datos para una cita.
 * Utilizar interfaces proporciona tipado fuerte en TypeScript,
 * lo que ayuda a prevenir errores en tiempo de desarrollo.
 * 
 * Propiedades:
 * - id: Identificador único (opcional porque se genera automáticamente en SQLite)
 * - phrase: La frase o texto de la cita (obligatorio)
 * - author: El autor de la cita (obligatorio)
 * ============================================================
 */
export interface Quote {
  id?: number;      // ID único generado por SQLite (AUTOINCREMENT)
  phrase: string;   // Texto de la cita (mínimo 5 caracteres según validación)
  author: string;   // Nombre del autor (mínimo 2 caracteres según validación)
}