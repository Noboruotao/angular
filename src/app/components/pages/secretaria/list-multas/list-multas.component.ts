import { Component, ViewChild } from '@angular/core';
import { ListMultasTableComponent } from '../list-multas-table/list-multas-table.component';

@Component({
  selector: 'app-list-multas',
  templateUrl: './list-multas.component.html',
  styleUrls: ['./list-multas.component.css'],
})
export class ListMultasComponent {
  pago = false;

  @ViewChild('childRef', { static: false })
  childComponent: ListMultasTableComponent;

  onSlideChange() {
    this.childComponent.onSelectChange();
  }
}
