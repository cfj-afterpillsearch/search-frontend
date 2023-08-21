import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, RouterModule],
})
export class AppComponent implements OnInit {
  title = 'afterpill-search';
  constructor(private router: Router, private gtmService: GoogleTagManagerService) {
    this.router.events.forEach((item) => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'page',
          pageName: item.url,
        };

        this.gtmService.pushTag(gtmTag);
      }
    });
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
