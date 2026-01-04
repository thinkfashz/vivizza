
import { Pizza, Ingredient, Dough } from './types';

export const WHATSAPP_NUMBER = "56930121625";

export const DOUGH_TYPES: Dough[] = [
  { id: 'd-1', name: 'Tradicional', price: 0, calories: 1200, description: 'Nuestra masa clásica de fermentación lenta de 48 horas.' },
  { id: 'd-2', name: 'Masa Fina', price: 500, calories: 900, description: 'Crujiente, delgada y ligera, ideal para los que buscan un bocado liviano.' },
  { id: 'd-3', name: 'Borde de Queso', price: 2500, calories: 1800, description: 'Rellena de mozzarella fundida directamente en el horno de piedra.' },
  { id: 'd-4', name: 'Integral Semillas', price: 1200, calories: 1000, description: 'Mix de granos seleccionados para un toque rústico y nutritivo.' }
];

export const TRADITIONAL_PIZZAS: Pizza[] = [
  {
    id: 'trad-1',
    name: 'Margarita Talquina',
    description: 'Salsa de tomate casera, mozzarella fundida, albahaca fresca y aceite de oliva.',
    price: 8500,
    calories: 1800,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?auto=format&fit=crop&q=80&w=800',
    type: 'traditional',
    ingredientsList: ['Pomodoro italiano', 'Mozzarella de campo', 'Albahaca fresca del Maule', 'Aceite de oliva extra virgen'],
    history: 'Nacida como un homenaje a los colores de la bandera italiana, pero con albahaca cosechada en las huertas de Talca.'
  },
  {
    id: 'trad-2',
    name: 'Pepperoni Classica',
    description: 'Salsa de tomate, abundante mozzarella y rodajas de pepperoni premium.',
    price: 9900,
    calories: 2400,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800',
    type: 'traditional',
    ingredientsList: ['Pomodoro', 'Doble Mozzarella', 'Pepperoni americano curado'],
    history: 'La favorita indiscutida de los viernes en el centro de Talca. Crujiente, sabrosa y siempre satisfactoria.'
  },
  {
    id: 'trad-3',
    name: 'Napolitana del Maule',
    description: 'Salsa de tomate, mozzarella, tomate fresco en rodajas, orégano y aceitunas.',
    price: 9500,
    calories: 2100,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=800',
    type: 'traditional',
    ingredientsList: ['Pomodoro', 'Mozzarella', 'Rodajas de tomate limachino', 'Orégano', 'Aceitunas de Azapa'],
    history: 'Inspirada en las tardes de verano maulinas, utilizando tomates madurados bajo el sol intenso de nuestro Valle Central.'
  },
  {
    id: 'trad-4',
    name: 'Fugazza de la Estación',
    description: 'Cebolla blanca caramelizada, mozzarella, aceite de oliva y especias finas.',
    price: 8900,
    calories: 1950,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    type: 'traditional',
    ingredientsList: ['Mozzarella', 'Cebolla blanca caramelizada', 'Aceite de oliva', 'Pimienta negra'],
    history: 'Un clásico rioplatense que echó raíces en nuestra pizzería de Calle 1 Sur, ganándose el corazón de los viajeros.'
  },
  {
    id: 'trad-5',
    name: 'Jamón y Morrón',
    description: 'Salsa de tomate, mozzarella, jamón pierna y pimentón asado a la leña.',
    price: 10500,
    calories: 2250,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800',
    type: 'traditional',
    ingredientsList: ['Pomodoro', 'Mozzarella', 'Jamón pierna', 'Pimientos asados'],
    history: 'El aroma ahumado del pimentón asado evoca las antiguas cocinas a leña de las casonas históricas de Talca.'
  },
  {
    id: 'trad-6',
    name: 'Cuatro Quesos Pro',
    description: 'Fusión de mozzarella, gorgonzola, parmesano maduro y provolone ahumado.',
    price: 11200,
    calories: 2800,
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&q=80&w=800',
    type: 'traditional',
    ingredientsList: ['Mozzarella', 'Gorgonzola D.O.P', 'Parmesano 12 meses', 'Provolone ahumado'],
    history: 'Una explosión de intensidad diseñada para los paladares más sofisticados de la Región del Maule.'
  },
  {
    id: 'trad-7',
    name: 'Caprese Premium',
    description: 'Mozzarella Fior di Latte, tomate fresco, albahaca y un toque de pesto de nuez.',
    price: 9800,
    calories: 2050,
    image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&q=80&w=800',
    type: 'traditional',
    ingredientsList: ['Mozzarella Fior di Latte', 'Tomate Cherry', 'Albahaca', 'Pesto de nueces maulinas'],
    history: 'Frescura absoluta. El pesto es una receta secreta de la familia, adaptada con nueces de nuestra zona.'
  }
];

export const SPECIAL_PIZZAS: Pizza[] = [
  {
    id: 'spec-1',
    name: 'Hawaiana Vivazza',
    description: 'El equilibrio perfecto entre jamón artesanal y piña asada sobre mozzarella.',
    price: 10800,
    calories: 2150,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
    type: 'special',
    ingredientsList: ['Pomodoro', 'Mozzarella', 'Jamón', 'Piña asada con azúcar rubia'],
    history: 'Atrevida y controversial. Nuestra piña se asa previamente para caramelizar su dulzor natural.'
  },
  {
    id: 'spec-2',
    name: 'Veggie del Valle',
    description: 'Mix de pimentón, champiñones París, aceitunas negras, cebolla morada y choclo tierno.',
    price: 11500,
    calories: 1750,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800',
    type: 'special',
    ingredientsList: ['Pomodoro', 'Mozzarella', 'Verduras grilladas', 'Champiñón París', 'Choclo tierno'],
    history: 'Un jardín en tu mesa. Seleccionamos lo mejor de la feria libre de Talca cada madrugada para ti.'
  }
];

export const AVAILABLE_INGREDIENTS: Ingredient[] = [
  { id: 'ing-8', name: 'Extra Mozzarella', price: 1500, calories: 450 },
  { id: 'ing-1', name: 'Pepperoni', price: 1500, calories: 350 },
  { id: 'ing-3', name: 'Tocino Ahumado', price: 1800, calories: 400 },
  { id: 'ing-2', name: 'Jamón Pierna', price: 1200, calories: 150 },
  { id: 'ing-12', name: 'Pollo Grillado', price: 1800, calories: 250 },
  { id: 'ing-4', name: 'Champiñones', price: 1000, calories: 20 },
  { id: 'ing-5', name: 'Pimentón Asado', price: 800, calories: 30 },
  { id: 'ing-6', name: 'Aceitunas Azapa', price: 800, calories: 80 },
  { id: 'ing-11', name: 'Choclo Tierno', price: 800, calories: 110 },
  { id: 'ing-7', name: 'Cebolla Morada', price: 700, calories: 40 },
  { id: 'ing-9', name: 'Piña Caramelizada', price: 1000, calories: 90 },
  { id: 'ing-10', name: 'Albahaca Fresca', price: 600, calories: 5 }
];

export const CUSTOM_BASE_PRICE = 7000;
export const CUSTOM_BASE_CALORIES = 600;
