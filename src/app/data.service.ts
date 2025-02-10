import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MessageCount {
  messageCount: string;
}

interface Messager {
  user: string;
  messages: string;
}

interface Channel {
  channel: string;
  messages: string;
}

interface MentionedUser {
  user: string;
  mentions: string;
}

interface UserStats {
  user: string;
  messageCount: string;
  channelCount: string;
  firstMessage: string;
  lastMessage: string;
}

interface PeakHour {
  hour: number;
  messageCount: string;
  formattedHour: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrlMessages = 'https://api.gulagstats.com/api/messages';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' };
  }

  getMessageCount(): Observable<MessageCount> {
    return this.http.get<MessageCount>(`${this.baseUrlMessages}/message_count`, {
      headers: this.getHeaders(),
    });
  }

  getTopMessagers(): Observable<Messager[]> {
    return this.http.get<Messager[]>(`${this.baseUrlMessages}/top_three_messagers`, {
      headers: this.getHeaders(),
    });
  }

  getTopChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(`${this.baseUrlMessages}/top_channels`, {
      headers: this.getHeaders(),
    });
  }

  getUserStats(userId: string): Observable<UserStats> {
    return this.http.get<UserStats>(`${this.baseUrlMessages}/user/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  getPeakHours(): Observable<PeakHour[]> {
    return this.http.get<PeakHour[]>(`${this.baseUrlMessages}/peak_hours`, {
      headers: this.getHeaders(),
    });
  }

  getMostMentioned(): Observable<MentionedUser[]> {
    return this.http.get<MentionedUser[]>(`${this.baseUrlMessages}/most_mentioned`, {
      headers: this.getHeaders(),
    });
  }
}