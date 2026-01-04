
import { Pizza, Ingredient, Dough } from './types';

export const WHATSAPP_NUMBER = "56930121625";

export const DOUGH_TYPES: Dough[] = [
  { id: 'd-1', name: 'Masa Tradicional', price: 0, calories: 1200, description: 'Nuestra masa clásica de fermentación lenta de 48 horas.' },
  { id: 'd-2', name: 'Masa Fina y Crujiente', price: 500, calories: 900, description: 'Delgada, ligera y con un "crunch" inigualable.' },
  { id: 'd-3', name: 'Borde de Queso Fundido', price: 2500, calories: 1800, description: 'Rellena de mozzarella premium directamente al horno.' },
  { id: 'd-4', name: 'Integral con Semillas', price: 1200, calories: 1000, description: 'Mix de granos seleccionados para un sabor rústico y saludable.' }
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
    ingredientsList: ['Pomodoro italiano', 'Doble Mozzarella', 'Jamón pierna', 'Piña caramelizada'],
    history: 'Una receta controversial perfeccionada en Talca: asamos la piña con azúcar rubia para eliminar la acidez.'
  },
  {
    id: 'spec-2',
    name: 'Veggie del Valle',
    description: 'Mix de pimentón, champiñones París, aceitunas negras, cebolla morada y choclo tierno.',
    price: 11500,
    calories: 1750,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800',
    type: 'special',
    ingredientsList: ['Pomodoro', 'Mozzarella de campo', 'Verduras grilladas', 'Champiñón París', 'Choclo'],
    history: 'Un homenaje a las ferias libres del Maule. Ingredientes frescos seleccionados cada mañana.'
  }
];

export const TRADITIONAL_PIZZAS: Pizza[] = [
  {
    id: 'trad-1',
    name: 'Margarita Original',
    description: 'Salsa de tomate casera, mozzarella, albahaca fresca y aceite de oliva.',
    price: 8500,
    calories: 1800,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?auto=format&fit=crop&q=80&w=800',
    type: 'traditional',
    ingredientsList: ['Pomodoro', 'Mozzarella Fior di Latte', 'Albahaca fresca', 'Aceite de oliva extra virgen'],
    history: 'La elegancia de lo simple. Usamos albahaca de huertos locales de San Clemente.'
  },
  {
    id: 'trad-2',
    name: 'Pepperoni Clásica',
    description: 'Salsa de tomate, abundante mozzarella y rodajas de pepperoni premium.',
    price: 9900,
    calories: 2400,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800',
    type: 'traditional',
    ingredientsList: ['Pomodoro', 'Mozzarella', 'Pepperoni americano'],
    history: 'Nuestra pizza más vendida en el centro de Talca. Intensa, picante y siempre crujiente.'
  },
  {
    id: 'trad-3',
    name: 'Napolitana del Maule',
    description: 'Salsa de tomate, mozzarella, tomate fresco, orégano y aceitunas negras.',
    price: 9500,
    calories: 2100,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=800',
    type: 'traditional',
    ingredientsList: ['Pomodoro', 'Mozzarella', 'Tomate limachino', 'Orégano', 'Aceitunas Azapa'],
    history: 'Inspirada en las tardes de verano maulinas, usando tomates madurados bajo nuestro sol central.'
  },
  {
    id: 'trad-4',
    name: 'Fugazza de la Estación',
    description: 'Cebolla blanca caramelizada, mozzarella, aceite de oliva y especias.',
    price: 8900,
    calories: 1950,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    type: 'traditional',
    ingredientsList: ['Mozzarella', 'Cebolla blanca', 'Aceite de oliva', 'Pimienta negra'],
    history: 'Un clásico que llegó con los trenes a la Estación de Talca y se quedó en nuestro horno.'
  },
  {
    id: 'trad-5',
    name: 'Jamón y Morrón Asado',
    description: 'Salsa de tomate, mozzarella, jamón pierna y pimentón asado a la leña.',
    price: 10500,
    calories: 2250,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800',
    type: 'traditional',
    ingredientsList: ['Pomodoro', 'Mozzarella', 'Jamón pierna', 'Pimientos asados'],
    history: 'El sabor ahumado del pimentón nos recuerda a las cocinas antiguas de las casonas rurales del Maule.'
  },
  {
    id: 'trad-6',
    name: 'Cuatro Quesos Pro',
    description: 'Fusión de mozzarella, gorgonzola, parmesano maduro y provolone ahumado.',
    price: 11200,
    calories: 2800,
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&q=80&w=800',
    type: 'traditional',
    ingredientsList: ['Mozzarella', 'Gorgonzola D.O.P', 'Parmesano 12 meses', 'Provolone'],
    history: 'Una explosión de intensidad quesera diseñada para los paladares más exigentes de la región.'
  },
  {
    id: 'trad-7',
    name: 'Caprese Premium',
    description: 'Mozzarella Fior di Latte, tomate cherry, albahaca y pesto de nuez.',
    price: 9800,
    calories: 2050,
    image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&q=80&w=800',
    type: 'traditional',
    ingredientsList: ['Mozzarella', 'Tomate Cherry', 'Albahaca', 'Pesto de nueces maulinas'],
    history: 'Frescura total. Nuestro pesto se elabora con nueces seleccionadas de la zona de Pencahue.'
  }
];

export const AVAILABLE_INGREDIENTS: Ingredient[] = [
  { id: 'ing-8', name: 'Extra Mozzarella', price: 1500, calories: 450 },
  { id: 'ing-1', name: 'Pepperoni Premium', price: 1500, calories: 350 },
  { id: 'ing-3', name: 'Tocino Ahumado', price: 1800, calories: 400 },
  { id: 'ing-2', name: 'Jamón de Pierna', price: 1200, calories: 150 },
  { id: 'ing-12', name: 'Pollo Grillado', price: 1800, calories: 250 },
  { id: 'ing-4', name: 'Champiñones París', price: 1000, calories: 20 },
  { id: 'ing-5', name: 'Pimentón Asado', price: 800, calories: 30 },
  { id: 'ing-6', name: 'Aceitunas Azapa', price: 800, calories: 80 },
  { id: 'ing-11', name: 'Choclo Tierno', price: 800, calories: 110 },
  { id: 'ing-7', name: 'Cebolla Morada', price: 700, calories: 40 },
  { id: 'ing-9', name: 'Piña Caramelizada', price: 1000, calories: 90 },
  { id: 'ing-10', name: 'Albahaca Fresca', price: 600, calories: 5 }
];

export const CUSTOM_BASE_PRICE = 7000;
export const CUSTOM_BASE_CALORIES = 600;
