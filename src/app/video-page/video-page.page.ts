import { Component, OnInit } from '@angular/core';
import { DataService } from 'services/data.service';
import { ActivatedRoute } from '@angular/router';

declare var YT: any;

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.page.html',
  styleUrls: ['./video-page.page.scss'],
})
export class VideoPagePage implements OnInit {
  player: YT.Player | undefined;
  movie: any | null = null;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    console.log('Initiating video page component');
    this.route.paramMap.subscribe(params => {
      const videoId = params.get('id');
      console.log('Extracted video ID from route:', videoId);

      if (videoId) {
        this.dataService.getSelectedItem(videoId).subscribe((data: any) => {
          console.log('Retrieved selected video:', data);
          const selectedVideo = data;

          if (selectedVideo) {
            const videoId = this.dataService.extractVideoId(selectedVideo.link);

            this.initYoutubePlayer(videoId, selectedVideo);
          }
        });
      }
    });
  }

  initYoutubePlayer(videoId: string, selectedVideo: any) {
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    } else {
      this.createPlayer(videoId, selectedVideo);
      this.setPlayerDimensions();
    }

    (window as any).onYouTubeIframeAPIReady = () => {
      this.createPlayer(videoId, selectedVideo);
      console.log('YouTube IFrame API ready. Player initialized.');
      this.setPlayerDimensions();
    };
  }

  createPlayer(videoId: string, selectedVideo: any) {
    this.player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: videoId,
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
      },
    });
    console.log('Player created for video ID:', videoId);
    this.movie = selectedVideo;
  }

  onPlayerReady(event: any) {
    event.target.playVideo();
    console.log('Player ready. Playing video.');
  }

  onPlayerStateChange(event: any) {
    console.log('Player state changed:', event.data);
  }

  setPlayerDimensions() {
    const playerElement = document.getElementById('player');
    if (playerElement) {
      const screenWidth = window.innerWidth;
      const playerWidth = screenWidth < 640 ? screenWidth : 640;
      const playerHeight = playerWidth * 0.5625;

      playerElement.style.width = `${playerWidth}px`;
      playerElement.style.height = `${playerHeight}px`;
    }
  }
}
