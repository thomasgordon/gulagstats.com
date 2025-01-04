import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  messageCount: number = 0;
  topThreeMessagers: { user: string; messages: string }[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Fetch message count
      this.dataService.getMessageCount().subscribe({
        next: (response) => {
          this.messageCount = response.messageCount;
          console.log('Message Count:', response);
        },
        error: (error) => console.error('Error fetching message count:', error),
      });

      // Fetch top three messagers
      this.dataService.getTopThreeMessagers().subscribe({
        next: (response) => {
          this.topThreeMessagers = response.slice(0, 3);
        },
        error: (error) => console.error('Error fetching top three messagers:', error),
      });
    }
  }
}
