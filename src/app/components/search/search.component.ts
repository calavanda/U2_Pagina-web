import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="search-container glass-panel">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input 
          type="text" 
          (keyup)="onSearch(\$event)"
          placeholder="Busca películas, series o productos..."
          class="search-input"
        >
      </div>
      <div class="search-stats" *ngIf="query">
        Buscando: <strong>{{ query }}</strong>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      padding: 1rem 2rem;
      margin: 2rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .search-wrapper {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .search-icon {
      font-size: 1.2rem;
      opacity: 0.7;
    }
    .search-input {
      background: transparent;
      border: none;
      color: white;
      font-size: 1.1rem;
      width: 100%;
      outline: none;
      font-family: inherit;
    }
    .search-input::placeholder {
      color: var(--text-muted);
    }
    .search-stats {
      font-size: 0.85rem;
      color: var(--text-muted);
      animation: fadeIn 0.3s ease;
    }
    strong {
      color: var(--primary);
    }
  `]
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();
  query: string = '';

  // REQUISITO: Eventos - El evento 'keyup' responde a la interacción del teclado
  onSearch(event: any) {
    this.query = event.target.value;
    // REQUISITO: Elementos dinámicos - Emite el valor para actualizar la lista en tiempo real
    this.search.emit(this.query);
  }
}
