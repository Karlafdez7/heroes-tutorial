import { Component, OnInit } from '@angular/core';
import listModel from 'src/app/listModel';
import { ListService } from '../../../list.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent  implements OnInit{

  listApi: listModel[] = [];
  displayedColumns: string[] = ['id', 'title', 'body'];
  dataSource: listModel[] = [];

  constructor(private listService: ListService){};

  ngOnInit() {
    this.listService.getPost().subscribe((list:listModel[]) => {
      this.listApi = list;
      this.dataSource = list;
    });
  }

  showMessage(id:number){
    console.log('Mensaje', id)
  }
}