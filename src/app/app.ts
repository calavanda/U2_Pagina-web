import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HardwareService, Hardware } from './services/hardware.service';
import { SearchComponent } from './components/search/search.component';
import { HardwareListComponent } from './components/hardware-list/hardware-list.component';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchComponent, HardwareListComponent, DetailModalComponent],
  template: `
    <header class="tech-header glass-panel">
      <div class="container nav-content">
        <div class="brand-box">
          <span class="icon">💻</span>
          <h1 class="logo">TECH<span>HARDWARE</span></h1>
        </div>
        <nav>
          <ul>
            <li class="active">Inventario</li>
            <li>Laptops</li>
            <li>Componentes</li>
            <li>Soporte</li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="container">
      <section class="hardware-hero fade-in">
        <div class="hero-text">
          <h2>High-End Computing</h2>
          <p>Explora el catálogo de hardware más avanzado para entusiastas y profesionales.</p>
        </div>
        <app-search (search)="onSearch(\$event)"></app-search>
      </section>

      <!-- REQUISITO: Elementos Dinámicos - Estado de carga visual -->
      <div *ngIf="loading" class="tech-loading">
        <div class="radar"></div>
        <p>Escaneando hardware disponible...</p>
      </div>

      <!-- REQUISITO: Elementos Dinámicos - Grid reactivo -->
      <app-hardware-list 
        *ngIf="!loading" 
        [items]="filteredHardware" 
        (selectItem)="onItemSelect(\$event)">
      </app-hardware-list>

      <div *ngIf="!loading && filteredHardware.length === 0" class="empty-state">
        <p>No se encontraron componentes compatibles con tu búsqueda.</p>
        <button class="btn-primary" (click)="fetchHardware()">Reiniciar Pantalla</button>
      </div>
    </main>

    <!-- REQUISITO: Manipulación del DOM - Modal dinámico -->
    <app-detail-modal 
      [item]="selectedItem" 
      (close)="selectedItem = null">
    </app-detail-modal>

    <footer class="tech-footer">
      <div class="container footer-grid">
        <div class="footer-info">
          <h3>TECHHARDWARE EXPLORER</h3>
          <p>La plataforma definitiva para la gestión de activos tecnológicos.</p>
        </div>
        <div class="footer-links">
          <span>Sistemas</span>
          <span>Redes</span>
          <span>Seguridad</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
    .tech-header { margin: 1.5rem 0; padding: 0.8rem 0; position: sticky; top: 1rem; z-index: 100; border-bottom: 2px solid var(--primary); }
    .nav-content { display: flex; justify-content: space-between; align-items: center; }
    .brand-box { display: flex; align-items: center; gap: 0.8rem; }
    .logo { font-size: 1.4rem; letter-spacing: 2px; }
    .logo span { color: var(--primary); font-weight: 300; }
    nav ul { display: flex; list-style: none; gap: 3rem; }
    nav li { color: var(--text-muted); font-weight: 700; cursor: pointer; font-size: 0.8rem; text-transform: uppercase; transition: 0.3s; }
    nav li.active, nav li:hover { color: var(--primary); }

    .hardware-hero { margin: 5rem 0 3rem; }
    .hero-text { margin-bottom: 3rem; }
    .hero-text h2 { font-size: 4rem; text-transform: uppercase; font-weight: 900; line-height: 1; }
    .hero-text p { font-size: 1.2rem; color: var(--text-muted); margin-top: 1rem; max-width: 600px; }

    .tech-loading { display: flex; flex-direction: column; align-items: center; padding: 5rem; }
    .radar { width: 60px; height: 60px; border: 4px double var(--primary); border-radius: 50%; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0% { opacity: 1; transform: scale(0.5); } 100% { opacity: 0; transform: scale(1.5); } }

    .empty-state { text-align: center; padding: 5rem; border: 2px dashed var(--glass-border); border-radius: 20px; }

    .tech-footer { margin-top: 8rem; padding: 4rem 0; background: rgba(0,0,0,0.3); border-top: 1px solid var(--glass-border); }
    .footer-grid { display: flex; justify-content: space-between; align-items: center; }
    .footer-info h3 { font-size: 0.9rem; color: var(--primary); margin-bottom: 0.5rem; }
    .footer-links { display: flex; gap: 2rem; color: var(--text-muted); font-size: 0.8rem; font-weight: 700; }
  `]
})
export class AppComponent implements OnInit {
  hardware: Hardware[] = [];
  filteredHardware: Hardware[] = [];
  selectedItem: Hardware | null = null;
  loading: boolean = true;

  constructor(private hardwareService: HardwareService) {}

  ngOnInit() {
    // REQUISITO: Peticiones asíncronas - Carga inicial al montar el componente
    this.fetchHardware();
  }

  fetchHardware() {
    this.loading = true;
    this.hardwareService.getHardware().subscribe({
      next: (data: Hardware[]) => {
        this.hardware = data;
        this.filteredHardware = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error tech-fetch:', err);
        this.loading = false;
      }
    });
  }

  // REQUISITO: Eventos - Responde al evento de teclado para buscar en tiempo real
  onSearch(query: string) {
    if (!query.trim()) {
      this.filteredHardware = this.hardware;
      return;
    }
    
    this.loading = true;
    // REQUISITO: Peticiones asíncronas - Carga datos dinámicos mediante AJAX
    this.hardwareService.searchHardware(query).subscribe({
      next: (data: Hardware[]) => {
        // REQUISITO: Elementos dinámicos - La lista cambia según la acción del usuario
        this.filteredHardware = data;
        this.loading = false;
      }
    });
  }

  // REQUISITO: Manipulación del DOM - Modificación dinámica del contenido al seleccionar hardware
  onItemSelect(item: Hardware) {
    this.selectedItem = item;
  }
}
