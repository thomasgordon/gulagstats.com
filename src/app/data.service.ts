import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ResponseData {
  messageCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://api.gulagstats.com/api/message_count';

  constructor(private http: HttpClient) {}

  getData(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.apiUrl);
  }
}
