import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit {
  works: any;
  currentWork = null;
  currentIndex = -1;
  workName = '';

  constructor(private portfolioService: PortfolioService) {
  }

  ngOnInit(): void {
    this.retrieveWorks();
  }

  retrieveWorks(): void {
    this.portfolioService.getAll()
    .subscribe(
      data => {
        this.works = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  refreshList(): void {
    this.retrieveWorks();
    this.currentWork = null;
    this.currentIndex = -1;
  }

  setActiveWork(work, index): void {
    this.currentWork = work;
    this.currentIndex = index;
  }

  removeAllWorks(): void {
    if(confirm("Are you sure to delete all of the entries?")) {
    this.portfolioService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveWorks();
        },
        error => {
          console.log(error);
        });
      }
  }

  searchTitle(): void {
    this.portfolioService.findByTitle(this.workName)
      .subscribe(
        data => {
          this.works.workName = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
