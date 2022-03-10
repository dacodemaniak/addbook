import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { CanEditGuard } from './core/guards/can-edit.guard';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'detail/:id',
      component: AddressDetailComponent
    },
    {
      path:'add',
      component: AddAddressComponent,
      canActivate: [CanEditGuard]
    },
    {
      path: '**',
      redirectTo: 'home',
      pathMatch: 'full'
    }
  ];
}
