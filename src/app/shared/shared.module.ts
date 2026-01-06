import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { QuoteCardComponent } from '../components/quote-card/quote-card.component';

@NgModule({
  declarations: [
    QuoteCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    QuoteCardComponent
  ]
})
export class SharedModule { }
