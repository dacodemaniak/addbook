import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddressModel } from '../core/models/address-model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input()
  public addressModel!: AddressModel;

  @Output()
  public oRemove: EventEmitter<AddressModel> = new EventEmitter<AddressModel>();

  @Input()
  public buttonDisabledState: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  getStreetName(): string {
    return this.addressModel.streetName.toUpperCase();
  }

  removeAddress(): void {
    this.oRemove.emit(this.addressModel);
  }

  updateAddress(): void {
    this.addressModel.zipCode = '75000';
  }
}
