import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoPagePage } from './video-page.page';

const routes: Routes = [
  {
    path: '',
    component: VideoPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoPagePageRoutingModule {}
