import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
      <div class="nav-container nav-content">
        <div class="brand-box" (click)="onFilter('todos')" style="cursor: pointer;">
          <span class="icon">💻</span>
          <h1 class="logo">TECH<span>HARDWARE</span></h1>
        </div>
        <nav>
          <ul>
            <li [class.active]="currentCategory === 'todos'" (click)="onFilter('todos')">Todos</li>
            <li [class.active]="currentCategory === 'laptops'" (click)="onFilter('laptops')">Laptops</li>
            <li [class.active]="currentCategory === 'componentes'" (click)="onFilter('componentes')">Componentes</li>
            <li [class.active]="currentCategory === 'pcs'" (click)="onFilter('pcs')">PCs</li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="container">
      <section class="hardware-hero fade-in">
        <div class="hero-text">
          <h2>{{ heroTitle }}</h2>
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
    .nav-container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    
    /* REQUISITO: Navbar reducido de los lados y funcional */
    .tech-header { 
      margin: 1rem auto; 
      padding: 0.6rem 0; 
      position: sticky; 
      top: 1rem; 
      z-index: 100; 
      border: 1px solid var(--glass-border);
      width: fit-content;
      min-width: 800px;
      border-radius: 50px; /* Diseño pill moderno */
    }
    
    .nav-content { display: flex; justify-content: space-between; align-items: center; }
    .brand-box { display: flex; align-items: center; gap: 0.8rem; }
    .logo { font-size: 1.2rem; letter-spacing: 2px; margin: 0; }
    .logo span { color: var(--primary); font-weight: 300; }
    
    nav ul { display: flex; list-style: none; gap: 2rem; margin: 0; padding: 0; }
    nav li { 
      color: var(--text-muted); 
      font-weight: 600; 
      cursor: pointer; 
      font-size: 0.85rem; 
      text-transform: uppercase; 
      transition: 0.3s;
      padding: 0.5rem 1rem;
      border-radius: 20px;
    }
    nav li.active, nav li:hover { color: var(--primary); background: rgba(99, 102, 241, 0.1); }

    .hardware-hero { margin: 4rem 0 2rem; text-align: center; }
    .hero-text { margin-bottom: 2rem; }
    .hero-text h2 { font-size: 3.5rem; text-transform: uppercase; font-weight: 900; line-height: 1; margin: 0; }
    .hero-text p { font-size: 1.1rem; color: var(--text-muted); margin: 1rem auto; max-width: 600px; }

    .tech-loading { display: flex; flex-direction: column; align-items: center; padding: 5rem; }
    .radar { width: 60px; height: 60px; border: 4px double var(--primary); border-radius: 50%; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0% { opacity: 1; transform: scale(0.5); } 100% { opacity: 0; transform: scale(1.5); } }

    .empty-state { text-align: center; padding: 5rem; border: 2px dashed var(--glass-border); border-radius: 20px; }

    .tech-footer { margin-top: 8rem; padding: 3rem 0; background: rgba(0,0,0,0.3); border-top: 1px solid var(--glass-border); }
    .footer-grid { display: flex; justify-content: space-between; align-items: center; }
    .footer-info h3 { font-size: 0.9rem; color: var(--primary); margin-bottom: 0.5rem; }
    .footer-links { display: flex; gap: 2rem; color: var(--text-muted); font-size: 0.8rem; font-weight: 700; }

    @media (max-width: 850px) {
      .tech-header { min-width: 95%; width: 95%; }
      nav ul { gap: 1rem; }
      nav li { font-size: 0.7rem; padding: 0.4rem 0.6rem; }
    }
  `]
})
export class AppComponent implements OnInit {
  hardware: Hardware[] = [];
  filteredHardware: Hardware[] = [];
  selectedItem: Hardware | null = null;
  loading: boolean = true;
  currentCategory: string = 'todos';
  heroTitle: string = 'High-End Computing';

  constructor(private hardwareService: HardwareService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchHardware();
  }

  fetchHardware() {
    this.loading = true;
    this.cdr.detectChanges();
    this.hardwareService.getHardware().subscribe({
      next: (data: Hardware[]) => {
        this.hardware = data;
        this.filteredHardware = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error tech-fetch:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // REQUISITO: Eventos - Navegación/Filtro por categorías
  onFilter(category: string) {
    this.currentCategory = category;
    this.loading = true;
    this.heroTitle = category === 'todos' ? 'High-End Computing' : category.toUpperCase();
    this.cdr.detectChanges();

    this.hardwareService.getHardwareByCategoria(category).subscribe({
      next: (data) => {
        this.filteredHardware = data;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSearch(query: string) {
    if (!query.trim()) {
      this.onFilter(this.currentCategory);
      return;
    }
    
    this.loading = true;
    this.cdr.detectChanges();
    this.hardwareService.searchHardware(query).subscribe({
      next: (data: Hardware[]) => {
        this.filteredHardware = data;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onItemSelect(item: Hardware) {
    this.selectedItem = item;
    this.cdr.detectChanges();
  }
}
