import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [CommonModule],
  exports: [
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class SharedUiMaterialModule {}
