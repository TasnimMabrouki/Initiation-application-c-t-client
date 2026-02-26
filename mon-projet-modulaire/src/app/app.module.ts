import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { SuggestionListComponent } from './features/suggestions/suggestion-list/suggestion-list.component';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './core/notfound/notfound.component';
import { provideHttpClient } from '@angular/common/http';
import { AddSuggestion } from './core/add-suggestion/add-suggestion.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListSuggestionComponent,
    HomeComponent,
    NotFoundComponent,
    AddSuggestion

  ],
  imports: [
    BrowserModule,
    FormsModule, // Important pour ngModel
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient() // Nouvelle façon de fournir HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }