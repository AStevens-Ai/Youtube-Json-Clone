import { Component, OnInit } from '@angular/core';
import { DataService } from 'services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  movies: any[] = [];
  constructor(
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.movies = data.movies
    })
  }
  handleLabelClick(item: any) {
    console.log('label clicked');
    this.dataService.setSelectedItem(item);
    this.router.navigate(['/video-page', item.id])
  }

}

