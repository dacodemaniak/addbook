import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CrudInterface } from '../interfaces/crud-interface';
import { AddressModel } from '../models/address-model';

import { datas } from './../fake-backend/fake-datas';

@Injectable({
  providedIn: 'root'
})
export class AddressService implements CrudInterface<AddressModel> {
  private addresses: AddressModel[] = [];
  private itemNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    console.log(new Date() + ' service was loaded');
  }

  public get itemNumber(): BehaviorSubject<number> {
    return this.itemNumber$;
  }

  findAll(): Observable<AddressModel[]> {
    this.addresses = datas
      .map((item: any) => {
        const addressModel = new AddressModel();
        Object.assign(addressModel, item);
        return addressModel;
      });
    this.itemNumber$.next(this.addresses.length);
    return of(this.addresses);
  }

  findOne(id: number): Observable<AddressModel | null> {
    const address: AddressModel | undefined = this.addresses
      .find((obj: AddressModel) => obj.id === id);

    if (address !== undefined) {
      return of(address);
    }

    return of(null);
  }
  add(t: AddressModel): Observable<AddressModel> {
    throw new Error('Method not implemented.');
  }
  update(t: AddressModel): void {
    throw new Error('Method not implemented.');
  }

  remove(t: AddressModel): void {
    this.addresses.splice(
      this.addresses.indexOf(t),
      1
    );
    this.itemNumber$.next(this.addresses.length);
  }

  private _load(): void {
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
}
