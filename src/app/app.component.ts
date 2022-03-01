import { Component, OnInit } from '@angular/core';
import { AddressModel } from './core/models/address-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'addbook';

  public addresses!: AddressModel[];

  public removeState: boolean = true;

  public showPassword: boolean = false;

  public constructor() {

    this.addresses = [];
  }

  public ngOnInit(): void {
      const aelion: AddressModel = new AddressModel();
      aelion.streetNumber = '95';
      aelion.streetName = 'chemin de Gabardie';
      aelion.zipCode = '31000';
      aelion.city = 'Toulouse';

      this.addresses.push(aelion);

      const mairieToulouse: AddressModel = new AddressModel();
      mairieToulouse.streetNumber = '1';
      mairieToulouse.streetName = 'Place du Capitole';
      mairieToulouse.zipCode = '31000';
      mairieToulouse.city = 'Toulouse';

      this.addresses.push(mairieToulouse);

      const bordeaux: AddressModel = new AddressModel();
      bordeaux.streetNumber = '1';
      bordeaux.streetName = 'Place de la Victoire';
      bordeaux.zipCode = '33000';
      bordeaux.city = 'Bordeaux';

      this.addresses.push(bordeaux);
  }

  public remove(address: AddressModel): void {
    const index: number = this.addresses.indexOf(address);
    this.addresses.splice(index, 1);
  }

  public toggleRemoveState(): void {
    this.removeState = !this.removeState;
  }
}
