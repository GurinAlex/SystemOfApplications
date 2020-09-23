import {Injectable} from '@angular/core';
import {Post} from './interfaces';

@Injectable({providedIn: 'root'})
export class PaginatorService {
  currentPage = 1;
  itemsPerPage = 10;
  step = 5;
  chunkList: Post[] = [];
  posts: Post[] = [];
  pagesCount = 0;
  listPages: Array<any> = [];
  totalList: Array<number> = [];

  initPagination(posts: Post[], itemsCount?: number): void {
    this.posts = posts;
    this.totalList = [];

    if (typeof itemsCount !== 'undefined') {
      this.itemsPerPage = itemsCount;
    }

    if (posts.length > itemsCount || this.itemsPerPage) {
      this.pagesCount = Math.ceil(posts.length / itemsCount);
      this.chunkList = this.posts.slice(0, this.itemsPerPage);

      for (let i = 0; i < this.pagesCount; i++) {
        this.totalList.push(i + 1);
      }

      if (this.pagesCount > this.step + 2) {
        this.listPages = new Array<any>().concat(
          this.totalList.slice(0, this.step + 2),
          '...',
          this.totalList.slice(-2)
        );
      } else {
        this.listPages = this.totalList;
      }

    } else {
      this.chunkList = posts;
    }
  }

  changePage(movie: string, pageNumber?: number | string): void {
    if (movie && this.currentPage !== 1 && movie === 'reduce') {
      this.currentPage--;
      this.changeActivePage();
      this.changeViewModel('left');
    }

    if (movie && this.currentPage !== Math.ceil(this.posts.length / this.itemsPerPage) && movie === 'increase') {
      this.currentPage++;
      this.changeActivePage();
      this.changeViewModel();
    }

    if (pageNumber && typeof pageNumber === 'number') {
      this.changeActivePage(pageNumber);
      this.changeViewModel('left');
    }
  }

  changeViewModel(direction?: string): void {
    if (this.totalList.length < this.step + 2) {
      return;
    }

    if (this.currentPage > this.step + 1 && this.currentPage < this.totalList.length - 2) {
      this.listPages = new Array<any>().concat(
        this.totalList.slice(0, 1),
        '...',
        this.totalList.slice(this.currentPage - this.step, this.currentPage + 1),
        '...',
        this.totalList.slice(-2)
      );
    }

    if (this.currentPage >= this.totalList.length - 3) {
      this.listPages = new Array<any>().concat(
        this.totalList.slice(0, 1),
        '...',
        this.totalList.slice(-2 - (this.step))
      );
    }

    if (this.currentPage < 2 + this.step && direction) {
      this.listPages = new Array<any>().concat(
        this.totalList.slice(0, this.step + 2),
        '...',
        this.totalList.slice(-2)
      );
    }
  }

  changeActivePage(pageNumber?: number): void {
    if (pageNumber && pageNumber === this.currentPage) {
      return;
    }

    if (pageNumber && pageNumber !== this.currentPage) {
      this.currentPage = pageNumber;
    }

    this.chunkList = this.posts
      .slice(this.itemsPerPage * this.currentPage - this.itemsPerPage, this.itemsPerPage * this.currentPage);
  }
}
