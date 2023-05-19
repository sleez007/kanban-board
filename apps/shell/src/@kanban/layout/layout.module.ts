import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { KitComponent } from './kit/kit.component';
import { SharedUiMaterialModule } from '@kanbanboard/shared/ui-material';
import { LayoutDirective } from '../directives/layout.directive';

@NgModule({
  declarations: [LayoutComponent, KitComponent, LayoutDirective],
  imports: [CommonModule, RouterModule, SharedUiMaterialModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
