import { Product, QuoteRequest, Order, CustomerApplication, CMSContent, SiteSettings } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Heritage Chelsea Boot',
    slug: 'heritage-chelsea-boot',
    sku: 'CST-CHL-001',
    category: 'Chelsea Boots',
    categorySlug: 'chelsea-boots',
    subCategory: 'Pull-Up Leather',
    gender: 'Men',
    style: 'Chelsea',
    tagline: 'Artisanal pull-up calfskin with 360° Goodyear welted double leather sole',
    description: 'Constructed from premium Italian pull-up calfskin that develops an organic patina with wear. Features heavy-duty elasticated side gussets, dual woven pull tabs, full glove-leather interior lining, and a natural cork filler bed that molds to the footbed. Bench-made using authentic 360° Goodyear welt construction.',
    leatherType: 'Italian Pull-Up Veg-Tan Calfskin',
    leatherGrade: 'Grade A Full Grain (1.8 - 2.0mm)',
    upperMaterial: 'Full-Grain Calfskin Leather',
    liningMaterial: 'Full 100% Calfskin Glove Lining',
    outsoleMaterial: 'Double Oak-Bark Tanned Leather Sole with Vibram Rubber Heel Tap',
    construction: 'Goodyear Welted (360°)',
    countryOfOrigin: 'Porto, Portugal',
    careInstructions: 'Clean with horsehair brush. Apply natural beeswax cream quarterly. Use cedar shoe trees.',
    weightGrams: 640,
    featured: true,
    leadTimeWeeks: '3-4 Weeks',
    moq: 24,
    cartonMultiple: 12,
    images: [
      '/assets/images/chelsea_boot_walnut_1793033837576.jpg',
      '/assets/images/hero_leather_boots_1793033837355.jpg'
    ],
    colors: [
      { name: 'Walnut Espresso', hex: '#34231E', code: 'WAL' },
      { name: 'Tuscan Tan', hex: '#8C5528', code: 'TAN' },
      { name: 'Onyx Black', hex: '#1C1B1A', code: 'BLK' }
    ],
    sizes: [
      { us: '8.0', uk: '7.0', eu: '41', stock: 140 },
      { us: '8.5', uk: '7.5', eu: '41.5', stock: 180 },
      { us: '9.0', uk: '8.0', eu: '42', stock: 240 },
      { us: '9.5', uk: '8.5', eu: '42.5', stock: 210 },
      { us: '10.0', uk: '9.0', eu: '43', stock: 260 },
      { us: '10.5', uk: '9.5', eu: '43.5', stock: 190 },
      { us: '11.0', uk: '10.0', eu: '44', stock: 150 },
      { us: '12.0', uk: '11.0', eu: '45', stock: 95 }
    ],
    tiers: [
      { minQty: 24, maxQty: 49, unitPrice: 65, label: '24–49 pairs' },
      { minQty: 50, maxQty: 99, unitPrice: 58, label: '50–99 pairs' },
      { minQty: 100, maxQty: 249, unitPrice: 52, label: '100–249 pairs' },
      { minQty: 250, maxQty: null, unitPrice: 48, label: '250+ pairs' }
    ],
    sampleAvailable: true,
    samplePrice: 95,
    isCustomizable: true,
    status: 'active',
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-002',
    name: 'Classic Lace-Up Work Boot',
    slug: 'classic-lace-up-work-boot',
    sku: 'CST-WRK-002',
    category: 'Lace-Up Boots',
    categorySlug: 'lace-up-boots',
    subCategory: 'Heritage Service Boot',
    gender: 'Men',
    style: 'Lace-Up',
    tagline: 'Oiled rugged full-grain leather with Commando lug sole and solid brass hardware',
    description: 'An iconic 6-inch service boot built for relentless durability and timeless utilitarian style. Forged with 2.2mm heavyweight oiled full-grain leather that repels moisture and scuffs. Reinforced triple-stitched stress zones, antiqued solid brass eyelets and speed hooks, with an oil-resistant Vibram Commando lug outsole.',
    leatherType: 'Oiled Pull-Up Cowhide',
    leatherGrade: 'Grade AA Heavyweight Full Grain (2.2mm)',
    upperMaterial: 'Heavy Full-Grain Oiled Cowhide',
    liningMaterial: 'Supple Pigskin Vamp & Quarter Lining',
    outsoleMaterial: 'Vibram Commando Lug Rubber Outsole with Storm Welt',
    construction: 'Goodyear Welted (360°)',
    countryOfOrigin: 'Leon, Mexico',
    careInstructions: 'Wipe with damp cloth. Treat with mink oil or heavy leather conditioner.',
    weightGrams: 780,
    featured: true,
    leadTimeWeeks: '4-5 Weeks',
    moq: 24,
    cartonMultiple: 12,
    images: [
      '/assets/images/laceup_work_boot_1793033839697.jpg',
      '/assets/images/hero_leather_boots_1793033837355.jpg'
    ],
    colors: [
      { name: 'Cognac Amber', hex: '#7C3F1B', code: 'COG' },
      { name: 'Dark Mocha', hex: '#2C1D18', code: 'MOC' },
      { name: 'Weathered Slate', hex: '#4A4E51', code: 'SLT' }
    ],
    sizes: [
      { us: '8.0', uk: '7.0', eu: '41', stock: 110 },
      { us: '8.5', uk: '7.5', eu: '41.5', stock: 160 },
      { us: '9.0', uk: '8.0', eu: '42', stock: 220 },
      { us: '9.5', uk: '8.5', eu: '42.5', stock: 200 },
      { us: '10.0', uk: '9.0', eu: '43', stock: 250 },
      { us: '10.5', uk: '9.5', eu: '43.5', stock: 180 },
      { us: '11.0', uk: '10.0', eu: '44', stock: 130 },
      { us: '12.0', uk: '11.0', eu: '45', stock: 85 }
    ],
    tiers: [
      { minQty: 24, maxQty: 49, unitPrice: 68, label: '24–49 pairs' },
      { minQty: 50, maxQty: 99, unitPrice: 61, label: '50–99 pairs' },
      { minQty: 100, maxQty: 249, unitPrice: 55, label: '100–249 pairs' },
      { minQty: 250, maxQty: null, unitPrice: 50, label: '250+ pairs' }
    ],
    sampleAvailable: true,
    samplePrice: 99,
    isCustomizable: true,
    status: 'active',
    createdAt: '2026-01-12'
  },
  {
    id: 'prod-003',
    name: 'Artisanal Oxford Dress Boot',
    slug: 'artisanal-oxford-dress-boot',
    sku: 'CST-DRS-003',
    category: 'Dress Boots',
    categorySlug: 'dress-boots',
    subCategory: 'Balmoral Formal',
    gender: 'Men',
    style: 'Dress',
    tagline: 'Hand-burnished burgundy French calfskin with chisel toe and beveled waist',
    description: 'The pinnacle of bespoke formal footwear engineering. Crafted from select French box calf leather, hand-stained and burnished in our atelier to achieve rich tonal depth. Features closed-channel Goodyear welt stitching, a hand-beveled fiddleback waist, and stacked leather heel with brass nail accents.',
    leatherType: 'French Box Calfskin',
    leatherGrade: 'Supreme Grade Full Grain',
    upperMaterial: 'Selected French Calfskin',
    liningMaterial: 'Silky Glove Calfskin with Padded Heel Cushion',
    outsoleMaterial: 'Argentine Veg-Tan Soling Leather with Hand-Inked Edges',
    construction: 'Goodyear Welted (270°)',
    countryOfOrigin: 'Almansa, Spain',
    careInstructions: 'Buff with cream polish. Apply carnauba wax to toe cap for mirror shine.',
    weightGrams: 590,
    featured: true,
    leadTimeWeeks: '4-6 Weeks',
    moq: 24,
    cartonMultiple: 12,
    images: [
      '/assets/images/dress_oxford_boot_1793033839140.jpg',
      '/assets/images/craftsmanship_workshop_1793033838284.jpg'
    ],
    colors: [
      { name: 'Oxblood Burgundy', hex: '#4A1521', code: 'OXB' },
      { name: 'Midnight Jet', hex: '#111111', code: 'MID' },
      { name: 'Bourbon Mahogany', hex: '#582B1B', code: 'BRB' }
    ],
    sizes: [
      { us: '8.0', uk: '7.0', eu: '41', stock: 80 },
      { us: '8.5', uk: '7.5', eu: '41.5', stock: 120 },
      { us: '9.0', uk: '8.0', eu: '42', stock: 160 },
      { us: '9.5', uk: '8.5', eu: '42.5', stock: 140 },
      { us: '10.0', uk: '9.0', eu: '43', stock: 170 },
      { us: '10.5', uk: '9.5', eu: '43.5', stock: 110 },
      { us: '11.0', uk: '10.0', eu: '44', stock: 90 }
    ],
    tiers: [
      { minQty: 24, maxQty: 49, unitPrice: 79, label: '24–49 pairs' },
      { minQty: 50, maxQty: 99, unitPrice: 72, label: '50–99 pairs' },
      { minQty: 100, maxQty: 249, unitPrice: 65, label: '100–249 pairs' },
      { minQty: 250, maxQty: null, unitPrice: 59, label: '250+ pairs' }
    ],
    sampleAvailable: true,
    samplePrice: 115,
    isCustomizable: true,
    status: 'active',
    createdAt: '2026-01-18'
  },
  {
    id: 'prod-004',
    name: 'Vanguard Commando Service Boot',
    slug: 'vanguard-commando-service-boot',
    sku: 'CST-SVC-004',
    category: 'Lace-Up Boots',
    categorySlug: 'lace-up-boots',
    subCategory: 'Cap-Toe Officer Boot',
    gender: 'Men',
    style: 'Lace-Up',
    tagline: 'Waxed flesh Horween leather with brogued cap toe and cork moisture barrier',
    description: 'Military-grade specification meets bespoke leather tailoring. Features roughout waxed-flesh leather that resists abrasions and absorbs conditioning deeply. Dual-density leather midsole with genuine granulated cork filler provides all-day arch support and thermal isolation.',
    leatherType: 'Waxed Flesh Horween Cowhide',
    leatherGrade: 'Military Spec Full Grain',
    upperMaterial: 'Waxed Heavy Cowhide',
    liningMaterial: 'Calfskin Quarter with Unlined Vamp for Breathability',
    outsoleMaterial: 'Dainite Studded Rubber Sole',
    construction: 'Goodyear Welted (360°)',
    countryOfOrigin: 'Northampton, UK',
    careInstructions: 'Apply Venetian shoe cream and brush with stiff boar bristle.',
    weightGrams: 750,
    featured: true,
    leadTimeWeeks: '3-5 Weeks',
    moq: 24,
    cartonMultiple: 12,
    images: [
      '/assets/images/hero_leather_boots_1793033837355.jpg',
      '/assets/images/laceup_work_boot_1793033839697.jpg'
    ],
    colors: [
      { name: 'Dark Oak', hex: '#3B2A1E', code: 'OAK' },
      { name: 'Charcoal Roughout', hex: '#383838', code: 'CHR' }
    ],
    sizes: [
      { us: '8.5', uk: '7.5', eu: '41.5', stock: 140 },
      { us: '9.0', uk: '8.0', eu: '42', stock: 200 },
      { us: '9.5', uk: '8.5', eu: '42.5', stock: 190 },
      { us: '10.0', uk: '9.0', eu: '43', stock: 230 },
      { us: '10.5', uk: '9.5', eu: '43.5', stock: 160 },
      { us: '11.0', uk: '10.0', eu: '44', stock: 110 }
    ],
    tiers: [
      { minQty: 24, maxQty: 49, unitPrice: 72, label: '24–49 pairs' },
      { minQty: 50, maxQty: 99, unitPrice: 64, label: '50–99 pairs' },
      { minQty: 100, maxQty: 249, unitPrice: 58, label: '100–249 pairs' },
      { minQty: 250, maxQty: null, unitPrice: 52, label: '250+ pairs' }
    ],
    sampleAvailable: true,
    samplePrice: 105,
    isCustomizable: true,
    status: 'active',
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-005',
    name: 'Atelier Desert Chukka Boot',
    slug: 'atelier-desert-chukka-boot',
    sku: 'CST-CHK-005',
    category: 'Chukka Boots',
    categorySlug: 'chukka-boots',
    subCategory: 'Suede & Leather',
    gender: 'Unisex',
    style: 'Chukka',
    tagline: 'Supple Italian reverse calf suede with natural crepe cushion sole',
    description: 'An unstructured, ultra-comfortable 2-eyelet chukka boot. Sourced from renowned Tuscan tanneries, the reverse calf suede offers butter-soft flex with water-repellent conditioning. Grounded on an authentic plantation crepe rubber sole stitched through the leather welt.',
    leatherType: 'Italian Reverse Calf Suede',
    leatherGrade: 'Silk Suede Grade A',
    upperMaterial: 'Water-Resistant Calf Suede',
    liningMaterial: 'Half-Lined Soft Calf Leather',
    outsoleMaterial: '100% Natural Plantation Hevea Crepe Rubber',
    construction: 'Blake Stitched',
    countryOfOrigin: 'Florence, Italy',
    careInstructions: 'Use brass wire suede brush and waterproof nano-spray protector.',
    weightGrams: 520,
    featured: false,
    leadTimeWeeks: '3-4 Weeks',
    moq: 24,
    cartonMultiple: 12,
    images: [
      '/assets/images/chelsea_boot_walnut_1793033837576.jpg'
    ],
    colors: [
      { name: 'Snuff Tobacco', hex: '#6E472D', code: 'SNF' },
      { name: 'Sandstone Khaki', hex: '#A89279', code: 'SND' },
      { name: 'Castagna Brown', hex: '#4B3525', code: 'CST' }
    ],
    sizes: [
      { us: '7.5', uk: '6.5', eu: '40', stock: 90 },
      { us: '8.0', uk: '7.0', eu: '41', stock: 130 },
      { us: '8.5', uk: '7.5', eu: '41.5', stock: 150 },
      { us: '9.0', uk: '8.0', eu: '42', stock: 180 },
      { us: '9.5', uk: '8.5', eu: '42.5', stock: 160 },
      { us: '10.0', uk: '9.0', eu: '43', stock: 170 },
      { us: '11.0', uk: '10.0', eu: '44', stock: 110 }
    ],
    tiers: [
      { minQty: 24, maxQty: 49, unitPrice: 58, label: '24–49 pairs' },
      { minQty: 50, maxQty: 99, unitPrice: 51, label: '50–99 pairs' },
      { minQty: 100, maxQty: 249, unitPrice: 46, label: '100–249 pairs' },
      { minQty: 250, maxQty: null, unitPrice: 42, label: '250+ pairs' }
    ],
    sampleAvailable: true,
    samplePrice: 85,
    isCustomizable: true,
    status: 'active',
    createdAt: '2026-02-05'
  },
  {
    id: 'prod-006',
    name: 'Custom Private-Label OEM Boot',
    slug: 'custom-private-label-oem-boot',
    sku: 'CST-OEM-006',
    category: 'Custom & Private Label',
    categorySlug: 'custom-private-label',
    subCategory: 'Bespoke Production',
    gender: 'Unisex',
    style: 'Custom / OEM',
    tagline: 'Tailored OEM and private-label footwear production with branded lasts and custom debossing',
    description: 'Designed exclusively for retail brands, footwear labels, and corporate programs. Choose from our repository of verified European lasts, certified leathers, custom branded brass eyelets, debossed sock liners, and bespoke packaging boxes. Supported by low minimums and rapid prototype sampling.',
    leatherType: 'Client Specification (Pull-Up, Shell Cordovan, Veg-Tan)',
    leatherGrade: 'Bespoke Selection',
    upperMaterial: 'Configurable by Buyer',
    liningMaterial: 'Calfskin, Shearling, or Technical Mesh',
    outsoleMaterial: 'Leather, Vibram, Ridgeway, or Lug',
    construction: 'Goodyear Welted (360°)',
    countryOfOrigin: 'Portugal / Mexico',
    careInstructions: 'Provided with custom buyer brand booklet.',
    weightGrams: 690,
    featured: true,
    leadTimeWeeks: '6-8 Weeks',
    moq: 50,
    cartonMultiple: 12,
    images: [
      '/assets/images/craftsmanship_workshop_1793033838284.jpg',
      '/assets/images/hero_leather_boots_1793033837355.jpg'
    ],
    colors: [
      { name: 'Custom Pantone Dye', hex: '#52443B', code: 'OEM' }
    ],
    sizes: [
      { us: 'Full Size Run (7-13)', uk: '6-12', eu: '40-46', stock: 1000 }
    ],
    tiers: [
      { minQty: 50, maxQty: 99, unitPrice: 62, label: '50–99 pairs' },
      { minQty: 100, maxQty: 249, unitPrice: 54, label: '100–249 pairs' },
      { minQty: 250, maxQty: 499, unitPrice: 48, label: '250–499 pairs' },
      { minQty: 500, maxQty: null, unitPrice: 42, label: '500+ pairs' }
    ],
    sampleAvailable: true,
    samplePrice: 150,
    isCustomizable: true,
    status: 'active',
    createdAt: '2026-02-12'
  },
  {
    id: 'prod-007',
    name: 'Bespoke Ostrich Heart-Stitch Western Boot',
    slug: 'bespoke-ostrich-heart-stitch-western-boot',
    sku: 'CST-WST-007',
    category: 'Western & Cowboy Boots',
    categorySlug: 'western-boots',
    subCategory: 'Exotic Leather Cowboy',
    gender: 'Unisex',
    style: 'Western & Cowboy',
    tagline: 'Authentic Olive Green Ostrich vamp with ivory shaft & hand-stitched heart embroidery',
    description: 'A showstopping western boot featuring a full quill olive green ostrich vamp paired with a pristine ivory leather shaft decorated with intricate heart embroidery stitchwork. Built with a lemonwood-pegged arch, stacked leather heel, and double-stitched storm welt.',
    leatherType: 'Full-Quill Ostrich Vamp & Veg-Tan Shaft',
    leatherGrade: 'Grade AA Exotic Leather',
    upperMaterial: 'Full-Quill Ostrich & Calfskin',
    liningMaterial: 'Soft Calfskin Shaft Lining',
    outsoleMaterial: 'Hand-Finished Argentine Veg-Tan Leather Sole',
    construction: 'Goodyear Welted (360°)',
    countryOfOrigin: 'Leon, Mexico',
    careInstructions: 'Clean with delicate exotic leather conditioner and soft cloth.',
    weightGrams: 820,
    featured: true,
    leadTimeWeeks: '4-5 Weeks',
    moq: 24,
    cartonMultiple: 12,
    images: [
      '/assets/aistudio/0176322e-9832-43b3-83ca-0c37c0d9273a_add62fbd.jpg'
    ],
    colors: [
      { name: 'Olive Ostrich / Ivory', hex: '#5B6834', code: 'OLV' }
    ],
    sizes: [
      { us: '8.0', uk: '7.0', eu: '41', stock: 75 },
      { us: '8.5', uk: '7.5', eu: '41.5', stock: 110 },
      { us: '9.0', uk: '8.0', eu: '42', stock: 140 },
      { us: '9.5', uk: '8.5', eu: '42.5', stock: 130 },
      { us: '10.0', uk: '9.0', eu: '43', stock: 150 },
      { us: '10.5', uk: '9.5', eu: '43.5', stock: 90 },
      { us: '11.0', uk: '10.0', eu: '44', stock: 65 }
    ],
    tiers: [
      { minQty: 24, maxQty: 49, unitPrice: 92, label: '24–49 pairs' },
      { minQty: 50, maxQty: 99, unitPrice: 84, label: '50–99 pairs' },
      { minQty: 100, maxQty: 249, unitPrice: 76, label: '100–249 pairs' },
      { minQty: 250, maxQty: null, unitPrice: 68, label: '250+ pairs' }
    ],
    sampleAvailable: true,
    samplePrice: 135,
    isCustomizable: true,
    status: 'active',
    createdAt: '2026-02-18'
  },
  {
    id: 'prod-008',
    name: 'High-Roller Casino Embossed Cowboy Boot',
    slug: 'high-roller-casino-embossed-cowboy-boot',
    sku: 'CST-WST-008',
    category: 'Western & Cowboy Boots',
    categorySlug: 'western-boots',
    subCategory: 'Statement Western',
    gender: 'Unisex',
    style: 'Western & Cowboy',
    tagline: 'Black suede vamp with ivory card suit & slot machine red embroidery',
    description: 'High-octane western tailoring featuring a velvety jet-black roughout suede vamp and a stark white shaft adorned with red embroidered playing cards, dice, 8-balls, and slot machine symbols. Finished with a square toe, slanted riding heel, and spur ridge.',
    leatherType: 'Black Roughout Suede & White Nappa Leather',
    leatherGrade: 'Premium Heavy Suede',
    upperMaterial: 'Roughout Suede & Calfskin Shaft',
    liningMaterial: 'Breathable Glove Calfskin',
    outsoleMaterial: 'Oiled Heavy Leather Sole with Brass Nails',
    construction: 'Goodyear Welted (360°)',
    countryOfOrigin: 'Leon, Mexico',
    careInstructions: 'Brush suede vamp with crepe brush; wipe shaft with damp leather cloth.',
    weightGrams: 840,
    featured: true,
    leadTimeWeeks: '4-5 Weeks',
    moq: 24,
    cartonMultiple: 12,
    images: [
      '/assets/aistudio/07f01009-8044-4e64-afa6-20fcc5858da6_00fbf388.jpg'
    ],
    colors: [
      { name: 'Vegas Black / White', hex: '#111111', code: 'VGS' }
    ],
    sizes: [
      { us: '8.0', uk: '7.0', eu: '41', stock: 60 },
      { us: '8.5', uk: '7.5', eu: '41.5', stock: 95 },
      { us: '9.0', uk: '8.0', eu: '42', stock: 120 },
      { us: '9.5', uk: '8.5', eu: '42.5', stock: 110 },
      { us: '10.0', uk: '9.0', eu: '43', stock: 130 },
      { us: '10.5', uk: '9.5', eu: '43.5', stock: 85 }
    ],
    tiers: [
      { minQty: 24, maxQty: 49, unitPrice: 88, label: '24–49 pairs' },
      { minQty: 50, maxQty: 99, unitPrice: 79, label: '50–99 pairs' },
      { minQty: 100, maxQty: 249, unitPrice: 71, label: '100–249 pairs' },
      { minQty: 250, maxQty: null, unitPrice: 64, label: '250+ pairs' }
    ],
    sampleAvailable: true,
    samplePrice: 125,
    isCustomizable: true,
    status: 'active',
    createdAt: '2026-02-20'
  },
  {
    id: 'prod-009',
    name: 'Artisanal Monogram Suede Western Boot',
    slug: 'artisanal-monogram-suede-western-boot',
    sku: 'CST-WST-009',
    category: 'Western & Cowboy Boots',
    categorySlug: 'western-boots',
    subCategory: 'Heritage Custom Western',
    gender: 'Unisex',
    style: 'Western & Cowboy',
    tagline: 'Embossed alligator-texture black vamp with sandstone suede embroidered shaft',
    description: 'An executive western silhouette combining a textured black alligator-grain leather foot with a rich sandstone suede upper featuring custom monogram pulls and flame stitching. Ideal for bespoke retail collections and boutique western programs.',
    leatherType: 'Embossed Crocodile Calf & Tuscan Suede',
    leatherGrade: 'Grade A Veg-Tan Leather',
    upperMaterial: 'Embossed Leather Foot & Suede Shaft',
    liningMaterial: 'Soft Tan Calfskin Lining',
    outsoleMaterial: 'Hand-Cut Double Leather Sole',
    construction: 'Goodyear Welted (360°)',
    countryOfOrigin: 'Almansa, Spain',
    careInstructions: 'Apply wax polish to foot section; protect suede shaft with nanomister.',
    weightGrams: 790,
    featured: true,
    leadTimeWeeks: '4-5 Weeks',
    moq: 24,
    cartonMultiple: 12,
    images: [
      '/assets/aistudio/6f528181-2367-4a19-a47f-8789cf085567_c6a3f7e2.jpg'
    ],
    colors: [
      { name: 'Onyx Alligator / Sandstone', hex: '#2B2825', code: 'OAS' }
    ],
    sizes: [
      { us: '8.0', uk: '7.0', eu: '41', stock: 85 },
      { us: '8.5', uk: '7.5', eu: '41.5', stock: 120 },
      { us: '9.0', uk: '8.0', eu: '42', stock: 150 },
      { us: '9.5', uk: '8.5', eu: '42.5', stock: 135 },
      { us: '10.0', uk: '9.0', eu: '43', stock: 140 },
      { us: '11.0', uk: '10.0', eu: '44', stock: 80 }
    ],
    tiers: [
      { minQty: 24, maxQty: 49, unitPrice: 86, label: '24–49 pairs' },
      { minQty: 50, maxQty: 99, unitPrice: 78, label: '50–99 pairs' },
      { minQty: 100, maxQty: 249, unitPrice: 70, label: '100–249 pairs' },
      { minQty: 250, maxQty: null, unitPrice: 62, label: '250+ pairs' }
    ],
    sampleAvailable: true,
    samplePrice: 120,
    isCustomizable: true,
    status: 'active',
    createdAt: '2026-02-22'
  },
  {
    id: 'prod-010',
    name: 'Equestrian Magenta Suede Western Boot',
    slug: 'equestrian-magenta-suede-western-boot',
    sku: 'CST-WST-010',
    category: 'Western & Cowboy Boots',
    categorySlug: 'western-boots',
    subCategory: 'Suede Western',
    gender: 'Women',
    style: 'Western & Cowboy',
    tagline: 'Electric magenta reverse calf suede vamp with ivory stitched tall shaft',
    description: 'Vibrant runway fashion meets authentic equestrian construction. Features butter-soft Italian reverse calf suede in brilliant magenta purple, paired with a white calfskin shaft and intricate multi-row needle stitching. Completed with a leather spur lip and stacked cuban heel.',
    leatherType: 'Italian Magenta Suede & White Nappa Calf',
    leatherGrade: 'Silk Suede Grade A',
    upperMaterial: 'Calf Suede & Full Grain Leather',
    liningMaterial: 'Glove Calf Lining',
    outsoleMaterial: 'Single Leather Sole with Rubber Traction Pad',
    construction: 'Goodyear Welted (360°)',
    countryOfOrigin: 'Florence, Italy',
    careInstructions: 'Protect with suede protector spray and brass suede brush.',
    weightGrams: 720,
    featured: true,
    leadTimeWeeks: '3-4 Weeks',
    moq: 24,
    cartonMultiple: 12,
    images: [
      '/assets/aistudio/b05d2d45-bcf6-4201-955e-9741e94c9d3c_fe17a406.jpg'
    ],
    colors: [
      { name: 'Magenta Velvet / Ivory', hex: '#8E1B57', code: 'MAG' }
    ],
    sizes: [
      { us: '6.0', uk: '4.0', eu: '37', stock: 90 },
      { us: '7.0', uk: '5.0', eu: '38', stock: 140 },
      { us: '8.0', uk: '6.0', eu: '39', stock: 180 },
      { us: '8.5', uk: '6.5', eu: '39.5', stock: 150 },
      { us: '9.0', uk: '7.0', eu: '40', stock: 120 },
      { us: '10.0', uk: '8.0', eu: '41', stock: 70 }
    ],
    tiers: [
      { minQty: 24, maxQty: 49, unitPrice: 84, label: '24–49 pairs' },
      { minQty: 50, maxQty: 99, unitPrice: 76, label: '50–99 pairs' },
      { minQty: 100, maxQty: 249, unitPrice: 68, label: '100–249 pairs' },
      { minQty: 250, maxQty: null, unitPrice: 60, label: '250+ pairs' }
    ],
    sampleAvailable: true,
    samplePrice: 118,
    isCustomizable: true,
    status: 'active',
    createdAt: '2026-02-25'
  },
  {
    id: 'prod-011',
    name: 'Rose Alligator-Grain Winged Western Boot',
    slug: 'rose-alligator-grain-winged-western-boot',
    sku: 'CST-WST-011',
    category: 'Western & Cowboy Boots',
    categorySlug: 'western-boots',
    subCategory: 'Exotic Embossed',
    gender: 'Women',
    style: 'Western & Cowboy',
    tagline: 'Dusty rose alligator embossed leather foot with embroidered eagle wings shaft',
    description: 'An extraordinary luxury western boot featuring hand-dyed rose alligator embossed leather on the foot and heel counter. The tall ivory shaft is detailed with delicate pink wing threadwork. Hand-pegged arch support and polished veg-tan outsole.',
    leatherType: 'Embossed Alligator Veg-Tan Leather',
    leatherGrade: 'Grade AA French Calf',
    upperMaterial: 'Embossed Calfskin & Smooth Nappa',
    liningMaterial: '100% Calfskin Lining',
    outsoleMaterial: 'Leather Sole with Inked Edges',
    construction: 'Goodyear Welted (360°)',
    countryOfOrigin: 'Porto, Portugal',
    careInstructions: 'Clean gently with leather balm and soft microfiber cloth.',
    weightGrams: 760,
    featured: true,
    leadTimeWeeks: '4 Weeks',
    moq: 24,
    cartonMultiple: 12,
    images: [
      '/assets/aistudio/78d6d521-3773-4a82-90b1-83c1960db6e5_2212bde3.jpg'
    ],
    colors: [
      { name: 'Dusty Rose Alligator', hex: '#B85273', code: 'ROS' }
    ],
    sizes: [
      { us: '6.5', uk: '4.5', eu: '37.5', stock: 80 },
      { us: '7.0', uk: '5.0', eu: '38', stock: 130 },
      { us: '7.5', uk: '5.5', eu: '38.5', stock: 140 },
      { us: '8.0', uk: '6.0', eu: '39', stock: 160 },
      { us: '8.5', uk: '6.5', eu: '39.5', stock: 120 },
      { us: '9.0', uk: '7.0', eu: '40', stock: 90 }
    ],
    tiers: [
      { minQty: 24, maxQty: 49, unitPrice: 89, label: '24–49 pairs' },
      { minQty: 50, maxQty: 99, unitPrice: 80, label: '50–99 pairs' },
      { minQty: 100, maxQty: 249, unitPrice: 72, label: '100–249 pairs' },
      { minQty: 250, maxQty: null, unitPrice: 65, label: '250+ pairs' }
    ],
    sampleAvailable: true,
    samplePrice: 130,
    isCustomizable: true,
    status: 'active',
    createdAt: '2026-03-01'
  },
  {
    id: 'prod-012',
    name: 'Plum Phoenix Embroidered Western Boot',
    slug: 'plum-phoenix-embroidered-western-boot',
    sku: 'CST-WST-012',
    category: 'Western & Cowboy Boots',
    categorySlug: 'western-boots',
    subCategory: 'Suede Western',
    gender: 'Women',
    style: 'Western & Cowboy',
    tagline: 'Deep plum suede foot with white shaft & phoenix wing stitch flourish',
    description: 'A striking statement piece crafted with a luxurious deep plum suede foot and a tall white shaft displaying outstretched phoenix wing embroidery. Features a broad square toe, lemonwood pegs, and storm welted sole.',
    leatherType: 'Italian Plum Suede & White Nappa',
    leatherGrade: 'Grade A Calfskin',
    upperMaterial: 'Calf Suede & Smooth Calfskin',
    liningMaterial: 'Calfskin Quarter & Vamp Lining',
    outsoleMaterial: 'Heavy Leather Sole with Rubber Tap',
    construction: 'Goodyear Welted (360°)',
    countryOfOrigin: 'Leon, Mexico',
    careInstructions: 'Protect with suede nano-waterproofing spray.',
    weightGrams: 740,
    featured: true,
    leadTimeWeeks: '3-4 Weeks',
    moq: 24,
    cartonMultiple: 12,
    images: [
      '/assets/aistudio/d03f4f0f-3126-4ea9-b790-b3b052e93461_dcd65a43.jpg'
    ],
    colors: [
      { name: 'Deep Plum / White', hex: '#632043', code: 'PLM' }
    ],
    sizes: [
      { us: '6.0', uk: '4.0', eu: '37', stock: 85 },
      { us: '7.0', uk: '5.0', eu: '38', stock: 125 },
      { us: '8.0', uk: '6.0', eu: '39', stock: 155 },
      { us: '8.5', uk: '6.5', eu: '39.5', stock: 130 },
      { us: '9.0', uk: '7.0', eu: '40', stock: 100 }
    ],
    tiers: [
      { minQty: 24, maxQty: 49, unitPrice: 82, label: '24–49 pairs' },
      { minQty: 50, maxQty: 99, unitPrice: 74, label: '50–99 pairs' },
      { minQty: 100, maxQty: 249, unitPrice: 66, label: '100–249 pairs' },
      { minQty: 250, maxQty: null, unitPrice: 59, label: '250+ pairs' }
    ],
    sampleAvailable: true,
    samplePrice: 115,
    isCustomizable: true,
    status: 'active',
    createdAt: '2026-03-05'
  },
  {
    id: 'prod-013',
    name: 'Bespoke Hand-Burnished Atelier Dress Boot',
    slug: 'bespoke-hand-burnished-atelier-dress-boot',
    sku: 'CST-DRS-013',
    category: 'Dress Boots',
    categorySlug: 'dress-boots',
    subCategory: 'Executive Formal',
    gender: 'Men',
    style: 'Dress',
    tagline: 'Chestnut hand-patinated Italian calfskin with medallion brogued toe cap',
    description: 'An executive dress boot featuring hand-stained chestnut patina with subtle dark gradient shadowing along the welt and toe medallion. Designed with closed-channel leather soling, brass eyelets, and hand-beveled waist.',
    leatherType: 'Italian Crust Calfskin (Hand-Patinated)',
    leatherGrade: 'Supreme Full Grain Crust',
    upperMaterial: 'Hand-Finished Italian Calfskin',
    liningMaterial: '100% Glove Calfskin Lining',
    outsoleMaterial: 'Argentine Leather Sole with Inked Edges',
    construction: 'Goodyear Welted (360°)',
    countryOfOrigin: 'Almansa, Spain',
    careInstructions: 'Apply natural cream polish and buff with horsehair brush.',
    weightGrams: 610,
    featured: true,
    leadTimeWeeks: '4 Weeks',
    moq: 24,
    cartonMultiple: 12,
    images: [
      '/assets/aistudio/image_86c6e33c.png'
    ],
    colors: [
      { name: 'Chestnut Patina', hex: '#68361C', code: 'CHB' }
    ],
    sizes: [
      { us: '8.0', uk: '7.0', eu: '41', stock: 100 },
      { us: '8.5', uk: '7.5', eu: '41.5', stock: 150 },
      { us: '9.0', uk: '8.0', eu: '42', stock: 190 },
      { us: '9.5', uk: '8.5', eu: '42.5', stock: 170 },
      { us: '10.0', uk: '9.0', eu: '43', stock: 180 },
      { us: '10.5', uk: '9.5', eu: '43.5', stock: 130 },
      { us: '11.0', uk: '10.0', eu: '44', stock: 95 }
    ],
    tiers: [
      { minQty: 24, maxQty: 49, unitPrice: 78, label: '24–49 pairs' },
      { minQty: 50, maxQty: 99, unitPrice: 70, label: '50–99 pairs' },
      { minQty: 100, maxQty: 249, unitPrice: 63, label: '100–249 pairs' },
      { minQty: 250, maxQty: null, unitPrice: 56, label: '250+ pairs' }
    ],
    sampleAvailable: true,
    samplePrice: 110,
    isCustomizable: true,
    status: 'active',
    createdAt: '2026-03-08'
  }
];

export const CATEGORIES = [
  {
    name: 'All Boots & Shoes',
    slug: 'all',
    count: 13,
    description: 'Explore the complete master wholesale collection of handcrafted footwear.'
  },
  {
    name: 'Western & Cowboy Boots',
    slug: 'western-boots',
    count: 6,
    description: 'Exotic ostrich, suede, embroidered, and statement western boots built with Goodyear welted soles.'
  },
  {
    name: 'Chelsea Boots',
    slug: 'chelsea-boots',
    count: 2,
    description: 'Heritage elasticated ankle boots crafted from full-grain calfskins with Goodyear welted outsoles.'
  },
  {
    name: 'Lace-Up Boots',
    slug: 'lace-up-boots',
    count: 2,
    description: 'Heavyweight utilitarian service boots with triple stitching, commando outsoles, and brass eyelets.'
  },
  {
    name: 'Dress Boots',
    slug: 'dress-boots',
    count: 2,
    description: 'Formal Balmoral and Oxford silhouette boots hand-burnished for executive retail and formal collections.'
  },
  {
    name: 'Chukka Boots',
    slug: 'chukka-boots',
    count: 1,
    description: 'Understated two-eyelet desert boots built from velvety Tuscan reverse calf suede on crepe soles.'
  },
  {
    name: 'Custom & Private Label',
    slug: 'custom-private-label',
    count: 1,
    description: 'Bespoke OEM manufacturing programs with custom branding, proprietary lasts, and buyer packaging.'
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'RFQ-2026-8812',
    companyName: 'Nordic Heritage Footwear ApS',
    contactName: 'Henrik Lindqvist',
    email: 'h.lindqvist@nordicheritage.dk',
    phone: '+45 31 44 28 90',
    country: 'Denmark',
    businessType: 'Footwear Chain',
    website: 'https://nordicheritage.dk',
    items: [
      {
        productId: 'prod-001',
        productName: 'Heritage Chelsea Boot',
        sku: 'CST-CHL-001',
        image: '/assets/images/chelsea_boot_walnut_1793033837576.jpg',
        color: 'Walnut Espresso',
        assortment: [
          { size: '8.5', quantity: 24 },
          { size: '9.0', quantity: 36 },
          { size: '9.5', quantity: 36 },
          { size: '10.0', quantity: 24 }
        ],
        totalQuantity: 120,
        indicativeUnitPrice: 52,
        proposedUnitPrice: 50,
        lineTotal: 6000,
        customBrandingNote: 'Custom stamped Nordic crest on leather insole'
      }
    ],
    destinationPort: 'Port of Copenhagen (CPH-FREE)',
    targetDeliveryDate: '2026-11-20',
    preferredCurrency: 'EUR',
    incoterms: 'CIF',
    targetBudget: 6200,
    requestedSamples: true,
    additionalNotes: 'Require 2 master production samples sent ahead via DHL Express.',
    status: 'Sent to Buyer',
    createdAt: '2026-10-24 14:20',
    updatedAt: '2026-10-25 10:15',
    validUntil: '2026-11-15',
    salesRepAssigned: 'Marcus Vance (Senior Trade Director)',
    internalNotes: 'Client has 14 retail doors across Denmark and Sweden. Approved €50 special tier.',
    subtotal: 6000,
    estimatedFreight: 420,
    grandTotal: 6420,
    buyerFeedback: 'Awaiting internal board approval on Wednesday.'
  },
  {
    id: 'RFQ-2026-8790',
    companyName: 'Beacon & Timber Supply Co.',
    contactName: 'Eleanor Vance',
    email: 'procurement@beaconandtimber.com',
    phone: '+1 (503) 891-3312',
    country: 'United States',
    businessType: 'Retail Boutique',
    website: 'https://beaconandtimber.com',
    items: [
      {
        productId: 'prod-002',
        productName: 'Classic Lace-Up Work Boot',
        sku: 'CST-WRK-002',
        image: '/assets/images/laceup_work_boot_1793033839697.jpg',
        color: 'Cognac Amber',
        assortment: [
          { size: '9.0', quantity: 24 },
          { size: '10.0', quantity: 24 },
          { size: '11.0', quantity: 12 }
        ],
        totalQuantity: 60,
        indicativeUnitPrice: 61,
        proposedUnitPrice: 59,
        lineTotal: 3540
      }
    ],
    destinationPort: 'Port of Seattle / Tacoma',
    targetDeliveryDate: '2026-12-01',
    preferredCurrency: 'USD',
    incoterms: 'FOB',
    requestedSamples: false,
    additionalNotes: 'Need branded shoeboxes with our custom sleeve printing.',
    status: 'Accepted',
    createdAt: '2026-10-20 09:30',
    updatedAt: '2026-10-22 16:45',
    validUntil: '2026-11-10',
    salesRepAssigned: 'Elena Rostova',
    internalNotes: 'Buyer accepted quote on Oct 22. Converting to formal Purchase Order.',
    subtotal: 3540,
    estimatedFreight: 280,
    grandTotal: 3820,
    convertedOrderId: 'ORD-2026-4401'
  },
  {
    id: 'RFQ-2026-8835',
    companyName: 'Kensington Bootmakers Ltd.',
    contactName: 'Arthur Pendelton',
    email: 'arthur@kensingtonboots.co.uk',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    businessType: 'Distributor',
    items: [
      {
        productId: 'prod-003',
        productName: 'Artisanal Oxford Dress Boot',
        sku: 'CST-DRS-003',
        image: '/assets/images/dress_oxford_boot_1793033839140.jpg',
        color: 'Oxblood Burgundy',
        assortment: [
          { size: '8.5', quantity: 50 },
          { size: '9.0', quantity: 100 },
          { size: '9.5', quantity: 50 }
        ],
        totalQuantity: 200,
        indicativeUnitPrice: 65,
        proposedUnitPrice: 65,
        lineTotal: 13000
      }
    ],
    destinationPort: 'Port of Felixstowe',
    targetDeliveryDate: '2026-12-15',
    preferredCurrency: 'GBP',
    incoterms: 'DDP',
    requestedSamples: true,
    additionalNotes: 'Distributor catering to London and Edinburgh bespoke tailors.',
    status: 'New',
    createdAt: '2026-10-26 08:15',
    updatedAt: '2026-10-26 08:15',
    validUntil: '2026-11-25',
    subtotal: 13000,
    estimatedFreight: 750,
    grandTotal: 13750
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-4401',
    poReference: 'PO-BT-9921',
    quoteReference: 'RFQ-2026-8790',
    companyName: 'Beacon & Timber Supply Co.',
    contactName: 'Eleanor Vance',
    email: 'procurement@beaconandtimber.com',
    shippingAddress: {
      line1: '1420 5th Avenue, Suite 1200',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States'
    },
    billingAddress: {
      line1: '1420 5th Avenue, Suite 1200',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States'
    },
    items: [
      {
        productId: 'prod-002',
        productName: 'Classic Lace-Up Work Boot',
        sku: 'CST-WRK-002',
        color: 'Cognac Amber',
        assortment: [
          { size: '9.0', quantity: 24 },
          { size: '10.0', quantity: 24 },
          { size: '11.0', quantity: 12 }
        ],
        totalQuantity: 60,
        unitPrice: 59,
        lineTotal: 3540
      }
    ],
    totalQuantity: 60,
    subtotal: 3540,
    shippingAmount: 280,
    taxAmount: 0,
    grandTotal: 3820,
    currency: 'USD',
    paymentStatus: 'Paid (Net-30)',
    paymentMethod: 'Net-30 Trade Credit',
    fulfillmentStatus: 'In Production',
    carrier: 'Maersk Global Freight',
    productionEstCompletion: '2026-11-14',
    createdAt: '2026-10-22 17:00',
    updatedAt: '2026-10-24 11:30'
  },
  {
    id: 'ORD-2026-4388',
    poReference: 'PO-GLB-3382',
    companyName: 'Milano Calzature Distributori',
    contactName: 'Marco Bellini',
    email: 'm.bellini@milanocalzature.it',
    shippingAddress: {
      line1: 'Via Montenapoleone 28',
      city: 'Milan',
      state: 'MI',
      postalCode: '20121',
      country: 'Italy'
    },
    billingAddress: {
      line1: 'Via Montenapoleone 28',
      city: 'Milan',
      state: 'MI',
      postalCode: '20121',
      country: 'Italy'
    },
    items: [
      {
        productId: 'prod-001',
        productName: 'Heritage Chelsea Boot',
        sku: 'CST-CHL-001',
        color: 'Walnut Espresso',
        assortment: [
          { size: '8.0', quantity: 24 },
          { size: '9.0', quantity: 48 },
          { size: '10.0', quantity: 48 }
        ],
        totalQuantity: 120,
        unitPrice: 52,
        lineTotal: 6240
      }
    ],
    totalQuantity: 120,
    subtotal: 6240,
    shippingAmount: 390,
    taxAmount: 0,
    grandTotal: 6630,
    currency: 'EUR',
    paymentStatus: 'Paid (Wire Transfer)',
    paymentMethod: 'Wire Transfer / T/T',
    fulfillmentStatus: 'Shipped',
    trackingNumber: 'MSK-992144810-EU',
    carrier: 'DHL Global Forwarding',
    createdAt: '2026-10-12 11:00',
    updatedAt: '2026-10-23 15:45'
  }
];

export const INITIAL_APPLICATIONS: CustomerApplication[] = [
  {
    id: 'APP-2026-109',
    companyName: 'Highland Cobblers & Clothiers',
    tradingName: 'Highland Co.',
    businessNumber: 'GB 921 4481 02',
    contactName: 'Rory MacLeod',
    email: 'rory@highlandclothiers.co.uk',
    phone: '+44 131 556 8921',
    annualVolumeEst: '250–500 pairs / quarter',
    businessType: 'Retail Footwear Specialist',
    status: 'Pending Review',
    assignedTier: 'Standard Wholesale',
    notes: 'Established 3 stores across Edinburgh and Glasgow. Interested in private-label service boots.',
    createdAt: '2026-10-25 15:40'
  },
  {
    id: 'APP-2026-104',
    companyName: 'Beacon & Timber Supply Co.',
    businessNumber: 'US 91-4401928',
    contactName: 'Eleanor Vance',
    email: 'procurement@beaconandtimber.com',
    phone: '+1 (503) 891-3312',
    annualVolumeEst: '500–1,000 pairs / year',
    businessType: 'Premium Menswear & Goods',
    status: 'Approved',
    assignedTier: 'Gold Volume Partner',
    notes: 'Approved Net-30 terms up to $25,000 credit line after credit references verification.',
    createdAt: '2026-10-18 10:15'
  }
];

export const DEFAULT_CMS: CMSContent = {
  heroHeadline: 'Artisanal Bench-Made Leather Boots for Discerning Retailers & Global Brands.',
  heroSubheadline: 'Handcrafted Goodyear-welted boots forged with certified French & Italian tanneries. Scalable bulk volume pricing, transparent lead times, and comprehensive OEM private-label production.',
  announcementBar: 'Autumn / Winter 2026 Wholesale Production Bookings Open · Minimum 24 Pairs per Style',
  aboutStory: 'Founded upon three generations of master shoemaking heritage, Covent & Stone bridges centuries-old European bench-craft with modern international trade transparency. We supply over 140 leading menswear boutiques, industrial suppliers, and private-label shoe labels across 22 countries.',
  craftsmanshipTitle: 'Goodyear Welted Durability & Uncompromising Materials',
  craftsmanshipText: 'Every pair passes through over 200 individual manual bench procedures: hand-selecting Grade-A calfskins, skiving, lasting over bespoke wooden lasts, cork bed cavity filling for ergonomic thermal balance, and lock-stitching authentic storm welts for complete resolability.',
  qcGuaranteeText: '100% individual pair inspection before carton packout. Zero tolerance for grain flaws, uneven welt stitching, or heel delamination.',
  contactEmail: 'trade@coventstone.com',
  contactPhone: '+1 (212) 890-4420',
  showroomAddress: '74 Mercer Street, Suite 4B, SoHo, New York, NY 10012'
};

export const DEFAULT_SETTINGS: SiteSettings = {
  brandName: 'COVENT & STONE',
  defaultCurrency: 'USD',
  defaultMoq: 24,
  allowSampleOrdering: true,
  leadTimeWeeksDefault: 4,
  autoQuoteExpiryDays: 21
};
