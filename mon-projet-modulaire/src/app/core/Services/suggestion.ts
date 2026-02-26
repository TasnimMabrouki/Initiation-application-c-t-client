// Core/Services/suggestion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Suggestion {
  id: number;
  title: string;
  description: string;
  category: string;
  date: Date;
  status: string;
  nbLikes: number;
}

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private suggestionUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) { }

  // Récupérer toutes les suggestions
  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }

  // Récupérer une suggestion par ID
  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<Suggestion>(`${this.suggestionUrl}/${id}`);
  }

  // Supprimer une suggestion
  deleteSuggestion(id: number): Observable<any> {
    return this.http.delete(`${this.suggestionUrl}/${id}`);
  }

  // Ajouter une suggestion
  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.suggestionUrl, suggestion);
  }

  // Mettre à jour une suggestion
  updateSuggestion(id: number, suggestion: Suggestion): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.suggestionUrl}/${id}`, suggestion);
  }

  // Mettre à jour le nombre de likes
  updateLikes(id: number, nbLikes: number): Observable<Suggestion> {
    return this.http.patch<Suggestion>(`${this.suggestionUrl}/${id}`, { nbLikes });
  }
}