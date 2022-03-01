import { Component, OnInit } from '@angular/core';
import { AddressService } from '../core/services/address.service';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit {

  constructor(
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
  }

}
