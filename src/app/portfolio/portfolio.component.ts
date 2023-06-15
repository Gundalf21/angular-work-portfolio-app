import { Component, OnInit } from "@angular/core";

import { Work } from "./work.model";
import { PortfolioService } from "./portfolio.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  providers: [PortfolioService]
})
export class PortfolioComponent implements OnInit {
  selectedWork: Work;

  constructor(private portfolioService: PortfolioService) {
  }

  ngOnInit(): void {

  }
}
