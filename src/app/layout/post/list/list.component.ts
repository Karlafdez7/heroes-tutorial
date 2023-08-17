import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import listModel from 'src/app/listModel';
import { ListService } from '../../../list.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent  implements OnInit{
  
  @Input() searchInput!: string;
  listApi: listModel[] = [];
  displayedColumns: string[] = ['selectAll','id', 'title'];
  dataSource: listModel[] = [];
  

  @Output() selectedRowsChanged = new EventEmitter<listModel[]>();

  selectedRows: listModel[] = [];
  allSelected: boolean = false;
  
  constructor(private listService: ListService, private route: ActivatedRoute, private router : Router){

  };
  
  ngOnInit() {
    this.listService.getPost().subscribe((list:listModel[]) => {
      this.listApi = list;
      this.dataSource = list;
    });
  }

  onSelect(id: number): void {
    if (id !== undefined && id !== null) {
      this.router.navigate(['layout/post/details', id]);
    } else {
      console.error('Item ID is undefined or null.');
    }

    console.log('esto es onSelect')
  }

  toggleSelection(element: listModel) {
    
    const index = this.selectedRows.indexOf(element);
    if (index === -1) {
      this.selectedRows.push(element);

    } else {
      this.selectedRows.splice(index, 1);
    }

    this.updateAllSelectedStatus();
    this.selectedRowsChanged.emit(this.selectedRows);
    console.log('esto es toggleSelection')
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.selectedRows = [];
    } else {
      this.selectedRows = this.dataSource.slice();
    }
    this.allSelected = !this.allSelected;
    this.selectedRowsChanged.emit(this.selectedRows);
    console.log('list', this.selectedRows)
  }

  updateAllSelectedStatus() {
    this.allSelected = this.selectedRows.length === this.dataSource.length;
  }

  isSelected(element: listModel): boolean {
    return this.selectedRows.indexOf(element) !== -1;
  }

  applyFilter(value: string) {
    value = value.trim().toLowerCase(); // Convertir a minúsculas y eliminar espacios en blanco
    this.dataSource = this.listApi.filter(item => item.title.toLowerCase().includes(value));
  }  

}
