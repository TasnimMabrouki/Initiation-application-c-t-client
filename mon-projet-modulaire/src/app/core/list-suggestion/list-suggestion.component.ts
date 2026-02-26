import { Component , OnInit} from '@angular/core';
import { Suggestion } from '../../models/suggestion';
import { SuggestionService } from '../Services/suggestion'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-suggestion',
   standalone: false,
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  suggestions: Suggestion[] = [];

  constructor(
    private suggestionService: SuggestionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getSuggestionsList().subscribe({
      next: (data) => {
        this.suggestions = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des suggestions', err);
      }
    });
  }

  deleteSuggestion(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette suggestion ?')) {
      this.suggestionService.deleteSuggestion(id).subscribe({
        next: () => {
          this.loadSuggestions(); // Recharger la liste
          this.router.navigate(['/suggestions']);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
        }
      });
    }
  }

  likeSuggestion(suggestion: Suggestion): void {
    const newLikes = (suggestion.nbLikes || 0) + 1;
    this.suggestionService.updateLikes(suggestion.id, newLikes).subscribe({
      next: (updated) => {
        suggestion.nbLikes = updated.nbLikes;
      },
      error: (err) => {
        console.error('Erreur lors du like', err);
      }
    });
  }
}