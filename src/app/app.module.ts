import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './core/store/movie';
import { PeopleEffects } from './core/store/people';
import { TvShowEffects } from './core/store/tv-show';
import { MovieListComponent } from './components/movie/movie-list.component';
import { TvShowListComponent } from './components/tv-show/tv-show-list.component';
import { PeopleListComponent } from './components/people/people-list.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CardComponent } from './shared/components/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { PeopleDetailsComponent } from './components/people/people-details/people-details.component';
import { MediaItemDetailsComponent } from './shared/components/media-item-details/media-item-details.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    TvShowListComponent,
    PeopleListComponent,
    SideBarComponent,
    CardComponent,
    MediaItemDetailsComponent,
    PeopleDetailsComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([MovieEffects, PeopleEffects, TvShowEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MediaItemDetailsComponent, PeopleDetailsComponent]
})
export class AppModule { }
