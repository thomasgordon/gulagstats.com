import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ResponseData {
  length: number;
  messageCount: number;
  name: string;
  array: [];
}

interface Messager {
  user: string;
  messages: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private messageCountUrl = 'http://api.gulagstats.com/api/message_count';
  private mostMessengersUrl = 'http://api.gulagstats.com/api/top_three_messagers';

  constructor(private http: HttpClient) {}

  getMessageCount(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.messageCountUrl, {
      headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
    });
  }

  getTopThreeMessagers(): Observable<Messager[]> {
    return this.http.get<Messager[]>(this.mostMessengersUrl, {
      headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
    });
  }
}
