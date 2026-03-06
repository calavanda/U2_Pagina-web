import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hardware } from '../../services/hardware.service';

@Component({
  selector: 'app-hardware-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hardware-grid">
      <div *ngFor="let item of items" 
           class="hardware-card glass-panel fade-in" 
           (click)="selectItem.emit(item)">
        <div class="img-frame">
          <img [src]="item.thumbnail" [alt]="item.title">
          <div class="category-pill">{{ item.category | titlecase }}</div>
        </div>
        <div class="card-info">
          <div class="header-row">
            <h3>{{ item.title }}</h3>
            <span class="rating">★ {{ item.rating }}</span>
          </div>
          <p class="brand">{{ item.brand }}</p>
          <div class="footer-row">
            <span class="price">\${{ item.price }}</span>
            <button class="btn-tech">Ver Specs</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hardware-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2.5rem;
      padding: 2rem 0;
    }
    .hardware-card {
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border: 1px solid var(--glass-border);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: rgba(255,255,255,0.02);
    }
    .hardware-card:hover {
      border-color: var(--primary);
      transform: translateY(-5px);
      box-shadow: 0 10px 40px rgba(99, 102, 241, 0.2);
    }
    .img-frame { height: 180px; position: relative; background: #000; overflow: hidden; }
    .img-frame img { width: 100%; height: 100%; object-fit: contain; padding: 1rem; transition: 0.5s; }
    .hardware-card:hover .img-frame img { transform: scale(1.1); }
    .category-pill {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: var(--primary);
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      font-size: 0.6rem;
      font-weight: 900;
      text-transform: uppercase;
      z-index: 2;
    }
    .card-info { padding: 1.5rem; }
    .header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.3rem; }
    h3 { font-size: 1.1rem; font-weight: 700; color: var(--text-main); }
    .rating { font-size: 0.8rem; color: #fbbf24; font-weight: 600; }
    .brand { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem; }
    .footer-row { display: flex; justify-content: space-between; align-items: center; }
    .price { font-size: 1.5rem; font-weight: 800; color: var(--accent); }
    .btn-tech {
      background: transparent;
      border: 1px solid var(--primary);
      color: var(--primary);
      padding: 0.4rem 0.8rem;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      transition: all 0.3s;
    }
    .hardware-card:hover .btn-tech { background: var(--primary); color: white; }
  `]
})
export class HardwareListComponent {
  // REQUISITO: Elementos dinámicos - Galería reactiva al estado de búsqueda
  @Input() items: Hardware[] = [];
  // REQUISITO: Eventos - Emisión de selección al componente padre
  @Output() selectItem = new EventEmitter<Hardware>();
}
