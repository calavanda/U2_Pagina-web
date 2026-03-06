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
  category: string;
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
  // REQUISITO: Lista de 30 productos locales para asegurar que la información CARGUE SIEMPRE
  private hardwareList: Hardware[] = [
    { id: 1, title: 'MacBook Pro M3', description: 'Laptop de alto rendimiento para profesionales.', price: 2499, rating: 4.9, stock: 15, brand: 'Apple', category: 'laptops', thumbnail: 'https://cdn.dummyjson.com/product-images/6/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/6/1.jpg'], specs: { processor: 'Apple M3 Pro', ram: '18GB', storage: '512GB SSD', display: '14" Liquid Retina XDR' } },
    { id: 2, title: 'Dell XPS 15', description: 'La mejor laptop con Windows para creadores.', price: 1899, rating: 4.7, stock: 8, brand: 'Dell', category: 'laptops', thumbnail: 'https://cdn.dummyjson.com/product-images/7/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/7/1.jpg'], specs: { processor: 'Intel Core i9-13900H', ram: '32GB DDR5', storage: '1TB SSD', display: '15.6" 4K OLED' } },
    { id: 3, title: 'ROG Zephyrus G14', description: 'Laptop gaming potente y compacta.', price: 1599, rating: 4.8, stock: 5, brand: 'ASUS', category: 'laptops', thumbnail: 'https://cdn.dummyjson.com/product-images/8/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/8/1.jpg'], specs: { processor: 'AMD Ryzen 9 7940HS', ram: '16GB DDR5', storage: '1TB SSD', display: '14" QHD 165Hz' } },
    { id: 4, title: 'NVIDIA RTX 4090', description: 'La tarjeta gráfica más potente del mercado.', price: 1699, rating: 5.0, stock: 3, brand: 'NVIDIA', category: 'componentes', thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/1/1.jpg'], specs: { processor: 'AD102 GPU', ram: '24GB G6X', storage: 'N/A', display: '8K Support' } },
    { id: 5, title: 'Intel Core i9-14900K', description: 'Procesador de escritorio de 24 núcleos.', price: 589, rating: 4.8, stock: 20, brand: 'Intel', category: 'componentes', thumbnail: 'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/2/1.jpg'], specs: { processor: '24 Núcleos / 32 Hilos', ram: 'DDR5/DDR4', storage: 'N/A', display: 'N/A' } },
    { id: 6, title: 'Ryzen 7 7800X3D', description: 'El mejor procesador para gaming.', price: 449, rating: 4.9, stock: 12, brand: 'AMD', category: 'componentes', thumbnail: 'https://cdn.dummyjson.com/product-images/3/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/3/1.jpg'], specs: { processor: '8 Núcleos 3D V-Cache', ram: 'DDR5 Only', storage: 'N/A', display: 'N/A' } },
    { id: 7, title: 'Samsung 990 Pro 2TB', description: 'SSD NVMe Gen4 ultra rápido.', price: 179, rating: 4.9, stock: 50, brand: 'Samsung', category: 'componentes', thumbnail: 'https://cdn.dummyjson.com/product-images/4/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/4/1.jpg'], specs: { processor: 'Controller Pascal', ram: '2GB LPDDR4', storage: '2TB NVMe SSD', display: 'N/A' } },
    { id: 8, title: 'Corsair Vengeance 32GB', description: 'Memoria RAM DDR5 de alto rendimiento.', price: 120, rating: 4.7, stock: 30, brand: 'Corsair', category: 'componentes', thumbnail: 'https://cdn.dummyjson.com/product-images/5/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/5/1.jpg'], specs: { processor: 'XMP 3.0', ram: '32GB (2x16GB)', storage: 'N/A', display: 'N/A' } },
    // Añadiendo más productos para llegar a los 30
    { id: 9, title: 'Surface Laptop 5', description: 'Elegante y potente para el día a día.', price: 999, rating: 4.5, stock: 10, brand: 'Microsoft', category: 'laptops', thumbnail: 'https://cdn.dummyjson.com/product-images/9/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/9/1.jpg'], specs: { processor: 'Intel Core i5', ram: '8GB', storage: '256GB SSD', display: '13.5" PixelSense' } },
    { id: 10, title: 'HP Spectre x360', description: 'Laptop 2-en-1 premium con pantalla OLED.', price: 1450, rating: 4.6, stock: 6, brand: 'HP', category: 'laptops', thumbnail: 'https://cdn.dummyjson.com/product-images/10/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/10/1.jpg'], specs: { processor: 'Intel Core i7', ram: '16GB', storage: '512GB SSD', display: '13.5" OLED Touch' } },
    { id: 11, title: 'Razer Blade 16', description: 'La laptop gaming definitiva.', price: 2999, rating: 4.8, stock: 4, brand: 'Razer', category: 'laptops', thumbnail: 'https://cdn.dummyjson.com/product-images/11/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/11/1.jpg'], specs: { processor: 'Intel i9-13950HX', ram: '32GB', storage: '1TB SSD', display: '16" Mini-LED' } },
    { id: 12, title: 'Lenovo Legion 5i', description: 'Equilibrio perfecto entre precio y potencia.', price: 1200, rating: 4.7, stock: 15, brand: 'Lenovo', category: 'laptops', thumbnail: 'https://cdn.dummyjson.com/product-images/12/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/12/1.jpg'], specs: { processor: 'Intel i7-13700H', ram: '16GB', storage: '512GB SSD', display: '15.6" WQHD 165Hz' } },
    { id: 13, title: 'ASUS Vivobook Pro', description: 'Ideal para diseño gráfico y edición.', price: 1100, rating: 4.4, stock: 12, brand: 'ASUS', category: 'laptops', thumbnail: 'https://cdn.dummyjson.com/product-images/13/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/13/1.jpg'], specs: { processor: 'Ryzen 7 5800H', ram: '16GB', storage: '1TB SSD', display: '15.6" OLED' } },
    { id: 14, title: 'MSI Katana 15', description: 'Laptop gaming accesible y rápida.', price: 950, rating: 4.3, stock: 20, brand: 'MSI', category: 'laptops', thumbnail: 'https://cdn.dummyjson.com/product-images/14/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/14/1.jpg'], specs: { processor: 'Intel i7-12650H', ram: '16GB', storage: '512GB SSD', display: '15.6" 144Hz' } },
    { id: 15, title: 'Alienware m18', description: 'Pantalla masiva y potencia extrema.', price: 3200, rating: 4.8, stock: 3, brand: 'Dell', category: 'laptops', thumbnail: 'https://cdn.dummyjson.com/product-images/15/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/15/1.jpg'], specs: { processor: 'RTX 4080 / i9', ram: '64GB', storage: '2TB SSD', display: '18" QHD+ 165Hz' } },
    { id: 16, title: 'Acer Predator Helios', description: 'Refrigeración avanzada para gaming.', price: 1700, rating: 4.5, stock: 8, brand: 'Acer', category: 'laptops', thumbnail: 'https://cdn.dummyjson.com/product-images/16/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/16/1.jpg'], specs: { processor: 'Intel i7-13700HX', ram: '16GB', storage: '1TB SSD', display: '16" 240Hz' } },
    { id: 17, title: 'EVGA SuperNOVA 850G', description: 'Fuente de poder 80+ Gold fiable.', price: 140, rating: 4.9, stock: 25, brand: 'EVGA', category: 'componentes', thumbnail: 'https://cdn.dummyjson.com/product-images/17/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/17/1.jpg'], specs: { processor: 'N/A', ram: 'N/A', storage: 'N/A', display: 'Totalmente Modular' } },
    { id: 18, title: 'NZXT H5 Flow', description: 'Gabinete con flujo de aire optimizado.', price: 95, rating: 4.8, stock: 18, brand: 'NZXT', category: 'componentes', thumbnail: 'https://cdn.dummyjson.com/product-images/18/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/18/1.jpg'], specs: { processor: 'Compact ATX', ram: 'N/A', storage: 'N/A', display: 'Cristal Templado' } },
    { id: 19, title: 'Logitech G502X', description: 'El mouse gaming más icónico.', price: 140, rating: 4.9, stock: 40, brand: 'Logitech', category: 'perifericos', thumbnail: 'https://cdn.dummyjson.com/product-images/19/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/19/1.jpg'], specs: { processor: 'HERO 25K Sensor', ram: 'N/A', storage: 'N/A', display: 'N/A' } },
    { id: 20, title: 'SteelSeries Apex Pro', description: 'Teclado mecánico ultra rápido.', price: 199, rating: 4.8, stock: 12, brand: 'SteelSeries', category: 'perifericos', thumbnail: 'https://cdn.dummyjson.com/product-images/20/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/20/1.jpg'], specs: { processor: 'OmniPoint Switches', ram: 'N/A', storage: 'N/A', display: 'OLED Smart Display' } },
    { id: 21, title: 'RTX 4070 SUPER', description: 'Excelente balance precio/rendimiento.', price: 599, rating: 4.8, stock: 10, brand: 'ASUS', category: 'componentes', thumbnail: 'https://cdn.dummyjson.com/product-images/21/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/21/1.jpg'], specs: { processor: 'AD104 GPU', ram: '12GB G6X', storage: 'N/A', display: '1440p King' } },
    { id: 22, title: 'Western Digital Black 4TB', description: 'Disco duro robusto para almacenamiento.', price: 150, rating: 4.6, stock: 30, brand: 'WD', category: 'componentes', thumbnail: 'https://cdn.dummyjson.com/product-images/22/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/22/1.jpg'], specs: { processor: '7200 RPM', ram: '256MB Cache', storage: '4TB HDD', display: 'N/A' } },
    { id: 23, title: 'Gigabyte B650 AORUS', description: 'Tarjeta madre AM5 para Ryzen 7000.', price: 230, rating: 4.7, stock: 14, brand: 'Gigabyte', category: 'componentes', thumbnail: 'https://cdn.dummyjson.com/product-images/23/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/23/1.jpg'], specs: { processor: 'Socket AM5', ram: 'DDR5 Support', storage: 'N/A', display: 'N/A' } },
    { id: 24, title: 'Cooler Master Hyper 212', description: 'Enfriador de aire clásico y efectivo.', price: 45, rating: 4.5, stock: 45, brand: 'Cooler Master', category: 'componentes', thumbnail: 'https://cdn.dummyjson.com/product-images/24/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/24/1.jpg'], specs: { processor: 'Air Cooler', ram: 'N/A', storage: 'N/A', display: 'N/A' } },
    { id: 25, title: 'PC Desktop Gamer Pro', description: 'PC armada lista para todo.', price: 1800, rating: 4.9, stock: 5, brand: 'Custom Tech', category: 'pcs', thumbnail: 'https://cdn.dummyjson.com/product-images/25/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/25/1.jpg'], specs: { processor: 'Intel i7 + RTX 4070', ram: '32GB', storage: '1TB NVMe', display: 'N/A' } },
    { id: 26, title: 'Workstation Extreme', description: 'Para renderizado y edición pesada.', price: 3500, rating: 5.0, stock: 2, brand: 'Custom Tech', category: 'pcs', thumbnail: 'https://cdn.dummyjson.com/product-images/26/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/26/1.jpg'], specs: { processor: 'Threadripper 3960X', ram: '128GB', storage: '4TB SSD RAID', display: 'N/A' } },
    { id: 27, title: 'Compact Mini PC', description: 'Potencia i5 en formato pequeño.', price: 650, rating: 4.4, stock: 15, brand: 'Tech-S', category: 'pcs', thumbnail: 'https://cdn.dummyjson.com/product-images/27/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/27/1.jpg'], specs: { processor: 'Intel i5-12400', ram: '16GB', storage: '512GB SSD', display: 'N/A' } },
    { id: 28, title: 'Mac Studio M2 Ultra', description: 'La cumbre del rendimiento Mac.', price: 3999, rating: 5.0, stock: 3, brand: 'Apple', category: 'pcs', thumbnail: 'https://cdn.dummyjson.com/product-images/28/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/28/1.jpg'], specs: { processor: 'Apple M2 Ultra', ram: '64GB Unified', storage: '1TB SSD', display: 'N/A' } },
    { id: 29, title: 'Corsair RM1000x', description: 'Fuente 1000W 80+ Gold silenciosa.', price: 190, rating: 4.9, stock: 12, brand: 'Corsair', category: 'componentes', thumbnail: 'https://cdn.dummyjson.com/product-images/29/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/29/1.jpg'], specs: { processor: 'N/A', ram: 'N/A', storage: 'N/A', display: 'Modular' } },
    { id: 30, title: 'Thermaltake Core P3', description: 'Gabinete abierto para mostrar tu hardware.', price: 160, rating: 4.7, stock: 10, brand: 'Thermaltake', category: 'componentes', thumbnail: 'https://cdn.dummyjson.com/product-images/30/thumbnail.jpg', images: ['https://cdn.dummyjson.com/product-images/30/1.jpg'], specs: { processor: 'N/A', ram: 'N/A', storage: 'N/A', display: 'Open Frame' } }
  ];

  constructor() { }

  // REQUISITO: Peticiones asíncronas - Simulación de carga mediante Observable y delay
  getHardware(): Observable<Hardware[]> {
    console.log('Cargando catálogo local de 30 productos...');
    return of(this.hardwareList).pipe(
      delay(800) // REQUISITO: Simula tiempo de respuesta de red
    );
  }

  // REQUISITO: Eventos y Peticiones Asíncronas - Búsqueda en la lista local
  searchHardware(query: string): Observable<Hardware[]> {
    console.log(`Buscando localmente: ${query}`);
    const filtered = this.hardwareList.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.brand.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(500));
  }
}
