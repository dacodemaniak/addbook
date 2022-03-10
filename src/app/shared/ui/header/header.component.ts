import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isAuth!: boolean;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.isAuth
      .subscribe((isAuth: boolean) => this.isAuth = isAuth);
  }

  toggleAccount(): void {
    this.isAuth ? this.userService.signout() : this.userService.signin();

  }
}
