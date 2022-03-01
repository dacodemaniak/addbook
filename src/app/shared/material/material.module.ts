import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ...MaterialModule.materials
  ]
})
export class MaterialModule {
  public static materials: any[] = [
    MatToolbarModule
  ];
}
