import { Component, ViewChild } from '@angular/core';
import { EmprestimoListTableComponent } from '../emprestimo-list-table/emprestimo-list-table.component';

@Component({
  selector: 'app-emprestimo-list',
  templateUrl: './emprestimo-list.component.html',
  styleUrls: ['./emprestimo-list.component.css'],
})
export class EmprestimoListComponent {
  checked: boolean = true;

  @ViewChild('childRef', { static: false })
  childComponent: EmprestimoListTableComponent;

  onSlideChange() {
    this.childComponent.onSelectChange();
  }
}
