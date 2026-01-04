
export interface Ingredient {
  id: string;
  name: string;
  price: number;
  calories?: number;
}

export interface Dough {
  id: string;
  name: string;
  price: number;
  calories: number;
  description: string;
}

export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: 'traditional' | 'special' | 'custom';
  calories: number; 
  ingredientsList: string[]; // Lista completa de ingredientes base
  history: string; // Historia/Relato de la pizza
  dough?: Dough;
}

export interface CartItem {
  id: string;
  pizza: Pizza;
  quantity: number;
  customIngredients?: Ingredient[];
}
