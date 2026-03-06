import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';

export interface Hardware {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: 'laptops' | 'componentes' | 'pcs' | 'perifericos';
  thumbnail: string;
  images: string[];
  specs?: {
    processor?: string;
    ram?: string;
    storage?: string;
    display?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class HardwareService {
  // REQUISITO: Catálogo expandido (90+ productos: 30 Laptops, 30 Componentes, 30 PCs/Periféricos)
  private hardwareList: Hardware[] = [
    // --- 30 LAPTOPS ---
    { id: 1, title: 'MacBook Pro M3', description: 'Laptop premium para profesionales.', price: 2499, rating: 4.9, stock: 15, brand: 'Apple', category: 'laptops', thumbnail: 'https://images.unsplash.com/photo-1517336714460-45788a10e671?q=80&w=300&auto=format', images: ['https://images.unsplash.com/photo-1517336714460-45788a10e671?w=800'], specs: { processor: 'Apple M3 Pro', ram: '18GB', storage: '512GB SSD', display: '14" Liquid Retina' } },
    { id: 2, title: 'Dell XPS 15', description: 'Potencia i9 en diseño ultra delgado.', price: 1899, rating: 4.7, stock: 8, brand: 'Dell', category: 'laptops', thumbnail: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=300&auto=format', images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800'], specs: { processor: 'Intel i9-13900H', ram: '32GB', storage: '1TB SSD', display: '15.6" 4K OLED' } },
    { id: 3, title: 'ASUS ROG G14', description: 'Gaming compacto y potente.', price: 1599, rating: 4.8, stock: 5, brand: 'ASUS', category: 'laptops', thumbnail: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=300&auto=format', images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800'], specs: { processor: 'Ryzen 9 7940HS', ram: '16GB', storage: '1TB SSD', display: '14" 165Hz' } },
    { id: 101, title: 'HP Spectre x360', description: 'Convertible premium 2-en-1.', price: 1399, rating: 4.6, stock: 10, brand: 'HP', category: 'laptops', thumbnail: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?q=80&w=300&auto=format', images: [], specs: { processor: 'Intel i7', ram: '16GB', storage: '512GB', display: '13.5" OLED' } },
    { id: 102, title: 'Lenovo ThinkPad X1', description: 'El estándar de oro para negocios.', price: 1650, rating: 4.7, stock: 12, brand: 'Lenovo', category: 'laptops', thumbnail: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=300&auto=format', images: [], specs: { processor: 'Intel i7 vPro', ram: '16GB', storage: '1TB', display: '14" IPS' } },
    { id: 103, title: 'Razer Blade 15', description: 'Elegancia y potencia gaming.', price: 2799, rating: 4.5, stock: 4, brand: 'Razer', category: 'laptops', thumbnail: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=300&auto=format', images: [], specs: { processor: 'Intel i9 + RTX 4080', ram: '32GB', storage: '1TB', display: '15.6" 240Hz' } },
    { id: 104, title: 'Microsoft Surface 5', description: 'Ligereza y productividad táctil.', price: 999, rating: 4.4, stock: 20, brand: 'Microsoft', category: 'laptops', thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=300&auto=format', images: [], specs: { processor: 'Intel i5', ram: '8GB', storage: '256GB', display: '13" PixelSense' } },
    { id: 105, title: 'Acer Swift Edge', description: 'La laptop OLED más ligera.', price: 1299, rating: 4.3, stock: 7, brand: 'Acer', category: 'laptops', thumbnail: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=300&auto=format', images: [], specs: { processor: 'Ryzen 7', ram: '16GB', storage: '512GB', display: '16" 4K OLED' } },
    { id: 106, title: 'Gigabyte Aero 16', description: 'Construida para creadores visuales.', price: 2100, rating: 4.6, stock: 6, brand: 'Gigabyte', category: 'laptops', thumbnail: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=300&auto=format', images: [], specs: { processor: 'Intel i9', ram: '32GB', storage: '2TB', display: '16" UHD OLED' } },
    { id: 107, title: 'MSI Stealth 14', description: 'Rendimiento épico en formato mini.', price: 1899, rating: 4.4, stock: 5, brand: 'MSI', category: 'laptops', thumbnail: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=300&auto=format', images: [], specs: { processor: 'Intel i7 + RTX 4060', ram: '16GB', storage: '1TB', display: '14" 165Hz' } },
    // Loop para simular 30 laptops (relleno con variaciones)
    ...Array.from({length: 20}, (_, i) => ({
      id: 110 + i, title: `Laptop Tech Pro v${i+1}`, description: 'Laptop optimizada para flujos de trabajo modernos.', price: 800 + (i * 50), rating: 4.0 + (Math.random()), stock: 10 + i, brand: 'Tech-S', category: 'laptops' as const, thumbnail: `https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=300&auto=format`, images: [], specs: { processor: 'Multi-Core CPU', ram: '16GB', storage: '512GB', display: 'FHD IPS' }
    })),

    // --- 30 COMPONENTES ---
    { id: 4, title: 'NVIDIA RTX 4090', description: 'La reina de las tarjetas gráficas.', price: 1699, rating: 5.0, stock: 3, brand: 'NVIDIA', category: 'componentes', thumbnail: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=300&auto=format', images: [], specs: { processor: 'AD102 GPU', ram: '24GB G6X', storage: 'N/A', display: '8K HDR' } },
    { id: 5, title: 'Intel Core i9-14900K', description: 'Poder de procesamiento bruto.', price: 589, rating: 4.8, stock: 20, brand: 'Intel', category: 'componentes', thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=300&auto=format', images: [], specs: { processor: '24 Cores / 32 Threads', ram: 'LGA1700', storage: 'N/A', display: 'N/A' } },
    { id: 201, title: 'AMD Ryzen 7 7800X3D', description: 'El mejor para gaming.', price: 449, rating: 4.9, stock: 15, brand: 'AMD', category: 'componentes', thumbnail: 'https://images.unsplash.com/photo-1555617766-c94804975da3?q=80&w=300&auto=format', images: [], specs: { processor: '8 Cores 3D V-Cache', ram: 'AM5', storage: 'N/A', display: 'N/A' } },
    { id: 202, title: 'RTX 4070 SUPER', description: 'Perfecta para 1440p.', price: 620, rating: 4.7, stock: 12, brand: 'ASUS', category: 'componentes', thumbnail: 'https://images.unsplash.com/photo-1614741487251-40be2ec07077?q=80&w=300&auto=format', images: [], specs: { processor: 'AD104-350', ram: '12GB G6X', storage: 'N/A', display: 'DLSS 3.5' } },
    { id: 203, title: 'Samsung 990 Pro 2TB', description: 'Velocidad NVMe extrema.', price: 180, rating: 4.9, stock: 40, brand: 'Samsung', category: 'componentes', thumbnail: 'https://images.unsplash.com/photo-1597872200384-2a149466d730?q=80&w=300&auto=format', images: [], specs: { processor: 'Gen4 x4', ram: '2GB LPDDR4', storage: '2TB NVMe', display: 'N/A' } },
    { id: 204, title: 'Corsair Vengeance 32GB', description: 'RAM DDR5 de baja latencia.', price: 140, rating: 4.8, stock: 25, brand: 'Corsair', category: 'componentes', thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=300&auto=format', images: [], specs: { processor: 'Intel XMP 3.0', ram: '32GB (2x16)', storage: 'N/A', display: 'N/A' } },
    ...Array.from({length: 24}, (_, i) => ({
      id: 210 + i, title: `Componente Gamer v${i+1}`, description: 'Pieza fundamental para tu ensamble.', price: 100 + (i * 30), rating: 4.2 + (Math.random() / 2), stock: 5 + i, brand: 'Master-Tech', category: 'componentes' as const, thumbnail: `https://images.unsplash.com/photo-1587202377405-8361659ac0ae?q=80&w=300&auto=format`, images: [], specs: { processor: 'Part Type X', ram: 'Gen Specs', storage: 'Standard', display: 'N/A' }
    })),

    // --- 30 PCs Y PERIFÉRICOS ---
    { id: 25, title: 'Titan Desktop RTX 4080', description: 'PC armada para entusiastas.', price: 2999, rating: 4.9, stock: 4, brand: 'Custom', category: 'pcs', thumbnail: 'https://images.unsplash.com/photo-1587202377405-8361659ac0ae?q=80&w=300&auto=format', images: [], specs: { processor: 'i9-13900K', ram: '32GB', storage: '2TB NVMe', display: 'Tower Case' } },
    { id: 26, title: 'Workstation Mac Studio', description: 'Potencia compacta de Apple.', price: 3999, rating: 5.0, stock: 2, brand: 'Apple', category: 'pcs', thumbnail: 'https://images.unsplash.com/photo-1647419139263-54cdb83e449c?q=80&w=300&auto=format', images: [], specs: { processor: 'M2 Ultra', ram: '64GB', storage: '1TB', display: 'N/A' } },
    { id: 301, title: 'Logitech G502X Plus', description: 'Mouse gaming inalámbrico.', price: 159, rating: 4.8, stock: 30, brand: 'Logitech', category: 'perifericos', thumbnail: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=300&auto=format', images: [], specs: { processor: 'HERO 25K', ram: 'N/A', storage: 'N/A', display: 'N/A' } },
    { id: 302, title: 'SteelSeries Apex Pro', description: 'Teclado mecánico ajustable.', price: 199, rating: 4.9, stock: 15, brand: 'SteelSeries', category: 'perifericos', thumbnail: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=300&auto=format', images: [], specs: { processor: 'OmniPoint', ram: 'RGB', storage: 'N/A', display: 'OLED' } },
    ...Array.from({length: 26}, (_, i) => ({
      id: 310 + i, title: `Build PC Tech v${i+1}`, description: 'Sistema pre-ensamblado de alto rendimiento.', price: 1200 + (i * 100), rating: 4.5 + (Math.random() / 2), stock: 3 + i, brand: 'Extreme-PC', category: 'pcs' as const, thumbnail: `https://images.unsplash.com/photo-1515940175183-6798529cc860?q=80&w=300&auto=format`, images: [], specs: { processor: 'Pro Config', ram: 'Fast RAM', storage: 'SSD Storage', display: 'ATX' }
    }))
  ];

  constructor() { }

  // REQUISITO: Peticiones asíncronas simuladas
  getHardware(): Observable<Hardware[]> {
    return of(this.hardwareList).pipe(delay(800));
  }

  // Filtrado por categoría para el navbar
  getHardwareByCategory(category: string): Observable<Hardware[]> {
    if (category === 'todos') return this.getHardware();
    const filtered = this.hardwareList.filter(item => item.category === category);
    return of(filtered).pipe(delay(500));
  }

  searchHardware(query: string): Observable<Hardware[]> {
    const q = query.toLowerCase();
    const filtered = this.hardwareList.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.brand.toLowerCase().includes(q)
    );
    return of(filtered).pipe(delay(500));
  }
}
