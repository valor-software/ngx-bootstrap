import { Component, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent implements AfterViewInit {
  currentVersion: string;

  constructor(private http: Http) { }

  ngAfterViewInit(): any {
    this.http
      .get('assets/json/current-version.json')
      .map(res => res.json())
      .subscribe((data: any) => {
        this.currentVersion = data.version;
      });
  }
}
