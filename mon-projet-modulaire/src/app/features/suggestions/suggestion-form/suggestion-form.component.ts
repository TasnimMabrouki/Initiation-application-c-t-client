import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css'],
  standalone: false
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  private suggestions: Suggestion[] = []; // À connecter avec votre service

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z]*$')
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date: [{ value: this.getCurrentDate(), disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  private getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.getRawValue();
      
      const newSuggestion: Suggestion = {
        id: this.getNextId(),
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        date: new Date(),
        status: 'en attente',
        nbLikes: 0
      };

      // Ajouter à la liste (à remplacer par un service)
      this.suggestions.push(newSuggestion);
      
      // Redirection
      this.router.navigate(['/suggestions']);
    }
  }

  private getNextId(): number {
    return this.suggestions.length > 0 
      ? Math.max(...this.suggestions.map(s => s.id)) + 1 
      : 1;
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get title() { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category() { return this.suggestionForm.get('category'); }
}