import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AddressModel } from 'src/app/core/models/address-model';
import { AddressService } from './../../../core/services/address.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public itemNumber!: number;

  constructor(
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.addressService.itemNumber
      .subscribe((items: number) => this.itemNumber = items);
  }

}
