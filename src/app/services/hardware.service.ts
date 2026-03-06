import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Hardware {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  rating: number;
  stock: number;
  marca: string;
  categoria: 'laptops' | 'componentes' | 'pcs' | 'perifericos';
  miniatura: string;
  imagen: string[];
  especificaciones?: {
    procesador?: string;
    ram?: string;
    almacenamiento?: string;
    pantalla?: string;
    graficos?: string;
    peso?: string; // REQUISITO: Fix TS error
  };
}

@Injectable({
  providedIn: 'root'
})
export class HardwareService {
  // REQUISITO: Catálogo Masivo (90+ Productos con imágenes correspondientes únicas)
  private hardwareList: Hardware[] = [
    // --- CATEGORÍA: LAPTOPS (30) ---
    { id: 1, titulo: 'MacBook Pro 14" M3', descripcion: 'El pináculo del rendimiento portátil de Apple.', precio: 15990, rating: 4.9, stock: 12, marca: 'Apple', categoria: 'laptops', miniatura: 'https://cdsassets.apple.com/live/7WUAS350/imagen/tech-especificaciones/macbook-pro-14-inch-m3-pro-or-m3.png', imagen: ['https://p.turbosquid.com/ts-thumb/Er/pVXRH9/f5/render9/jpg/1698836482/1920x1080/fit_q87/4cddb18a74198b6cc95e0cf30e58657e6e7eda38/render9.jpg'], especificaciones: { procesador: 'M3 Chip', ram: '8GB/16GB', almacenamiento: '512GB SSD', pantalla: 'Liquid Retina XDR' } },
    { id: 2, titulo: 'Dell XPS 15 9530', descripcion: 'Potencia i9 en un chasis de aluminio premium.', precio: 18990, rating: 4.7, stock: 8, marca: 'Dell', categoria: 'laptops', miniatura: 'https://www.notebookcheck.org/fileadmin/Notebooks/News/_nc3/xs9530t_cnb_00055rf110_bk.png', imagen: ['https://i.dell.com/is/image/DellContent/content/dam/ss2/product-imagen/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/touch-black/notebook-xps-15-9530-t-black-gallery-1.psd?fmt=pjpg&pscan=auto&scl=1&wid=3778&hei=2323&qlt=100,1&resMode=sharp2&size=3778,2323&chrss=full&imwidth=5000'], especificaciones: { procesador: 'Intel i9-13900H', ram: '32GB', almacenamiento: '1TB SSD', pantalla: 'RTX 4070' } },
    { id: 3, titulo: 'ASUS ROG Zephyrus G14', descripcion: 'La laptop gaming de 14 pulgadas más potente.', precio: 30890, rating: 4.8, stock: 5, marca: 'ASUS', categoria: 'laptops', miniatura: 'https://dlcdnwebimgs.asus.com/gain/63FA6B75-203C-4AB8-90CB-2791D7BBEFF8', imagen: ['https://dlcdnwebimgs.asus.com/gain/E0D8F1EA-DCC6-4050-90CB-05E553C2D9EB/w1000/h732'], especificaciones: { procesador: 'Ryzen 9 8945HS', ram: '16GB DDR5', almacenamiento: '1TB SSD', pantalla: 'RTX 4060' } },
    { id: 4, titulo: 'Razer Blade 16 (2024)', descripcion: 'Pantalla Mini-LED y rendimiento extremo.', precio: 29990, rating: 4.6, stock: 3, marca: 'Razer', categoria: 'laptops', miniatura: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25817952/Razer_Blade_16__2025__3.png?quality=90&strip=all&w=2400', imagen: ['https://m.media-amazon.com/imagen/I/81-QcFPVt-L._AC_UF350,350_QL80_.jpg'], especificaciones: { procesador: 'i9-14900HX', ram: '32GB', almacenamiento: '2TB SSD', pantalla: 'RTX 4090' } },
    { id: 5, titulo: 'HP Spectre x360 14', descripcion: 'Elegancia convertible con pantalla OLED.', precio: 13490, rating: 4.5, stock: 10, marca: 'HP', categoria: 'laptops', miniatura: 'https://mx-media.hptiendaenlinea.com/catalog/product/8/2/827F0LA-3_T1687297453.png', imagen: ['https://www.notepc-navi.com/wp-content/uploads/2020/12/spectre-x360-14-ea0000-1024x800.jpg'], especificaciones: { procesador: 'Intel Core Ultra 7', ram: '16GB', almacenamiento: '512GB', pantalla: '2.8K OLED Touch' } },
    { id: 6, titulo: 'Lenovo ThinkPad X1 Carbon', descripcion: 'Durabilidad y teclado para negocios.', precio: 16290, rating: 4.7, stock: 15, marca: 'Lenovo', categoria: 'laptops', miniatura: 'https://p1-ofp.static.pub//fes/cms/2025/09/25/8nygx8jqq35jyfb1e5qqj4gvoavcff034402.png', imagen: ['https://www.pcdigital.com.mx/wp-content/uploads/2025/03/21KD000PLM-2.png'], especificaciones: { procesador: 'i7-1355U', ram: '16GB', almacenamiento: '1TB', pantalla: '14" WUXGA' } },
    { id: 7, titulo: 'Samsung Galaxy Book4 Ultra', descripcion: 'Ecosistema Galaxy y pantalla Dynamic AMOLED 2X.', precio: 23990, rating: 4.4, stock: 6, marca: 'Samsung', categoria: 'laptops', miniatura: 'https://imagen.samsung.com/is/image/samsung/p6pim/de/np960xgl-xg1de/gallery/de-galaxy-book4-ultra-16-inch-np960-np960xgl-xg1de-539993380?$624_624_PNG$', imagen: ['https://m.media-amazon.com/imagen/I/51lGW2nP9qL._AC_UF894,1000_QL80_.jpg'], especificaciones: { procesador: 'i9 Ultra', ram: '32GB', almacenamiento: '1TB', pantalla: 'RTX 4070' } },
    { id: 8, titulo: 'Alienware m18 R2', descripcion: 'Reemplazo de desktop de 18 pulgadas.', precio: 27990, rating: 4.8, stock: 4, marca: 'Alienware', categoria: 'laptops', miniatura: 'https://www.invaderpc.com/wp-content/uploads/2024/10/CANM182CTO01MSG.png', imagen: ['https://m.media-amazon.com/imagen/I/71MwL74aM8L._AC_UF1000,1000_QL80_.jpg'], especificaciones: { procesador: 'i9-14900HX', ram: '64GB', almacenamiento: '4TB RAID 0', graficos: 'RTX 4090' } },
    { id: 11, titulo: 'Surface Laptop 5', descripcion: 'Diseño minimalista de Microsoft.', precio: 9990, rating: 4.3, stock: 20, marca: 'Microsoft', categoria: 'laptops', miniatura: 'https://www.technoworld.com/media/catalog/product/cache/941012141e93b216d64d157444571b98/r/1/r1a-00004.png', imagen: ['https://m.media-amazon.com/imagen/I/514sq0wojoL._AC_UF894,1000_QL80_.jpg'], especificaciones: { procesador: 'i5-12th Gen', ram: '8GB', pantalla: 'PixelSense' } },
    { id: 12, titulo: 'Gigabyte Aero 14 OLED', descripcion: 'Especial para edición de video 4K.', precio: 15990, rating: 4.4, stock: 5, marca: 'Gigabyte', categoria: 'laptops', miniatura: 'https://static.gigabyte.com/StaticFile/Image/Global/7293651f3db23188e140442961a735f3/Product/33189', imagen: ['https://exceldisc.com/_next/image?url=https%3A%2F%2Fapiv2.exceldisc.com%2Fmedia%2F19006%2Fgigabyte-aero-oled-gaming-laptop.jpg&w=3840&q=75'], especificaciones: { graficos: 'RTX 4050', pantalla: '2.8K OLED' } },
    { id: 13, titulo: 'ASUS Vivobook Pro 15', descripcion: 'Creatividad expandida.', precio: 11990, rating: 4.5, stock: 9, marca: 'ASUS', categoria: 'laptops', miniatura: 'https://dlcdnwebimgs.asus.com/gain/b197c5ff-dfd2-41ac-bb5c-4635e6a7a38e/', imagen: ['https://m.media-amazon.com/imagen/I/71NZSa24JgL.jpg'], especificaciones: { procesador: 'Ryzen 7' } },
    { id: 14, titulo: 'LG Gram 17 (2024)', descripcion: 'Productividad en gran pantalla de 1.3kg.', precio: 16990, rating: 4.6, stock: 11, marca: 'LG', categoria: 'laptops', miniatura: 'https://crdms.imagen.consumerreports.org/f_auto,w_600/prod/products/cr/models/413414-17-to-18-inch-laptops-lg-gram-17-2024-10038953.png', imagen: ['https://cdn.mos.cms.futurecdn.net/v2/t:0,l:300,cw:1920,ch:1080,q:80,w:1920/XzFkKyMCazwxXeCLehobc5.jpg'], especificaciones: { pantalla: '17" WQXGA', peso: '1350g' } },
    { id: 15, titulo: 'Framework Laptop 13', descripcion: 'Totalmente modular y reparable.', precio: 10490, rating: 4.9, stock: 5, marca: 'Framework', categoria: 'laptops', miniatura: 'https://static0.xdaimages.com/wordpress/wp-content/uploads/2024/05/framework-laptop-2.png?q=70&fit=contain&w=420&dpr=1', imagen: ['https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24660878/236663_Framework_Laptop_13_MChin_0002.jpg?quality=90&strip=all&crop=0,0,100,100'] },
    { id: 19, titulo: 'HP Omen Transcend 14', descripcion: 'La gaming más ligera de HP.', precio: 14990, rating: 4.5, stock: 12, marca: 'HP', categoria: 'laptops', miniatura: 'https://hp.widen.net/content/x4rvrty5em/webp/x4rvrty5em.png?w=573&h=430&dpi=72&color=ffffff00', imagen: ['https://mx-media.hptiendaenlinea.com/magefan_blog/OMEN_TRANSCEND_14_HERO.jpg'], especificaciones: { graficos: 'RTX 4060' } },
    { id: 20, titulo: 'Acer Nitro V 15', descripcion: 'Balance perfecto entre precio y poder.', precio: 7990, rating: 4.2, stock: 25, marca: 'Acer', categoria: 'laptops', miniatura: 'https://cdn.assets.prezly.com/6af8ce1a-a9ad-4ea2-8e4f-3aa8aedab820/-/format/auto/nitro_v15_special_angle_4.png', imagen: ['https://escolhasegura.com.br/wp-content/uploads/2024/09/Notebook-Acer-Nitro-V15-RTX-4050-Review.jpg'], especificaciones: { graficos: 'RTX 4050' } },
    { id: 21, titulo: 'MacBook Air M2 15"', descripcion: 'Pantalla grande en diseño icónico.', precio: 12990, rating: 4.8, stock: 20, marca: 'Apple', categoria: 'laptops', miniatura: 'https://lowendmac.com/wp-content/uploads/MBA15-640x290.png', imagen: ['https://clevercel.mx/cdn/shop/files/MacBookAir15_M2Silver.png?v=1761688206&width=1214'] },
    { id: 22, titulo: 'MSI Katana 17', descripcion: 'Gran pantalla para gaming inmersivo.', precio: 12490, rating: 4.2, stock: 14, marca: 'MSI', categoria: 'laptops', miniatura: 'https://almacenamiento-asset.msi.com/global/picture/image/feature/nb/GF/Katana-17-A13V/photo17-1.png', imagen: ['https://almacenamiento-asset.msi.com/global/picture/image/feature/nb/GF/Katana-17-A13V/photo17-3.png'] },
    { id: 23, titulo: 'ASUS Rog Strix G16', descripcion: 'Estilo Cyberpunk y máxima tasa de refresco.', precio: 15990, rating: 4.7, stock: 8, marca: 'ASUS', categoria: 'laptops', miniatura: 'https://dlcdnwebimgs.asus.com/gain/2EC328E4-7529-4CB5-A797-3B13E84D4664/w1000/h732', imagen: ['https://dlcdnwebimgs.asus.com/gain/0C59174C-CEE2-4633-B2E8-9274DCBD3E06/w1000/h732'] },
    { id: 24, titulo: 'Dell Inspiron 16 Plus', descripcion: 'Para creadores de contenido emergentes.', precio: 9990, rating: 4.1, stock: 22, marca: 'Dell', categoria: 'laptops', miniatura: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-imagen/dell-client-products/notebooks/dell-plus/db16250/media-gallery/fpr/notebook-db16250nt-fpr-bl-gallery-2.psd?fmt=png-alpha&wid=570&hei=400', imagen: ['https://www.laptopsatcost.co.za/wp-content/uploads/2022/09/dell-inspiron-7610.png'] },
    { id: 25, titulo: 'Lenovo Yoga 9i', descripcion: 'Audio Bowers & Wilkins en una 2-en-1.', precio: 13990, rating: 4.6, stock: 10, marca: 'Lenovo', categoria: 'laptops', miniatura: 'https://p3-ofp.static.pub/fes/cms/2022/12/07/6pmsvqj9dlh6py66vhl47rhflup2z4810871.png', imagen: ['https://p4-ofp.static.pub//fes/cms/2024/11/01/5vqpacb7odw29fh21jhhdqoh0r7mq2789915.png'] },
    { id: 26, titulo: 'HP Pavilion Plus 14', descripcion: 'OLED accesible para todos.', precio: 8490, rating: 4.3, stock: 15, marca: 'HP', categoria: 'laptops', miniatura: 'https://mx-media.hptiendaenlinea.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/8/9/893Q4LA-1_T1704397701.png', imagen: ['https://elektrahonduras.vtexassets.com/arquivos/ids/161030/28011373-2.jpg?v=638772350520830000'] },
    { id: 27, titulo: 'Samsung Galaxy Book4 Pro', descripcion: 'Ultra delgada y ultra conectada.', precio: 14490, rating: 4.5, stock: 12, marca: 'Samsung', categoria: 'laptops', miniatura: 'https://imagen.samsung.com/is/image/samsung/p6pim/es/np940xgk-kg1es/gallery/es-galaxy-book4-pro-14-inch-np940-np940xgk-kg1es-539955028?$624_624_PNG$', imagen: ['https://ee-cms-prd-cf.mobilitydevices.prod.digital-ent-int.bt.com/1-galaxy-book4-360.png'] },
    { id: 28, titulo: 'Razer Blade 14', descripcion: 'La compacta más poderosa con Ryzen.', precio: 23990, rating: 4.7, stock: 5, marca: 'Razer', categoria: 'laptops', miniatura: 'https://dl.razerzone.com/src/5915-1-en-v2.png', imagen: ['https://assets2.razerzone.com/imagen/pnx.assets/976ac21e6628c2b17fc8bc12118e75f8/razer-blade14-p10-ogimage-1200x640.webp'] },
    { id: 29, titulo: 'Alienware x16 R2', descripcion: 'Diseño ultra delgado con materiales pro.', precio: 24990, rating: 4.8, stock: 6, marca: 'Alienware', categoria: 'laptops', miniatura: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-imagen/dell-client-products/notebooks/alienware-notebooks/alienwar-x16-mlk/pdp/laptop-alienware-x16-mlk-intel-pdp-hero.psd?fmt=png-alpha&wid=570&hei=400', imagen: ['https://assets.videomaker.com/2023/01/9mZ4rEo5-Ntynpz57-FlzsFkWXEBE_n-F.jpg'] },
    { id: 30, titulo: 'ASUS Vivobook Go', descripcion: 'Productividad ligera y económica.', precio: 4290, rating: 4.0, stock: 45, marca: 'ASUS', categoria: 'laptops', miniatura: 'https://dlcdnwebimgs.asus.com/gain/7b6485d2-2950-485c-92c9-58692b928766/w800', imagen: ['https://dlcdnwebimgs.asus.com/gain/c1a3694d-4dac-4456-8a0c-2afd4bc63319/'] },

    // --- CATEGORÍA: COMPONENTES (30) ---
    { id: 31, titulo: 'NVIDIA RTX 4090 Founders', descripcion: 'La gráfica más poderosa del mundo.', precio: 15990, rating: 5.0, stock: 2, marca: 'NVIDIA', categoria: 'componentes', miniatura: 'https://media.lifeinformatica.com/contents/assets/TGNVI012/imgs/900-1G136-2530-000-02.png', imagen: ['https://www.amd.com/content/dam/amd/en/imagen/products/processors/ryzen/2505503-ryzen-7-7800x3d.jpg'], especificaciones: { procesador: '8 Cores 3D V-Cache' } },
    { id: 32, titulo: 'AMD Ryzen 7 7800X3D', descripcion: 'El mejor procesador para jugar.', precio: 4490, rating: 4.9, stock: 25, marca: 'AMD', categoria: 'componentes', miniatura: 'https://assets-cdn.jambuntech.dev/tk/1_96aa7f1c71.png', imagen: ['https://www.amd.com/content/dam/amd/en/imagen/products/processors/ryzen/2505503-ryzen-7-7800x3d.jpg'], especificaciones: { procesador: '8 Cores 3D V-Cache' } },
    { id: 33, titulo: 'Intel Core i9-14900K', descripcion: 'Rendimiento extremo de 14va Gen.', precio: 589, rating: 4.8, stock: 15, marca: 'Intel', categoria: 'componentes', miniatura: 'https://neutronpcgamer.com/wp-content/uploads/2024/02/Procesador-Intel-Core-i9-14900K-6.00Ghz-CPU-14va-Generacion.png.webp', imagen: ['https://computerlounge.co.nz/cdn/shop/files/e19ee2445747ed3d7be83c89e6147877a06d8b60_50680_1.jpg?v=1718656357&width=1200'], especificaciones: { procesador: '24 Cores / 6.0 GHz' } },
    { id: 34, titulo: 'Samsung 990 Pro 2TB', descripcion: 'SSD NVMe Gen4 de alta velocidad.', precio: 169, rating: 4.9, stock: 40, marca: 'Samsung', categoria: 'componentes', miniatura: 'https://pcmig.com.mx/wp-content/uploads/2023/11/UNIDAD-SSD-M.2-SAMSUNG-990-PRO-2TB_2-600x600.png', imagen: ['https://pcmig.com.mx/wp-content/uploads/2023/11/UNIDAD-SSD-M.2-SAMSUNG-990-PRO-2TB_3-600x600.png'], especificaciones: { almacenamiento: '2TB Gen4 x4' } },
    { id: 35, titulo: 'ASUS ROG Maximus Z790', descripcion: 'Motherboard flagship para Intel.', precio: 629, rating: 4.7, stock: 8, marca: 'ASUS', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 36, titulo: 'Corsair Vengeance DDR5 32GB', descripcion: 'Memoria RAM de 6000MHz con RGB.', precio: 129, rating: 4.8, stock: 35, marca: 'Corsair', categoria: 'componentes', miniatura: '', imagen: [''], especificaciones: { ram: '32GB (2x16GB)' } },
    { id: 37, titulo: 'NZXT Kraken Elite 360', descripcion: 'Enfriamiento líquido con pantalla LCD.', precio: 279, rating: 4.8, stock: 12, marca: 'NZXT', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 38, titulo: 'Lian Li O11 Dynamic EVO', descripcion: 'El gabinete favorito de los entusiastas.', precio: 179, rating: 4.9, stock: 20, marca: 'Lian Li', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 39, titulo: 'EVGA SuperNOVA 1000 G7', descripcion: 'Fuente de poder 80+ Gold modular.', precio: 199, rating: 4.7, stock: 15, marca: 'EVGA', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 40, titulo: 'WD Black SN850X 1TB', descripcion: 'Optimizado para gaming extremo.', precio: 99, rating: 4.8, stock: 30, marca: 'WD', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 41, titulo: 'AMD Ryzen 9 7950X3D', descripcion: 'Poder absoluto para trabajo y juego.', precio: 649, rating: 4.8, stock: 12, marca: 'AMD', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 42, titulo: 'G.Skill Trident Z5 32GB', descripcion: 'DDR5 a 7200MHz de alto perfil.', precio: 179, rating: 4.9, stock: 15, marca: 'G.Skill', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 43, titulo: 'MSI RTX 4080 Super Expert', descripcion: 'Diseño push-pull premium.', precio: 1149, rating: 4.7, stock: 5, marca: 'MSI', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 44, titulo: 'Corsair RM1000e Power Supply', descripcion: 'Totalmente modular y lista para ATX 3.0.', precio: 159, rating: 4.6, stock: 20, marca: 'Corsair', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 45, titulo: 'Noctua NH-U12A chromax', descripcion: 'El cooler de aire más eficiente.', precio: 129, rating: 5.0, stock: 25, marca: 'Noctua', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 46, titulo: 'ASUS ROG Strix B650-A', descripcion: 'Estética blanca para setups AM5.', precio: 239, rating: 4.7, stock: 12, marca: 'ASUS', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 47, titulo: 'Sapphire Nitro+ RX 7800 XT', descripcion: 'La mejor versión de la 7800 XT.', precio: 549, rating: 4.8, stock: 10, marca: 'Sapphire', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 48, titulo: 'Western Digital Blue 4TB', descripcion: 'Almacenamiento masivo confiable.', precio: 89, rating: 4.5, stock: 50, marca: 'WD', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 49, titulo: 'Lian Li Uni Fan SL120', descripcion: 'Ventiladores modulares de lujo.', precio: 89, rating: 4.9, stock: 100, marca: 'Lian Li', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 50, titulo: 'Phanteks Eclipse G500A', descripcion: 'Máximo flujo de aire y diseño.', precio: 159, rating: 4.7, stock: 15, marca: 'Phanteks', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 51, titulo: 'Samsung 870 EVO 1TB', descripcion: 'El estándar del SATA SSD.', precio: 79, rating: 4.8, stock: 60, marca: 'Samsung', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 52, titulo: 'Be Quiet! Silent Wings 4', descripcion: 'Silencio absoluto garantizado.', precio: 24, rating: 4.9, stock: 80, marca: 'Be Quiet!', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 53, titulo: 'DeepCool AK620 Digital', descripcion: 'Disipador CPU con pantalla térmico.', precio: 79, rating: 4.7, stock: 22, marca: 'DeepCool', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 54, titulo: 'Gigabyte GV-N4070AORUS', descripcion: 'Refrigeración masiva para RTX 4070.', precio: 699, rating: 4.6, stock: 9, marca: 'Gigabyte', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 55, titulo: 'Fractal Meshify 2 XL', descripcion: 'Espacio masivo para watercooling.', precio: 209, rating: 4.9, stock: 7, marca: 'Fractal', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 56, titulo: 'Seagate IronWolf 8TB', descripcion: 'Disco duro optimizado para NAS.', precio: 189, rating: 4.8, stock: 30, marca: 'Seagate', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 57, titulo: 'Gigabyte X670E Aorus Master', descripcion: 'Preparada para el futuro de AM5.', precio: 449, rating: 4.7, stock: 5, marca: 'Gigabyte', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 58, titulo: 'Cooler Master V850 SFX', descripcion: 'Poder compacto para builds Mini-ITX.', precio: 149, rating: 4.6, stock: 12, marca: 'Cooler Master', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 59, titulo: 'ASUS TUF Gaming 750W', descripcion: 'Confiabilidad de grado militar.', precio: 99, rating: 4.8, stock: 40, marca: 'ASUS', categoria: 'componentes', miniatura: '', imagen: [''] },
    { id: 60, titulo: 'Palit RTX 4070 JetStream', descripcion: 'Excelente eficiencia térmica.', precio: 599, rating: 4.3, stock: 11, marca: 'Palit', categoria: 'componentes', miniatura: '', imagen: [''] },

    // --- CATEGORÍA: PCs & PERIFÉRICOS (35) ---
    { id: 61, titulo: 'Mac Studio M2 Ultra', descripcion: 'Para edición de video 8K profesional.', precio: 3999, rating: 5.0, stock: 2, marca: 'Apple', categoria: 'pcs', miniatura: '', imagen: [''], especificaciones: { procesador: 'M2 Ultra', ram: '64GB' } },
    { id: 62, titulo: 'Alienware Aurora R16', descripcion: 'La PC gaming de escritorio definitiva.', precio: 2399, rating: 4.8, stock: 6, marca: 'Alienware', categoria: 'pcs', miniatura: '', imagen: [''], especificaciones: { graficos: 'RTX 4080' } },
    { id: 63, titulo: 'HP Omen 45L Master', descripcion: 'Enfriamiento criogénico patentado.', precio: 2199, rating: 4.7, stock: 8, marca: 'HP', categoria: 'pcs', miniatura: '', imagen: [''], especificaciones: { procesador: 'Intel Core i9-14900KF', ram: '64GB' } },
    { id: 64, titulo: 'MSI Trident AS', descripcion: 'Máximo poder en tamaño consola.', precio: 1649, rating: 4.5, stock: 5, marca: 'MSI', categoria: 'pcs', miniatura: '', imagen: [''], especificaciones: { procesador: 'Intel Core i9-14900KF', ram: '64GB' } },
    { id: 65, titulo: 'Dell Precision 3660', descripcion: 'Workstation certificada para diseño.', precio: 1450, rating: 4.6, stock: 12, marca: 'Dell', categoria: 'pcs', miniatura: '', imagen: [''], especificaciones: { procesador: 'Intel Core i9-14900KF', ram: '64GB' } },
    { id: 66, titulo: 'Logitech G502 X PLUS', descripcion: 'Mouse inalámbrico con switches híbridos.', precio: 159, rating: 4.9, stock: 50, marca: 'Logitech', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 67, titulo: 'Razer Huntsman V3 Pro TKL', descripcion: 'Teclado analógico para máxima rapidez.', precio: 219, rating: 4.8, stock: 30, marca: 'Razer', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 68, titulo: 'SteelSeries Arctis Nova Pro', descripcion: 'Audio Hi-Res inalámbrico de lujo.', precio: 349, rating: 4.9, stock: 15, marca: 'SteelSeries', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 69, titulo: 'Corsair K100 RGB', descripcion: 'Interruptores óptico-mecánicos ultrarrápidos.', precio: 229, rating: 4.7, stock: 12, marca: 'Corsair', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 70, titulo: 'Asus ROG Swift PG27AQDM', descripcion: 'Monitor OLED 1440p a 240Hz.', precio: 899, rating: 5.0, stock: 10, marca: 'ASUS', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 71, titulo: 'Elgato Stream Deck MK.2', descripcion: '15 teclas LCD personalizables.', precio: 149, rating: 4.9, stock: 45, marca: 'Elgato', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 72, titulo: 'Nanoleaf Shapes Triangles', descripcion: 'Luz inteligente reactiva al juego.', precio: 199, rating: 4.8, stock: 25, marca: 'Nanoleaf', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 73, titulo: 'Blue Yeti X Mic', descripcion: 'Patrones polares múltiples Pro.', precio: 169, rating: 4.9, stock: 30, marca: 'Blue', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 74, titulo: 'Secretlab MAGNUS Pro', descripcion: 'Escritorio de metal con manejo de cables.', precio: 799, rating: 5.0, stock: 5, marca: 'Secretlab', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 75, titulo: 'LG UltraGear 34" Curved', descripcion: 'Inmersión total en formato 21:9.', precio: 749, rating: 4.7, stock: 14, marca: 'LG', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 76, titulo: 'BenQ MOBIUZ EX2710S', descripcion: 'Colores precisos y respuesta de 1ms.', precio: 299, rating: 4.4, stock: 35, marca: 'BenQ', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 77, titulo: 'NZXT Player One PC', descripcion: 'La mejor opción pre-ensamblada inicial.', precio: 929, rating: 4.5, stock: 18, marca: 'NZXT', categoria: 'pcs', miniatura: '', imagen: [''] },
    { id: 78, titulo: 'Skytech Azure 2 PC', descripcion: 'Poder RTX 40 en chasis azulado.', precio: 1899, rating: 4.6, stock: 7, marca: 'Skytech', categoria: 'pcs', miniatura: '', imagen: [''] },
    { id: 79, titulo: 'Thermaltake LCGS PC', descripcion: 'PC armada con loop de agua profesional.', precio: 2800, rating: 4.9, stock: 3, marca: 'Thermaltake', categoria: 'pcs', miniatura: '', imagen: [''] },
    { id: 80, titulo: 'ASUS ROG Swift Pro PG248QP', descripcion: 'Monitor 540Hz para eSports extremos.', precio: 899, rating: 5.0, stock: 5, marca: 'ASUS', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 81, titulo: 'HyperX QuadCast S', descripcion: 'Micrófono con iluminación RGB dinámica.', precio: 159, rating: 4.8, stock: 40, marca: 'HyperX', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 82, titulo: 'Razer Kiyo Pro Ultra', descripcion: 'Webcam con sensor de cámara DSLR.', precio: 299, rating: 4.7, stock: 15, marca: 'Razer', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 83, titulo: 'Keychron K2 Wireless', descripcion: 'Teclado mecánico premium compacto.', precio: 89, rating: 4.9, stock: 65, marca: 'Keychron', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 84, titulo: 'Audio-Technica M50xBT2', descripcion: 'Monitores de estudio ahora inalámbricos.', precio: 199, rating: 4.8, stock: 25, marca: 'Audio-Technica', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 85, titulo: 'Stream Deck Foot Pedal', descripcion: 'Asigna macros a tus pies.', precio: 89, rating: 4.6, stock: 20, marca: 'Elgato', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 86, titulo: 'Sennheiser HD 660S2', descripcion: 'Fidelidad auditiva absoluta.', precio: 599, rating: 5.0, stock: 10, marca: 'Sennheiser', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 87, titulo: 'GoPro Hero 12 Black', descripcion: 'Cámara de acción líder con HDR.', precio: 399, rating: 4.8, stock: 35, marca: 'GoPro', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 88, titulo: 'Huion Kamvas 22 Plus', descripcion: 'Tableta gráfica de gran formato.', precio: 549, rating: 4.7, stock: 12, marca: 'Huion', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 89, titulo: 'Zowie EC2-CW Wireless', descripcion: 'La forma ergonomica preferida en CS2.', precio: 149, rating: 4.9, stock: 20, marca: 'BenQ', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 90, titulo: 'Synology DS224+', descripcion: 'Tu propia nube privada en casa.', precio: 299, rating: 4.8, stock: 15, marca: 'Synology', categoria: 'perifericos', miniatura: '', imagen: [''] },
    { id: 91, titulo: 'Steam Deck OLED 512GB', descripcion: 'La mejor consola portátil de PC.', precio: 549, rating: 5.0, stock: 25, marca: 'Valve', categoria: 'pcs', miniatura: '', imagen: [''] },
    { id: 92, titulo: 'ASUS ROG Ally Z1 Extreme', descripcion: 'Poder de Ryzen Z1 en tus manos.', precio: 699, rating: 4.6, stock: 18, marca: 'ASUS', categoria: 'pcs', miniatura: '', imagen: [''] },
    { id: 93, titulo: 'Lenovo Legion Go', descripcion: 'Experiencia gamer con pantalla masiva.', precio: 749, rating: 4.4, stock: 12, marca: 'Lenovo', categoria: 'pcs', miniatura: '', imagen: [''] },
    { id: 94, titulo: 'Intel NUC 13 Pro', descripcion: 'Mini PC potente para oficina.', precio: 499, rating: 4.5, stock: 30, marca: 'Intel', categoria: 'pcs', miniatura: '', imagen: [''] },
    { id: 95, titulo: 'Mac Mini M2', descripcion: 'La entrada más económica a macOS.', precio: 599, rating: 4.8, stock: 40, marca: 'Apple', categoria: 'pcs', miniatura: '', imagen: [''] }
  ];

  constructor() { }

  getHardware(): Observable<Hardware[]> {
    return of(this.hardwareList).pipe(delay(800));
  }

  getHardwareByCategoria(categoria: string): Observable<Hardware[]> {
    if (categoria === 'todos') return this.getHardware();
    const filtered = this.hardwareList.filter(item => 
      item.categoria === categoria || 
      (categoria === 'componentes' && item.categoria === 'perifericos')
    );
    return of(filtered).pipe(delay(500));
  }

  searchHardware(query: string): Observable<Hardware[]> {
    const q = query.toLowerCase();
    const filtered = this.hardwareList.filter(item => 
      item.titulo.toLowerCase().includes(q) || 
      item.marca.toLowerCase().includes(q)
    );
    return of(filtered).pipe(delay(500));
  }
}
