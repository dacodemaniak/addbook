import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router
  ) { }

  public get isAuth(): BehaviorSubject<boolean> {
    return this.isAuth$;
  }

  public signin(): void {
    this.isAuth$.next(true);
  }

  public signout(): void {
    this.isAuth$.next(false);

    this.router.navigate(['/', 'home']);

  }
}
