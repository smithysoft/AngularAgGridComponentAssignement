import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  readonly url = environment.youtubeApiLink;

  constructor(public http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url)
      .pipe(map((data: any) => {
        return data.items.map((item) => {
          return { videoId: item.id.videoId, ...item.snippet };
        });
      }));
  }
}
