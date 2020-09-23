import { Component, OnInit } from '@angular/core';
import {PaginatorService} from '../../paginatior.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  constructor(public paginationService: PaginatorService) { }

  ngOnInit(): void {
  }

}
