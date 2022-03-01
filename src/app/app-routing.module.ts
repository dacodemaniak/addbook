import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressDetailComponent } from './address-detail/address-detail.component';
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
      path: 'detail',
      component: AddressDetailComponent
    },
    {
      path: '**',
      redirectTo: 'home',
      pathMatch: 'full'
    }
  ];
}
