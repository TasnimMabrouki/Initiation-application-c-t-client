import { Component } from '@angular/core';
import { Suggestion } from '../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
   standalone: false,
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent {
  // Liste statique des suggestions
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

  filteredSuggestions: Suggestion[] = [...this.suggestions];
  favorites: Suggestion[] = [];
  searchTerm = '';
  selectedCategory = 'all';

  // Méthode pour liker une suggestion
  likeSuggestion(suggestion: Suggestion): void {
    suggestion.nbLikes++;
  }

  // Méthode pour ajouter aux favoris
  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find(fav => fav.id === suggestion.id)) {
      this.favorites.push(suggestion);
      alert('Suggestion ajoutée aux favoris !');
    }
  }

  // Méthode pour filtrer les suggestions
  filterSuggestions(): void {
    this.filteredSuggestions = this.suggestions.filter(suggestion => {
      const matchesSearch = suggestion.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           suggestion.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || 
                             suggestion.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  // Méthode pour récupérer les catégories uniques
  get categories(): string[] {
    return [...new Set(this.suggestions.map(s => s.category))];
  }

  // Méthode pour vérifier si une suggestion peut avoir des boutons
  showButtons(suggestion: Suggestion): boolean {
    return suggestion.status !== 'refusée';
  }
}