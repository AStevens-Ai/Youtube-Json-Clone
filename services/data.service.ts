import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedItem: any;
  private dataUrl = 'assets/youtubeVid.json';

  constructor(private http: HttpClient) {
    this.loadAndProcessData();
  }

  getData(): Observable<any> {
    return this.http.get(this.dataUrl);
  }

  setSelectedItem(item: any) {
    this.selectedItem = item;
  }

  getSelectedItem(id: string): Observable<any> {
    if (this.selectedItem && this.selectedItem.id === id) {
      return of(this.selectedItem);
    } else {
      return of(null);
    }
  }

  extractVideoId(link: string): string {
    const videoId = link.includes('youtube.com')
      ? new URL(link).searchParams.get('v') || link.split('v=')[1]
      : link;
    return videoId;
  }

  processVideos(videos: any): any {
    for (const key in videos) {
      if (Object.prototype.hasOwnProperty.call(videos, key)) {
        const video = videos[key];
        video.videoId = this.extractVideoId(video.link);
      }
    }
    return videos;
  }

  loadAndProcessData(): void {
    this.getData().subscribe((data: any) => {
      const processedData = this.processVideos(data.movies);
      this.setSelectedItem(processedData);
    });
  }
}
