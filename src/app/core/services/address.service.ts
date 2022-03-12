import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { CrudInterface } from '../interfaces/crud-interface';
import { IAddress } from '../interfaces/i-address';
import { AddressModel } from '../models/address-model';

import { environment } from './../../../environments/environment';

import { datas } from './../fake-backend/fake-datas';

@Injectable({
  providedIn: 'root'
})
export class AddressService implements CrudInterface<AddressModel> {
  private addresses: AddressModel[] = [];
  private itemNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private httpClient: HttpClient
  ) {
    console.log(new Date() + 'service was loaded');
  }

  public get itemNumber(): BehaviorSubject<number> {
    return this.itemNumber$;
  }

  findAll(): Observable<AddressModel[]> {
    return this.httpClient.get<IAddress[]>(
      `${environment.api}addresses`
    )
    .pipe(
      take(1),
      map((datas: IAddress[]) => {
        return datas.map((data: IAddress) => {
          const address: AddressModel = new AddressModel();
          Object.assign(address, data);
          return address;
        });
      })
    );
  }

  private static errorHandler = (error: any) => {
    console.log(`Unable to find the id from addresses`);
    return throwError(() => error);
  };

  findOne(id: number): Observable<AddressModel | null> {
    return this.httpClient.get<IAddress>(
      `${environment.api}addresses/${id}`
    )
    .pipe(
      take(1),
      map((address: IAddress) => Object.assign(new AddressModel(), address)),
      catchError(AddressService.errorHandler)
    );
  }

  add(t: AddressModel): Observable<AddressModel> {
    return this.findLatest()
      .pipe(
        take(1),
        map((nextId: number) => {
          const address: AddressModel = {...t, id: nextId};
          this.httpClient.post<AddressModel>(
            `${environment.api}addresses`,
            address
          ).subscribe();
          return address;
        })
    );
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


  private findLatest(): Observable<number> {
    return this.findAll()
      .pipe(
        take(1),
        map((addresses: AddressModel[]) => {
          const comparator: {(obj1: any, obj2: any): number} = (obj1: any, obj2: any) => obj2.id - obj1.id;
          return addresses.sort(comparator)[0].id + 1;
        })
      )
  }

  private _load(): void {
    localStorage.setItem(
      'addresses',
      JSON.stringify(datas)
    );
  }
}
