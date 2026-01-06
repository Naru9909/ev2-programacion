import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: false
})
export class ConfiguracionPage implements ViewWillEnter {
  
  allowDelete: boolean = false;

  constructor(private settingsService: SettingsService) { }

  async ionViewWillEnter(): Promise<void> {
    this.allowDelete = await this.settingsService.shouldAllowDeleteInHome();
  }

  async onToggleChange(event: CustomEvent): Promise<void> {
    this.allowDelete = event.detail.checked;
    await this.settingsService.setAllowDeleteInHome(this.allowDelete);
    console.log('Configuración guardada: permitir borrar =', this.allowDelete);
  }
}