import { Component, OnInit } from '@angular/core';
import {PostService} from '../shared/post.service';
import {Post} from '../shared/interfaces';
import {PaginatorService} from '../shared/paginatior.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  posts: Post[];
  itemsOnPage = 10;
  filter: FormGroup;
  filteredPosts: Post[];

  constructor(private postService: PostService, public paginatorService: PaginatorService) { }

  ngOnInit(): void {
    this.filter = new FormGroup({
      name: new FormControl(''),
      itemsCount: new FormControl('10')
    });
    this.postService.getAll().subscribe(response => {
      this.posts = response;
      this.paginatorService.initPagination(this.posts, this.itemsOnPage);
    });
  }

  addNameFilter(): void {
    this.itemsOnPage = this.filter.value.itemsCount;
    if (this.filter.value.name) {
      this.filteredPosts = this.posts.filter(post => post.companyName
        .toLowerCase().includes(this.filter.value.name.toLowerCase()));
      this.paginatorService.initPagination(this.filteredPosts, this.itemsOnPage);
    } else {
      this.paginatorService.initPagination(this.posts, this.itemsOnPage);
    }
  }
}
