import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { CitasService } from 'src/app/services/citas.service';
import { Quote } from 'src/app/interfaces/quote.interface';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.page.html',
  styleUrls: ['./gestion-citas.page.scss'],
  standalone: false
})
export class GestionCitasPage implements ViewWillEnter {
  
  formulario: FormGroup;
  listaCitas: Quote[] = [];

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService
  ) {
    this.formulario = this.fb.group({
      phrase: ['', [
        Validators.required, 
        Validators.minLength(5)
      ]],
      author: ['', [
        Validators.required, 
        Validators.minLength(2)
      ]]
    });
  }

  async ionViewWillEnter(): Promise<void> {
    await this.citasService.initializeDatabase();
    await this.cargarCitas();
  }

  async cargarCitas(): Promise<void> {
    this.listaCitas = await this.citasService.getQuotes();
  }

  async guardarCita(): Promise<void> {
    if (this.formulario.valid) {
      await this.citasService.addQuote(this.formulario.value);
      this.formulario.reset();
      await this.cargarCitas();
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  async borrarCita(id: number): Promise<void> {
    await this.citasService.deleteQuote(id);
    await this.cargarCitas();
  }

  get phrase() {
    return this.formulario.get('phrase');
  }

  get author() {
    return this.formulario.get('author');
  }
}