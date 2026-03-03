import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: { address: string; city: string; state: string; zip: string; lat: number; lng: number; };
  images: string[];
  amenities: string[];
  featured: boolean;
  rating: number;
  reviews: number;
  available: boolean;
  tags: string[];
}

// ── 32 Indian Properties embedded directly (no backend needed) ──────────────
export const ALL_PROPERTIES: Property[] = [
  {
    id: '1', title: 'Worli Sea Face Penthouse', featured: true, available: true, rating: 5.0, reviews: 12, type: 'Penthouse', bedrooms: 5, bathrooms: 6, area: 9500, price: 1500000, priceUnit: 'month',
    description: 'Crown jewel of the Worli skyline — a massive 5BHK penthouse with 270-degree Arabian Sea views. Wraparound balcony, private jacuzzi, Italian kitchen, and a dedicated home cinema room.',
    location: { address: 'Worli Sea Face', city: 'Mumbai', state: 'Maharashtra', zip: '400030', lat: 19.009, lng: 72.818 },
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80'],
    amenities: ['270° Sea View','Private Jacuzzi','Home Cinema','Italian Kitchen','Staff Quarters','Helipad Access'], tags: ['Ultra Luxury','Sea View','Iconic'],
  },
  {
    id: '2', title: 'DLF Camellias Penthouse', featured: true, available: true, rating: 5.0, reviews: 8, type: 'Penthouse', bedrooms: 5, bathrooms: 5, area: 7200, price: 700000, priceUnit: 'month',
    description: 'Exclusive penthouse in Gurugram\'s most prestigious address. Italian marble, imported kitchen, private terrace garden, and butler service. Redefining luxury in NCR.',
    location: { address: 'Golf Course Road, DLF Camellias', city: 'Gurugram', state: 'Haryana', zip: '122009', lat: 28.459, lng: 77.026 },
    images: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80','https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80'],
    amenities: ['Butler Service','Private Elevator','Golf Course View','Home Theater','Pool','24/7 Security'], tags: ['Ultra Luxury','Golf View','Exclusive'],
  },
  {
    id: '3', title: 'Bandra West Sea-Facing 3BHK', featured: true, available: true, rating: 4.8, reviews: 83, type: 'Apartment', bedrooms: 3, bathrooms: 3, area: 2800, price: 320000, priceUnit: 'month',
    description: 'Stunning sea-facing apartment in Bandra West with panoramic Arabian Sea views. Modern open kitchen, large balconies, and premium amenities steps from Bandstand promenade.',
    location: { address: 'Carter Road, Bandra West', city: 'Mumbai', state: 'Maharashtra', zip: '400050', lat: 19.060, lng: 72.836 },
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80','https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80','https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'],
    amenities: ['Sea View','Gym','Swimming Pool','Parking','Security','Terrace'], tags: ['Sea View','Hot','Bandra'],
  },
  {
    id: '4', title: 'Indiranagar Modern Loft', featured: true, available: true, rating: 4.7, reviews: 62, type: 'Loft', bedrooms: 2, bathrooms: 2, area: 1900, price: 95000, priceUnit: 'month',
    description: 'Chic industrial-style loft in Bengaluru\'s trendiest neighbourhood. Exposed brick, 14-foot ceilings, chef\'s kitchen with quartz countertops, and a private rooftop for entertaining.',
    location: { address: '100 Feet Road, Indiranagar', city: 'Bengaluru', state: 'Karnataka', zip: '560038', lat: 12.971, lng: 77.641 },
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80','https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80','https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80'],
    amenities: ['High Ceilings','Chef Kitchen','Rooftop Terrace','Pet Friendly','Bike Storage','EV Charging'], tags: ['Artisan','Trendy','Hot'],
  },
  {
    id: '5', title: 'Lutyens Delhi Heritage Bungalow', featured: true, available: false, rating: 4.95, reviews: 8, type: 'Villa', bedrooms: 7, bathrooms: 7, area: 12000, price: 1200000, priceUnit: 'month',
    description: 'Grand colonial bungalow in the prestigious Lutyens Delhi zone. Set on a 1-acre plot with manicured gardens, staff quarters, and Raj-era architecture meticulously restored.',
    location: { address: 'Prithviraj Road, Lutyens Zone', city: 'New Delhi', state: 'Delhi', zip: '110011', lat: 28.595, lng: 77.208 },
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80','https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80','https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80'],
    amenities: ['1-Acre Garden','Staff Quarters','Swimming Pool','Library','Garage','Heritage Architecture'], tags: ['Heritage','Iconic','Rare Find'],
  },
  {
    id: '6', title: 'Jubilee Hills Luxury Villa', featured: true, available: true, rating: 4.85, reviews: 29, type: 'Villa', bedrooms: 4, bathrooms: 4, area: 4500, price: 180000, priceUnit: 'month',
    description: 'Premium 4BHK villa in Hyderabad\'s most coveted neighbourhood. Double-height living room, modular kitchen, landscaped garden, private pool, and dedicated home office.',
    location: { address: 'Road No. 36, Jubilee Hills', city: 'Hyderabad', state: 'Telangana', zip: '500033', lat: 17.431, lng: 78.407 },
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80','https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80','https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80'],
    amenities: ['Private Pool','Landscaped Garden','Home Office','Gym','Smart Home','Solar Power'], tags: ['Villa','Private Pool','Unique'],
  },
  {
    id: '7', title: 'Marine Drive Sea Breeze 2BHK', featured: false, available: true, rating: 4.9, reviews: 61, type: 'Apartment', bedrooms: 2, bathrooms: 2, area: 1600, price: 220000, priceUnit: 'month',
    description: 'Iconic apartment directly on Marine Drive — Mumbai\'s Queen\'s Necklace. Wake up to stunning sea views. Renovated with designer interiors and a large wraparound balcony.',
    location: { address: 'Marine Drive, Nariman Point', city: 'Mumbai', state: 'Maharashtra', zip: '400020', lat: 18.938, lng: 72.823 },
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80','https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'],
    amenities: ['Direct Sea View','Wraparound Balcony','Designer Interior','Doorman','Parking','Generator'], tags: ['Sea View','Iconic','Marine Drive'],
  },
  {
    id: '8', title: 'Koramangala Studio Smart Flat', featured: false, available: true, rating: 4.5, reviews: 134, type: 'Studio', bedrooms: 0, bathrooms: 1, area: 650, price: 28000, priceUnit: 'month',
    description: 'Beautifully designed studio in Bengaluru\'s startup hub. Fully furnished with modular kitchen, smart TV, high-speed fiber internet, and co-working space in building.',
    location: { address: '5th Block, Koramangala', city: 'Bengaluru', state: 'Karnataka', zip: '560095', lat: 12.935, lng: 77.624 },
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80','https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80','https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80'],
    amenities: ['Fully Furnished','500Mbps WiFi','Co-working Space','Gym','Laundry','Power Backup'], tags: ['Affordable','Fully Furnished','Popular'],
  },
  {
    id: '9', title: 'Powai Lake View 3BHK', featured: false, available: true, rating: 4.6, reviews: 91, type: 'Apartment', bedrooms: 3, bathrooms: 3, area: 2200, price: 95000, priceUnit: 'month',
    description: 'Elegant 3BHK with stunning Powai Lake views in Hiranandani Gardens. European-style architecture, world-class amenities, and serene surroundings in the IT corridor.',
    location: { address: 'Hiranandani Gardens, Powai', city: 'Mumbai', state: 'Maharashtra', zip: '400076', lat: 19.119, lng: 72.908 },
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80','https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80','https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'],
    amenities: ['Lake View','Clubhouse','Pool','Tennis Court','Jogging Track','Valet'], tags: ['Lake View','Family Friendly'],
  },
  {
    id: '10', title: 'Vasant Vihar South Delhi Duplex', featured: false, available: true, rating: 4.7, reviews: 38, type: 'Duplex', bedrooms: 4, bathrooms: 4, area: 4800, price: 250000, priceUnit: 'month',
    description: 'Spacious duplex in South Delhi\'s premium Vasant Vihar colony. Two floors of elegant living with private garden, imported fittings, and proximity to diplomatic enclave.',
    location: { address: 'Vasant Vihar, South Delhi', city: 'New Delhi', state: 'Delhi', zip: '110057', lat: 28.551, lng: 77.157 },
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80','https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80'],
    amenities: ['Private Garden','Duplex Layout','Imported Fittings','2-Car Garage','Staff Room','Modular Kitchen'], tags: ['Duplex','South Delhi','Spacious'],
  },
  {
    id: '11', title: 'Cyber City Highrise 4BHK', featured: true, available: true, rating: 4.9, reviews: 41, type: 'Apartment', bedrooms: 4, bathrooms: 4, area: 3800, price: 350000, priceUnit: 'month',
    description: 'Magnificent 4BHK in a gleaming highrise overlooking Gurugram\'s Cyber City skyline. Wraparound terrace, infinity pool, state-of-the-art gym, and direct metro access.',
    location: { address: 'DLF Phase 2, Cyber City', city: 'Gurugram', state: 'Haryana', zip: '122002', lat: 28.494, lng: 77.088 },
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80','https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80','https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80'],
    amenities: ['City Skyline View','Wraparound Terrace','Infinity Pool','Metro Access','Concierge','EV Parking'], tags: ['Skyline View','Executive','Metro'],
  },
  {
    id: '12', title: 'Old Goa Portuguese Villa', featured: true, available: true, rating: 4.95, reviews: 14, type: 'Villa', bedrooms: 5, bathrooms: 5, area: 7500, price: 320000, priceUnit: 'month',
    description: 'Extraordinary restored 18th-century Portuguese villa in Old Goa. 5 bedrooms, azulejo tile work, courtyard fountain, private pool, and lush tropical garden.',
    location: { address: 'Old Goa Road, Velha Goa', city: 'Panaji', state: 'Goa', zip: '403402', lat: 15.505, lng: 73.908 },
    images: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80','https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80','https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80'],
    amenities: ['Private Pool','Courtyard Fountain','Tropical Garden','Heritage Architecture','Staff','Garage'], tags: ['Heritage','Pool','Goa'],
  },
  {
    id: '13', title: 'HSR Layout Smart Home 3BHK', featured: false, available: true, rating: 4.7, reviews: 56, type: 'Apartment', bedrooms: 3, bathrooms: 3, area: 1800, price: 65000, priceUnit: 'month',
    description: 'Ultra-modern smart home in Bengaluru\'s HSR Layout. Fully automated lighting, temperature, security, and appliances controllable from your phone. IGBC green certified.',
    location: { address: 'Sector 6, HSR Layout', city: 'Bengaluru', state: 'Karnataka', zip: '560102', lat: 12.911, lng: 77.647 },
    images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80','https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80','https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80'],
    amenities: ['Full Home Automation','EV Charging','Solar Power','IGBC Green','Gym','Rooftop Lounge'], tags: ['Smart Home','Green','Modern'],
  },
  {
    id: '14', title: 'Alipore Heritage Mansion', featured: true, available: true, rating: 4.8, reviews: 19, type: 'Villa', bedrooms: 6, bathrooms: 6, area: 9000, price: 280000, priceUnit: 'month',
    description: 'Majestic colonial-era mansion in Kolkata\'s most aristocratic neighbourhood. Raj-era architecture with contemporary renovations, expansive lawns, and rich history.',
    location: { address: 'Alipore Road, Alipore', city: 'Kolkata', state: 'West Bengal', zip: '700027', lat: 22.534, lng: 88.333 },
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80','https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80','https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80'],
    amenities: ['Heritage Architecture','Lawn','Ballroom','Library','Staff Quarters','Garage'], tags: ['Heritage','Colonial','Rare Find'],
  },
  {
    id: '15', title: 'Besant Nagar Beach Bungalow', featured: false, available: true, rating: 4.7, reviews: 52, type: 'Villa', bedrooms: 3, bathrooms: 3, area: 2400, price: 85000, priceUnit: 'month',
    description: 'Gorgeous bungalow 2 minutes from Elliot\'s Beach in Chennai. Private garden, open terrace with sea breeze, vintage wooden floors, and relaxed coastal lifestyle.',
    location: { address: 'Besant Nagar, Elliot\'s Beach', city: 'Chennai', state: 'Tamil Nadu', zip: '600090', lat: 13.000, lng: 80.271 },
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80','https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'],
    amenities: ['Beach Access','Private Garden','Terrace','Vintage Floors','Pet Friendly','Parking'], tags: ['Beach','Bungalow','Chennai'],
  },
  {
    id: '16', title: 'Aundh Wellness Apartment', featured: false, available: true, rating: 4.6, reviews: 77, type: 'Apartment', bedrooms: 2, bathrooms: 2, area: 1200, price: 35000, priceUnit: 'month',
    description: 'Thoughtfully designed 2BHK in Pune\'s serene Aundh neighbourhood. Vaastu-compliant, natural ventilation, rooftop organic garden, near top schools and hospitals.',
    location: { address: 'DP Road, Aundh', city: 'Pune', state: 'Maharashtra', zip: '411007', lat: 18.558, lng: 73.808 },
    images: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80','https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80'],
    amenities: ['Vaastu Compliant','Organic Garden','Gym','Kids Play Area','Rainwater Harvesting','Solar'], tags: ['Eco Friendly','Family Friendly','Pune'],
  },
  {
    id: '17', title: 'Connaught Place Executive 3BHK', featured: false, available: true, rating: 4.5, reviews: 43, type: 'Apartment', bedrooms: 3, bathrooms: 3, area: 2600, price: 175000, priceUnit: 'month',
    description: 'Rare live-work apartment above Connaught Place\'s iconic circular market. Massive 3BHK with high ceilings, heritage views, and a versatile layout for executives.',
    location: { address: 'Connaught Place, Central Delhi', city: 'New Delhi', state: 'Delhi', zip: '110001', lat: 28.631, lng: 77.216 },
    images: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80','https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80','https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80'],
    amenities: ['Heritage View','High Ceilings','WFH Setup','Concierge','Metro Access','Parking'], tags: ['Central Delhi','Heritage','Executive'],
  },
  {
    id: '18', title: 'Gachibowli Tech Villa', featured: true, available: true, rating: 4.8, reviews: 34, type: 'Villa', bedrooms: 4, bathrooms: 4, area: 5200, price: 150000, priceUnit: 'month',
    description: 'Stunning independent villa in HITEC City zone. Private pool, landscaped garden, 3-car garage, home office with fiber, and premium club facilities.',
    location: { address: 'Nanakramguda, Gachibowli', city: 'Hyderabad', state: 'Telangana', zip: '500032', lat: 17.415, lng: 78.347 },
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80','https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80','https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80'],
    amenities: ['Private Pool','3-Car Garage','Home Office','Landscaped Garden','CCTV','Fiber Internet'], tags: ['Villa','HITEC City','Pool'],
  },
  {
    id: '19', title: 'Satellite Road Modern 2BHK', featured: false, available: true, rating: 4.4, reviews: 88, type: 'Apartment', bedrooms: 2, bathrooms: 2, area: 1100, price: 30000, priceUnit: 'month',
    description: 'Stylish 2BHK in Ahmedabad\'s upscale Satellite area. Vaastu-friendly layout, modular kitchen, covered parking, near Phoenix Mall and top restaurants.',
    location: { address: 'Satellite Road, Satellite', city: 'Ahmedabad', state: 'Gujarat', zip: '380015', lat: 23.022, lng: 72.571 },
    images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
    amenities: ['Vaastu Friendly','Modular Kitchen','Covered Parking','Gym','CCTV','Power Backup'], tags: ['Affordable','Vaastu','Ahmedabad'],
  },
  {
    id: '20', title: 'Sector 17 Chandigarh 3BHK', featured: false, available: true, rating: 4.5, reviews: 66, type: 'Apartment', bedrooms: 3, bathrooms: 2, area: 1600, price: 45000, priceUnit: 'month',
    description: '3BHK in Le Corbusier\'s planned city, steps from Sector 17 plaza. Wide boulevards, lush greenery, and peaceful lifestyle for families seeking safety and urban convenience.',
    location: { address: 'Sector 17-C', city: 'Chandigarh', state: 'Punjab', zip: '160017', lat: 30.740, lng: 76.778 },
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80','https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80','https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'],
    amenities: ['Wide Balcony','Park View','Covered Parking','Lift','Power Backup','Security'], tags: ['Family Friendly','Planned City','Peaceful'],
  },
  {
    id: '21', title: 'Viman Nagar Premium 3BHK', featured: false, available: true, rating: 4.6, reviews: 48, type: 'Apartment', bedrooms: 3, bathrooms: 3, area: 1700, price: 55000, priceUnit: 'month',
    description: 'Upscale 3BHK near Pune airport. European-style interiors, large balcony, rooftop infinity pool, and proximity to Phoenix Mall and top restaurants.',
    location: { address: 'Viman Nagar, Near Airport', city: 'Pune', state: 'Maharashtra', zip: '411014', lat: 18.567, lng: 73.914 },
    images: ['https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80','https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80','https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'],
    amenities: ['Rooftop Pool','Gym','Concierge','Mall Proximity','Balcony','CCTV'], tags: ['Near Airport','Modern','Pune'],
  },
  {
    id: '22', title: 'Navi Mumbai Creek View 3BHK', featured: false, available: true, rating: 4.4, reviews: 95, type: 'Apartment', bedrooms: 3, bathrooms: 2, area: 1550, price: 55000, priceUnit: 'month',
    description: 'Premium apartment with uninterrupted creek and city views in Kharghar. Modern tower with club facilities, walking distance to station, and upcoming metro connectivity.',
    location: { address: 'Sector 12, Kharghar', city: 'Navi Mumbai', state: 'Maharashtra', zip: '410210', lat: 19.047, lng: 73.069 },
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80','https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80','https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80'],
    amenities: ['Creek View','Clubhouse','Pool','Gym','Near Station','CCTV'], tags: ['Waterfront','Navi Mumbai','Value'],
  },
  {
    id: '23', title: 'Malviya Nagar South Delhi Duplex', featured: false, available: true, rating: 4.6, reviews: 39, type: 'Duplex', bedrooms: 3, bathrooms: 3, area: 2800, price: 130000, priceUnit: 'month',
    description: 'Premium duplex in South Delhi\'s beloved Malviya Nagar. Two-storey layout with terrace, modular kitchen, and quiet residential lane near Hauz Khas village.',
    location: { address: 'Malviya Nagar, South Delhi', city: 'New Delhi', state: 'Delhi', zip: '110017', lat: 28.535, lng: 77.210 },
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80','https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
    amenities: ['Terrace','Modular Kitchen','Duplex Layout','Parking','Near Metro','Gated Colony'], tags: ['South Delhi','Duplex','Terrace'],
  },
  {
    id: '24', title: 'Adyar Riverside Bungalow', featured: false, available: false, rating: 4.8, reviews: 27, type: 'Villa', bedrooms: 4, bathrooms: 4, area: 4200, price: 120000, priceUnit: 'month',
    description: 'Tranquil 4BHK bungalow on the banks of the Adyar river in Chennai. Lush garden, river-facing verandah, traditional Chettinad design with modern comforts.',
    location: { address: 'Kasturba Nagar, Adyar', city: 'Chennai', state: 'Tamil Nadu', zip: '600020', lat: 13.006, lng: 80.256 },
    images: ['https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80','https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80','https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80'],
    amenities: ['River View','Garden','Verandah','Traditional Design','Parking','Generator'], tags: ['River View','Heritage','Chennai'],
  },
  {
    id: '25', title: 'Frazer Town Garden Apartment', featured: false, available: true, rating: 4.5, reviews: 73, type: 'Apartment', bedrooms: 2, bathrooms: 2, area: 1350, price: 42000, priceUnit: 'month',
    description: 'Charming 2BHK in Bengaluru\'s vintage Frazer Town — tree-lined streets, excellent schools, spacious rooms, wooden floors, and a lovely garden view.',
    location: { address: 'Dispensary Road, Frazer Town', city: 'Bengaluru', state: 'Karnataka', zip: '560005', lat: 12.979, lng: 77.608 },
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80','https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80'],
    amenities: ['Garden View','Wooden Floors','Parking','School Proximity','Pet Friendly','Storage'], tags: ['Garden View','Family Friendly','Vintage'],
  },
  {
    id: '26', title: 'Salt Lake IT Township 2BHK', featured: false, available: true, rating: 4.3, reviews: 112, type: 'Apartment', bedrooms: 2, bathrooms: 2, area: 980, price: 25000, priceUnit: 'month',
    description: 'Contemporary 2BHK in Kolkata\'s premier IT township — Salt Lake Sector V. Fully furnished, walking distance to major IT companies, modern amenities at great value.',
    location: { address: 'Sector V, Salt Lake City', city: 'Kolkata', state: 'West Bengal', zip: '700091', lat: 22.569, lng: 88.434 },
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80','https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'],
    amenities: ['Fully Furnished','WiFi','Gym','Security','Laundry','IT Hub Proximity'], tags: ['IT Hub','Furnished','Affordable'],
  },
  {
    id: '27', title: 'Whitefield Tech Hub Studio', featured: false, available: true, rating: 4.4, reviews: 210, type: 'Studio', bedrooms: 0, bathrooms: 1, area: 580, price: 22000, priceUnit: 'month',
    description: 'Smart studio apartment 5 minutes from Whitefield IT park. Fully furnished with modular furniture, fast internet, and rooftop garden. Ideal for IT professionals.',
    location: { address: 'ITPL Main Road, Whitefield', city: 'Bengaluru', state: 'Karnataka', zip: '560066', lat: 12.969, lng: 77.749 },
    images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80','https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80'],
    amenities: ['Fully Furnished','500 Mbps WiFi','AC','Power Backup','Security','Rooftop Garden'], tags: ['Affordable','IT Hub','Furnished'],
  },
  {
    id: '28', title: 'Antilia-Style Mumbai Sky Villa', featured: true, available: true, rating: 4.9, reviews: 47, type: 'Penthouse', bedrooms: 4, bathrooms: 4, area: 5800, price: 850000, priceUnit: 'month',
    description: 'Ultra-luxury penthouse on Altamount Road — Mumbai\'s Billionaire Row. Floor-to-ceiling windows, private rooftop terrace with infinity pool, and world-class concierge.',
    location: { address: 'Altamount Road, Cumballa Hill', city: 'Mumbai', state: 'Maharashtra', zip: '400026', lat: 18.970, lng: 72.807 },
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80'],
    amenities: ['Rooftop Infinity Pool','Concierge','Valet Parking','Home Gym','Smart Home','Generator'], tags: ['Ultra Luxury','Sea View','New'],
  },
  {
    id: '29', title: 'Jaipur Pink City Haveli', featured: true, available: true, rating: 4.9, reviews: 33, type: 'Villa', bedrooms: 5, bathrooms: 5, area: 6800, price: 200000, priceUnit: 'month',
    description: 'Magnificent restored Rajasthani haveli in the heart of Jaipur\'s Pink City. Intricate jali work, courtyards, rooftop with Amer Fort views, and modern luxury interiors.',
    location: { address: 'Civil Lines, Pink City', city: 'Jaipur', state: 'Rajasthan', zip: '302006', lat: 26.920, lng: 75.787 },
    images: ['https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80','https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80','https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80'],
    amenities: ['Heritage Haveli','Rooftop Terrace','Courtyard','Fort View','Staff','Vintage Decor'], tags: ['Heritage','Rajasthan','Haveli'],
  },
  {
    id: '30', title: 'Banjara Hills Modern Villa', featured: false, available: true, rating: 4.7, reviews: 44, type: 'Villa', bedrooms: 4, bathrooms: 4, area: 4000, price: 160000, priceUnit: 'month',
    description: 'Contemporary 4BHK villa in Hyderabad\'s posh Banjara Hills. Open-plan design, swimming pool, home theatre, and proximity to top restaurants and malls.',
    location: { address: 'Road No. 12, Banjara Hills', city: 'Hyderabad', state: 'Telangana', zip: '500034', lat: 17.415, lng: 78.448 },
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80','https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80','https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80'],
    amenities: ['Swimming Pool','Home Theatre','Open Plan','3-Car Garage','Smart Lighting','Gym'], tags: ['Banjara Hills','Villa','Luxury'],
  },
  {
    id: '31', title: 'Kochi Waterfront Apartment', featured: false, available: true, rating: 4.6, reviews: 58, type: 'Apartment', bedrooms: 3, bathrooms: 3, area: 2100, price: 75000, priceUnit: 'month',
    description: 'Stunning sea-facing 3BHK in Marine Drive Kochi. Backwater and Arabian Sea views, modern interiors, and proximity to Lulu Mall and Fort Kochi cultural district.',
    location: { address: 'Marine Drive, Ernakulam', city: 'Kochi', state: 'Kerala', zip: '682031', lat: 9.981, lng: 76.276 },
    images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80','https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80'],
    amenities: ['Sea View','Backwater View','Gym','Pool','Near Mall','Security'], tags: ['Kochi','Sea View','Kerala'],
  },
  {
    id: '32', title: 'Lucknow Gomti Nagar Luxury 4BHK', featured: false, available: true, rating: 4.5, reviews: 61, type: 'Apartment', bedrooms: 4, bathrooms: 4, area: 2800, price: 70000, priceUnit: 'month',
    description: 'Premium 4BHK in Lucknow\'s most modern neighbourhood Gomti Nagar Extension. Italian marble, modular kitchen, club amenities, and proximity to new IT and commercial hubs.',
    location: { address: 'Gomti Nagar Extension', city: 'Lucknow', state: 'Uttar Pradesh', zip: '226010', lat: 26.867, lng: 80.994 },
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80','https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80','https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'],
    amenities: ['Italian Marble','Modular Kitchen','Clubhouse','Pool','Gym','24/7 Security'], tags: ['Lucknow','Luxury','4BHK'],
  },
];

interface FiltersState {
  search: string; city: string; minPrice: number; maxPrice: number; bedrooms: number; type: string;
}

interface PropertyState {
  properties: Property[];
  featured: Property[];
  currentProperty: Property | null;
  loading: boolean;
  error: string | null;
  filters: FiltersState;
}

const initialState: PropertyState = {
  properties: ALL_PROPERTIES,
  featured: ALL_PROPERTIES.filter(p => p.featured),
  currentProperty: null,
  loading: false,
  error: null,
  filters: { search: '', city: '', minPrice: 0, maxPrice: 9999999, bedrooms: 0, type: '' },
};

function applyFilters(props: Property[], filters: FiltersState): Property[] {
  return props.filter(p => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.location.city.toLowerCase().includes(q) &&
          !p.location.state.toLowerCase().includes(q) && !p.type.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q)) return false;
    }
    if (filters.city && !p.location.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice < 9999999 && p.price > filters.maxPrice) return false;
    if (filters.bedrooms && p.bedrooms < filters.bedrooms) return false;
    if (filters.type && p.type.toLowerCase() !== filters.type.toLowerCase()) return false;
    return true;
  });
}

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.properties = applyFilters(ALL_PROPERTIES, state.filters);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.properties = ALL_PROPERTIES;
    },
    setCurrentProperty: (state, action: PayloadAction<string>) => {
      state.currentProperty = ALL_PROPERTIES.find(p => p.id === action.payload) || null;
    },
  },
});

export const { setFilters, clearFilters, setCurrentProperty } = propertySlice.actions;

// Keep async thunks as no-ops for backward compatibility
export const fetchProperties = (filters?: any) => (dispatch: any) => {
  if (filters) dispatch(setFilters(filters));
};
export const fetchFeatured = () => (_dispatch: any) => {};
export const fetchPropertyById = (id: string) => (dispatch: any) => {
  dispatch(setCurrentProperty(id));
};

export default propertySlice.reducer;
