import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'catlabs-visitor-page',
  templateUrl: './visitor-page.component.html',
  styleUrls: ['./visitor-page.component.scss']
})
export class VisitorPageComponent implements OnInit {

  simulationId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.simulationId = this.route.snapshot.paramMap.get('id');
  }

}
