import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quote } from '../../interfaces/quote.interface';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
  standalone: false
})
export class QuoteCardComponent {
  
  @Input() quote!: Quote;
  @Input() showDelete: boolean = false;
  @Output() deleteClicked = new EventEmitter<number>();

  onDelete(): void {
    if (this.quote.id !== undefined) {
      this.deleteClicked.emit(this.quote.id);
    }
  }
}