import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './components/movie/movie-list.component';
import { TvShowListComponent } from './components/tv-show/tv-show-list.component';
import { PeopleListComponent } from './components/people/people-list.component';

export const routes: Routes = [{
  path: 'movies', component: MovieListComponent
}, {
  path: 'tvShows', component: TvShowListComponent
}, {
  path: 'people', component: PeopleListComponent
}, {
  path: '', pathMatch: 'full', redirectTo: '/movies'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
