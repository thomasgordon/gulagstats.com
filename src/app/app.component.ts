import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  
  messageCount: string = '0';
  topMessagers: { user: string; messages: string }[] = [];
  topChannels: { channel: string; messages: string }[] = [];
  mostMentioned: { user: string; mentions: string }[] = [];
  peakHours: { hour: number; messageCount: string; formattedHour: string }[] = [];
  
  loading = {
    messageCount: true,
    topMessagers: true,
    topChannels: true,
    mostMentioned: true,
    peakHours: true,
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchAllData();
    }
  }

  private fetchAllData(): void {
    this.dataService.getMessageCount().subscribe({
      next: (response) => {
        this.messageCount = response.messageCount;
        this.loading.messageCount = false;
      },
      error: (error) => {
        console.error('Error fetching message count:', error);
        this.loading.messageCount = false;
      },
    });

    this.dataService.getTopMessagers().subscribe({
      next: (response) => {
        this.topMessagers = response;
        this.loading.topMessagers = false;
      },
      error: (error) => {
        console.error('Error fetching top messagers:', error);
        this.loading.topMessagers = false;
      },
    });

    this.dataService.getTopChannels().subscribe({
      next: (response) => {
        this.topChannels = response;
        this.loading.topChannels = false;
      },
      error: (error) => {
        console.error('Error fetching top channels:', error);
        this.loading.topChannels = false;
      },
    });

    this.dataService.getMostMentioned().subscribe({
      next: (response) => {
        this.mostMentioned = response;
        this.loading.mostMentioned = false;
      },
      error: (error) => {
        console.error('Error fetching most mentioned:', error);
        this.loading.mostMentioned = false;
      },
    });

    this.dataService.getPeakHours().subscribe({
      next: (response) => {
        this.peakHours = response;
        this.loading.peakHours = false;
      },
      error: (error) => {
        console.error('Error fetching peak hours:', error);
        this.loading.peakHours = false;
      },
    });
  }
}