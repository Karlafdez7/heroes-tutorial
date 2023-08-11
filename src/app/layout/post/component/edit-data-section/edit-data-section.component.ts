import { Component, Input } from '@angular/core';
import listModel from 'src/app/listModel';


@Component({
  selector: 'app-edit-data-section',
  templateUrl: './edit-data-section.component.html',
  styleUrls: ['./edit-data-section.component.sass']
})
export class EditDataSectionComponent {
  @Input() postDetails!:listModel

}
