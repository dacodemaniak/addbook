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
    const localData: string | null = localStorage.getItem('addresses');
    if (localData !== null) {
      const localDatas: any[] = JSON.parse(localData);
      this.addresses = localDatas
      .map((item: any) => {
        const addressModel = new AddressModel();
        Object.assign(addressModel, item);
        return addressModel;
      });
      this.itemNumber$.next(this.addresses.length);
      return of(this.addresses);
    }
    return of([]);
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
    const localData: string | null = localStorage.getItem('addresses');
    let nextId: number = 1;

    if (localData) {
      const localDatas: any[] = JSON.parse(localData);
      // Trier le tableau dans l'ordre inverse des ids
      const comparator: {(obj1: any, obj2: any): number} = (obj1: any, obj2: any) => obj2.id - obj1.id;
      const sortedDatas: any[] = localDatas.sort(comparator);
      nextId = sortedDatas[0].id + 1;
      t.id = nextId;
      localDatas.push(t);
      localStorage.setItem('addresses', JSON.stringify(localDatas));
      return of(t);
    }

    const newData: any[] = [{...t, id: nextId}];
    const {id, streetNumber, streetName, zipCode, city} = t;

    localStorage.setItem('addresses', JSON.stringify(newData));
    return of(t);
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
    localStorage.setItem(
      'addresses',
      JSON.stringify(datas)
    );
  }
}
