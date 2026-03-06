import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hardware } from '../../services/hardware.service';

@Component({
  selector: 'app-detail-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" (click)="close.emit()" [class.active]="item">
      <div class="modal-content glass-panel" (click)="\$event.stopPropagation()">
        <button class="close-btn" (click)="close.emit()">×</button>
        
        <div class="modal-body" *ngIf="item">
          <div class="modal-image">
            <img [src]="item.images[0] || item.thumbnail" [alt]="item.title">
            <div class="tech-badge">TECNOLOGÍA PUNTA</div>
          </div>
          <div class="modal-info">
            <span class="category-tag">{{ item.category | uppercase }}</span>
            <h2>{{ item.title }}</h2>
            <p class="brand">Marca: <strong>{{ item.brand }}</strong></p>
            
            <div class="specs-box">
              <h3>Especificaciones Técnicas</h3>
              <div class="specs-grid">
                <div class="spec-item">
                  <span class="label">Procesador</span>
                  <span class="val">{{ item.specs?.processor }}</span>
                </div>
                <div class="spec-item">
                  <span class="label">Memoria RAM</span>
                  <span class="val">{{ item.specs?.ram }}</span>
                </div>
                <div class="spec-item">
                  <span class="label">Almacenamiento</span>
                  <span class="val">{{ item.specs?.storage }}</span>
                </div>
                <div class="spec-item">
                  <span class="label">Pantalla</span>
                  <span class="val">{{ item.specs?.display }}</span>
                </div>
              </div>
            </div>

            <p class="description">{{ item.description }}</p>
            
            <div class="action-row">
              <div class="price-stack">
                <span class="stock" [class.low]="item.stock < 10">
                  {{ item.stock }} unidades disponibles
                </span>
                <span class="price">\${{ item.price }}</span>
              </div>
              <button class="btn-primary" (click)="onAction()">Cotizar Hardware</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(10, 10, 15, 0.9);
      backdrop-filter: blur(15px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: all 0.4s ease;
    }
    .modal-overlay.active { opacity: 1; pointer-events: auto; }
    .modal-content {
      width: 90%;
      max-width: 1000px;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid var(--primary);
      box-shadow: 0 0 30px var(--primary-glow);
    }
    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      background: transparent;
      border: none;
      color: var(--primary);
      font-size: 2.5rem;
      cursor: pointer;
      line-height: 1;
    }
    .modal-body { display: grid; grid-template-columns: 1fr 1.2fr; gap: 3rem; padding: 3rem; }
    @media (max-width: 850px) { .modal-body { grid-template-columns: 1fr; } }
    
    .modal-image { position: relative; }
    .modal-image img { width: 100%; border-radius: 8px; border: 1px solid var(--glass-border); }
    .tech-badge {
      position: absolute;
      bottom: -10px;
      right: -10px;
      background: var(--accent);
      padding: 0.5rem 1rem;
      font-size: 0.7rem;
      font-weight: 800;
      border-radius: 4px;
    }

    .category-tag { color: var(--primary); font-weight: 700; font-size: 0.8rem; letter-spacing: 2px; }
    h2 { font-size: 2.5rem; margin: 0.5rem 0; }
    .brand { color: var(--text-muted); margin-bottom: 2rem; }
    
    .specs-box {
      background: rgba(255,255,255,0.03);
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      border-left: 4px solid var(--primary);
    }
    .specs-box h3 { font-size: 1rem; margin-bottom: 1rem; color: var(--primary); }
    .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .spec-item .label { display: block; font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; }
    .spec-item .val { font-weight: 600; font-size: 0.9rem; }

    .description { line-height: 1.6; color: var(--text-muted); margin-bottom: 2rem; }
    .action-row { display: flex; justify-content: space-between; align-items: flex-end; }
    .price-stack { display: flex; flex-direction: column; }
    .stock { font-size: 0.8rem; margin-bottom: 0.3rem; }
    .stock.low { color: #f43f5e; font-weight: 700; }
    .price { font-size: 2.5rem; font-weight: 800; color: var(--accent); }
  `]
})
export class DetailModalComponent {
  // REQUISITO: Manipulación del DOM - Mostrar contenido basado en el ítem seleccionado
  @Input() item: Hardware | null = null;
  @Output() close = new EventEmitter<void>();

  onAction() {
    alert('Solicitud de cotización enviada al equipo técnico.');
  }
}
