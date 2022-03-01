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



  public showPassword: boolean = false;

  public constructor(
     private addressService: AddressService
  ) {


  }

  public ngOnInit(): void {}


}
