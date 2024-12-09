import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'landing',
  templateUrl: './landing.component.html',
  standalone: false
})
export class LandingComponent implements AfterViewInit {
  currentVersion?: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      this.http.get<{ version: string }>('assets/json/current-version.json').subscribe(({ version }) => {
        this.currentVersion = version;
      });
    }
  }

  scrollToSection() {
    this.router.navigate(['.', 'documentation'], { fragment: 'getting-started' });
  }
}
