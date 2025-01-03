import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ResponseData {
  messageCount: number;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  data: number = 0;

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://api.gulagstats.com/api/message_count';

  ngOnInit(): void {
    this.http.get<ResponseData>(this.apiUrl).subscribe((response: ResponseData) => {
      console.log(response);
      this.data = response.messageCount;
    });
  }
}
