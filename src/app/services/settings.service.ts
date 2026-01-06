import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  private readonly KEY_DELETE_HOME = 'allow_delete_home';

  constructor() { }

  async shouldAllowDeleteInHome(): Promise<boolean> {
    const { value } = await Preferences.get({ key: this.KEY_DELETE_HOME });
    return value === 'true';
  }

  async setAllowDeleteInHome(allow: boolean): Promise<void> {
    await Preferences.set({
      key: this.KEY_DELETE_HOME,
      value: String(allow)
    });
    
    console.log(`Preferencia 'permitir borrar en Home' guardada: ${allow}`);
  }
}