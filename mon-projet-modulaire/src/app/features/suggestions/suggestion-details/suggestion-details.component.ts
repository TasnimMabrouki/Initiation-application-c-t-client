import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css'],
  standalone: false
})
export class SuggestionDetailsComponent implements OnInit {
  suggestionId!: number;
  suggestion!: Suggestion;
  
  // Liste de suggestions simulée
  suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l\'équipe.',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptée',
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusée',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Mise en place d\'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusée',
      nbLikes: 0
    },
    {
      id: 4,
      title: 'Moderniser l\'interface utilisateur',
      description: 'Refonte complète de l\'interface utilisateur pour une meilleure expérience utilisateur.',
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL
    this.route.params.subscribe(params => {
      this.suggestionId = +params['id'];
      this.loadSuggestion();
    });
  }

  loadSuggestion(): void {
    const found = this.suggestions.find(s => s.id === this.suggestionId);
    
    if (found) {
      this.suggestion = found;
    } else {
      // Si suggestion non trouvée, rediriger
      this.router.navigate(['/suggestions']);
    }
  }

  goBack(): void {
    this.router.navigate(['/suggestions']);
  }

  // Méthode pour liker la suggestion
  likeSuggestion(): void {
    if (this.suggestion) {
      this.suggestion.nbLikes++;
      alert('Merci pour votre like !');
    }
  }

  // Méthode pour ajouter aux favoris
  addToFavorites(): void {
    if (this.suggestion) {
      // Simuler l'ajout aux favoris
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      if (!favorites.find((fav: Suggestion) => fav.id === this.suggestion.id)) {
        favorites.push(this.suggestion);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Suggestion ajoutée à vos favoris !');
      } else {
        alert('Cette suggestion est déjà dans vos favoris !');
      }
    }
  }
}