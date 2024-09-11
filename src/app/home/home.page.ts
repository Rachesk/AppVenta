import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    
    trigger('fade', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', [
        animate('500ms ease-in')
      ]),
      transition('visible => hidden', [
        animate('500ms ease-out')
      ]),
    ]),
    
    trigger('moveTitle', [
      transition('* => *', [
        animate('3s ease-in-out', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),  
          style({ transform: 'translateX(40px)', offset: 0.45 }), 
          style({ transform: 'translateX(-10px)', offset: 0.5 }), 
          style({ transform: 'translateX(0)', offset: 1 }) 
        ]))
      ])
    ])
  ]
})
export class HomePage {
  name: string = '';
  lastname: string = '';
  age: number | null = null;
  selectedEvent: string = '';
  ticketQuantity: number = 1;
  total: number = 0;
  showTotal: boolean = false; 

  
  events = [
    { name: 'Cine', price: 7000 },
    { name: 'Deportes', price: 10000 },
    { name: 'Conciertos', price: 150000 },
  ];

  constructor(private alertController: AlertController) {}

 
  async calculateTotal() {
    if (!this.name || !this.lastname || this.age === null) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos: Nombre, Apellido y Edad.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (!this.selectedEvent) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, seleccione un evento.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const event = this.events.find(e => e.name === this.selectedEvent);

    if (event) {
      let totalPrice = event.price * this.ticketQuantity;
    
      // Descuenntoss
      if (this.age < 18) {
        totalPrice *= 0.9; 
      } else if (this.age > 60) {
        totalPrice *= 0.8; 
      }

      this.total = totalPrice;
      this.showTotal = true; 
    }
  }

 
  async clean() {
    this.name = '';
    this.lastname = '';
    this.age = null;
    this.selectedEvent = '';
    this.ticketQuantity = 1;
    this.total = 0;
    this.showTotal = false; 

    const alert = await this.alertController.create({
      header: 'Formulario Limpiado',
      message: 'Todos los campos han sido limpiados.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
