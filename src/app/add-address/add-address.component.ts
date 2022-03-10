import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { AddressModel } from '../core/models/address-model';
import { AddressService } from '../core/services/address.service';

import { environment } from './../../environments/environment';


@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit, OnDestroy {

  public addressForm!: FormGroup;

  private inputValue: Subject<string> = new Subject<string>();

  private subscription!: Subscription;

  public addresses: AddressModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: AddressService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      streetNumber: [
        '',
        Validators.required
      ],
      streetName: [
        '',
        Validators.required
      ],
      zipCode: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.pattern(/[0-9]/)
        ]

      ],
      city: [
        '',
        Validators.required
      ]
    });

    this.subscription = this.inputValue
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        this.httpClient.get(
          `${environment.apiAddress}?q=${value}`,
          {
            observe: 'response'
          }
        )
        .pipe(
          take(1)
        )
        .subscribe((results: any) => {
          if (results.body.features.length) {
            this.addresses = results.body.features
              .map((feature: any) => {
                const address: AddressModel = new AddressModel();
                const properties: any = feature.properties;
                address.streetNumber = properties.housenumber;
                address.streetName = properties.street;
                address.zipCode = properties.postcode;
                address.city = properties.city;

                return address;
              });
          } else {
            this.addresses = [];
          }
        })
      })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  public get c(): {[key: string]: AbstractControl} {
    return this.addressForm.controls;
  }

  public onSubmit(): void {
    this.service.add(this.addressForm.value)
      .pipe(
        take(1)
      )
      .subscribe(() => this.router.navigate(['/', 'home']));

  }

  public onInput(event: any): void {
    const input: string = event.target.value;
    this.inputValue.next(input);
  }

  public onAddressSelected(address: AddressModel): void {
    this.c['zipCode'].clearValidators();

    for (let property in address) {
      if (address.hasOwnProperty(property)) {
        switch (property) {
          case 'streetNumber':
            this.c[property].setValue(address.streetNumber);
            break;
          case 'streetName':
            this.c[property].setValue(address.streetName);
            break;
          case 'zipCode':
            this.c[property].setValue(address.zipCode);
            break;
          case 'city':
            this.c[property].setValue(address.city);
            break;
        }
      }
    }
  }
}
