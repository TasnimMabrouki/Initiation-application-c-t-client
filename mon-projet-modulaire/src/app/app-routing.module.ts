import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './core/notfound/notfound.component';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { SuggestionListComponent } from './features/suggestions/suggestion-list/suggestion-list.component';
import { SuggestionDetailsComponent } from './features/suggestions/suggestion-details/suggestion-details.component';
import { SuggestionFormComponent } from './features/suggestions/suggestion-form/suggestion-form.component';
import { AddSuggestion } from './core/add-suggestion/add-suggestion.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/suggestions', pathMatch: 'full' },
  { path: 'suggestions', component: ListSuggestionComponent },
  { path: 'details/:id', component: SuggestionDetailsComponent },
  { path: 'add', component: AddSuggestion },
  { path: 'edit/:id', component: AddSuggestion },
  //{ path: 'listSuggestion', component: ListSuggestionComponent },
  //{ path: 'suggestions', loadChildren: () => import('./features/suggestions/suggestions.module').then(m => m.SuggestionsModule) },
  //{ path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },
  //{ path: '**', component: NotFoundComponent }  // Route 404
  // Routes avec lazy loading
  { path: 'listSuggestion', component: ListSuggestionComponent },
  { 
    path: 'suggestions', 
    loadChildren: () => import('./features/suggestions/suggestions.module')
      .then(m => m.SuggestionsModule) 
  },
  { 
    path: 'users', 
    loadChildren: () => import('./features/users/users.module')
      .then(m => m.UsersModule) 
  },
  
  // Route 404 (doit être en dernier)
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
