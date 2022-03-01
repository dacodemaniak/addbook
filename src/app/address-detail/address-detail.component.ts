import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddressModel } from '../core/models/address-model';
import { AddressService } from '../core/services/address.service';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit, OnDestroy {

  private subscribers: Subscription[] = [];
  public addressModel!: AddressModel;

  constructor(
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscribers.push(
      this.route.paramMap
        .subscribe((params: ParamMap) => {
          const oId: any = params.get('id');
          if (oId) {
            // Call service with id
            this.subscribers.push(
              this.addressService.findOne(+oId)
                .subscribe((address: AddressModel | null) => {
                  if (address instanceof AddressModel) {
                    this.addressModel = address;
                  } else {
                    throw new Error(`Address with ${oId} was not found`);
                  }
                })
            );
          }
        })
    )

  }

  ngOnDestroy(): void {
      this.subscribers.forEach((subscriber: Subscription) => subscriber.unsubscribe());
  }

  public goHome(): void {
    this.router.navigate(['/', 'home']);
  }
}
