import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { CitasService } from 'src/app/services/citas.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Quote } from 'src/app/interfaces/quote.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements ViewWillEnter {
  
  quote: Quote | null = null;
  allowDelete: boolean = false;

  constructor(
    private citasService: CitasService,
    private settingsService: SettingsService
  ) {}

  async ionViewWillEnter(): Promise<void> {
    await this.citasService.initializeDatabase();
    await this.loadRandomQuote();
    this.allowDelete = await this.settingsService.shouldAllowDeleteInHome();
  }

  async loadRandomQuote(): Promise<void> {
    this.quote = await this.citasService.getRandomQuote();
  }

  async handleDelete(id: number): Promise<void> {
    await this.citasService.deleteQuote(id);
    await this.loadRandomQuote();
  }
}