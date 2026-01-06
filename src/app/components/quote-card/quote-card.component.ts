/**
 * ============================================================
 * COMPONENTE QUOTE CARD (Tarjeta de Cita)
 * ============================================================
 * 
 * Este es un COMPONENTE REUTILIZABLE que muestra una cita
 * en formato de tarjeta (card).
 * 
 * Comunicación con el componente padre:
 * - @Input(): Recibe datos desde el padre (quote, showDelete)
 * - @Output(): Emite eventos hacia el padre (deleteClicked)
 * 
 * Este patrón permite que el componente sea genérico y
 * pueda usarse en diferentes páginas (Home, Gestión, etc.)
 * ============================================================
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quote } from '../../interfaces/quote.interface';

@Component({
  selector: 'app-quote-card',              // Selector HTML: <app-quote-card>
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
  standalone: false  // Necesario para usar con NgModules
})
export class QuoteCardComponent {
  
  /**
   * @Input() quote
   * ============================================================
   * Recibe el objeto Quote desde el componente padre.
   * El padre envía los datos así: <app-quote-card [quote]="miCita">
   * 
   * El signo "!" indica que el valor será asignado por el padre
   * (non-null assertion operator de TypeScript).
   * ============================================================
   */
  @Input() quote!: Quote;
  
  /**
   * @Input() showDelete
   * ============================================================
   * Controla si se muestra el botón de eliminar.
   * Por defecto es false (no se muestra).
   * 
   * El valor viene de la configuración guardada en Preferences.
   * Uso: <app-quote-card [showDelete]="allowDelete">
   * ============================================================
   */
  @Input() showDelete: boolean = false;
  
  /**
   * @Output() deleteClicked
   * ============================================================
   * EventEmitter que notifica al padre cuando el usuario
   * quiere eliminar la cita.
   * 
   * Emite el ID de la cita a eliminar.
   * El padre escucha: (deleteClicked)="handleDelete($event)"
   * 
   * Este patrón mantiene la lógica de eliminación en el padre,
   * ya que el componente hijo no debe acceder directamente
   * a los servicios.
   * ============================================================
   */
  @Output() deleteClicked = new EventEmitter<number>();

  /**
   * Método que se ejecuta al hacer clic en "Eliminar"
   * Emite el ID de la cita hacia el componente padre.
   */
  onDelete(): void {
    if (this.quote.id !== undefined) {
      // Emitir el ID al padre para que maneje la eliminación
      this.deleteClicked.emit(this.quote.id);
    }
  }
}