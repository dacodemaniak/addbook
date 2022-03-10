import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressModel } from 'src/app/core/models/address-model';

@Directive({
  selector: '[deptBadge]'
})
export class DeptBadgeDirective implements OnInit {
  @Input()
  public dept!: AddressModel;

  private nativeElement: HTMLElement;

  constructor(
    private elementRef: ElementRef,
    private router: Router
  ) {
    this.nativeElement = elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.toBadge();
  }

  @HostListener('click')
  public navigateTo(): void {
    this.router.navigate(['/', 'detail', this.dept.id]);
  }

  private toBadge(): void {
    if (!this.nativeElement.classList.contains('badge')) {
      this.nativeElement.classList.add('badge');
    }

    this.nativeElement.textContent = this.dept.zipCode.substring(0, 2);
  }

}
