import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AddressModel } from './core/models/address-model';
import { AddressService } from './core/services/address.service';

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

  public constructor(
     private addressService: AddressService
  ) {

    this.addresses = [];
  }

  public ngOnInit(): void {
    this.addressService.findAll()
      .pipe(
        take(1)
      )
      .subscribe((addresses: AddressModel[]) => this.addresses = addresses);
  }

  public remove(address: AddressModel): void {
    const index: number = this.addresses.indexOf(address);
    this.addresses.splice(index, 1);
  }

  public toggleRemoveState(): void {
    this.removeState = !this.removeState;
  }
}
