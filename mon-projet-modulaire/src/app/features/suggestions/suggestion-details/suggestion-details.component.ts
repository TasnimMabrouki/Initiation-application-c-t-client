import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css'],
  standalone: false
})
export class SuggestionDetailsComponent implements OnInit {
  suggestionId!: number;
  suggestion!: Suggestion | undefined  | null;;


 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
     private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSuggestion(id);
  }

  loadSuggestion(id: number): void {
    this.suggestionService.getSuggestionById(id).subscribe({
      next: (data) => {
        this.suggestion = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement', err);
      }
    });
  }

  updateSuggestion(): void {
    this.router.navigate(['/edit', this.suggestion?.id]);
  }
}