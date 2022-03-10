import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DeptBadgeDirective } from './directives/dept-badge.directive';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DeptBadgeDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DeptBadgeDirective,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
