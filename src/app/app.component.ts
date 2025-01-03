import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

interface ResponseData {
  messageCount: number;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  data: number = 0;
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://api.gulagstats.com/api/message_count';

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.http.get<ResponseData>(this.apiUrl).subscribe({
        next: (response) => {
          this.data = response.messageCount;
        },
        error: (error) => console.error('Error:', error)
      });
    }
  }
}
