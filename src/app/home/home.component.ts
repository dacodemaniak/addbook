import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AddressModel } from '../core/models/address-model';
import { AddressService } from '../core/services/address.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public addresses!: AddressModel[];

  public removeState: boolean = true;

  constructor(
    private addressService: AddressService
  ) {
    this.addresses = [];
  }

  ngOnInit(): void {
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
