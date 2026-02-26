import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../Services/suggestion';

@Component({
  selector: 'app-add-suggestion',
  templateUrl: './add-suggestion.component.html',
  styleUrls: ['./add-suggestion.component.css'],
  standalone: false
})
export class AddSuggestion implements OnInit {
  suggestionForm!: FormGroup;
  isEditMode = false;
  suggestionId: number | null = null;
  
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Vérifier si on est en mode édition
    this.suggestionId = this.route.snapshot.params['id'];
    if (this.suggestionId) {
      this.isEditMode = true;
      this.loadSuggestionForEdit(this.suggestionId);
    }
  }

  private initForm(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      status: ['en attente'],
      nbLikes: [0]
    });
  }

  loadSuggestionForEdit(id: number): void {
    this.suggestionService.getSuggestionById(id).subscribe({
      next: (data) => {
        this.suggestionForm.patchValue({
          title: data.title,
          description: data.description,
          category: data.category,
          status: data.status,
          nbLikes: data.nbLikes
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la suggestion', err);
      }
    });
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.value;
      
      if (this.isEditMode && this.suggestionId) {
        // Mode édition
        const updatedSuggestion = {
          id: this.suggestionId,
          title: formValue.title,
          description: formValue.description,
          category: formValue.category,
          date: new Date(),
          status: formValue.status,
          nbLikes: formValue.nbLikes
        };

        this.suggestionService.updateSuggestion(this.suggestionId, updatedSuggestion).subscribe({
          next: () => {
            console.log('Suggestion mise à jour avec succès');
            this.router.navigate(['/suggestions']);
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour', err);
          }
        });
      } else {
        // Mode ajout
        const newSuggestion = {
          id: 0, // L'ID sera généré par le backend
          title: formValue.title,
          description: formValue.description,
          category: formValue.category,
          date: new Date(),
          status: 'en attente',
          nbLikes: 0
        };

        this.suggestionService.addSuggestion(newSuggestion).subscribe({
          next: () => {
            console.log('Suggestion ajoutée avec succès');
            this.router.navigate(['/suggestions']);
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout', err);
          }
        });
      }
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      this.markFormGroupTouched(this.suggestionForm);
    }
  }

  // Marquer tous les champs comme touchés
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Getters pour faciliter l'accès aux contrôles
  get title() { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category() { return this.suggestionForm.get('category'); }
}