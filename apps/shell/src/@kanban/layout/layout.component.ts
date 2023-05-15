import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'kanbanboard-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @Input({ required: true }) toolbarRef!: TemplateRef<Element>;
  @Input({ required: true }) sidenavRef!: TemplateRef<Element>;
}
