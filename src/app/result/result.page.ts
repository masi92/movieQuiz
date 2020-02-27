import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  //member variables
  duration: number;
  durationSeconds: number;

  constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.duration = Number(this.activatedRoute.snapshot.paramMap.get('duration'));
    this.durationSeconds = Math.round(this.duration) / 1000;
  }

  goHome() {
    this.router.navigateByUrl('home');
  }

}
