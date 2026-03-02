export interface RawMenuItem {
  id: number;
  name: string;
  vegetarian?: boolean;
  soy?: boolean;
  gluten?: boolean;
  wheat?: boolean;
  dairy?: boolean;
  vegan?: boolean;
  low_carbon?: boolean;
  egg?: boolean;
  sesame?: boolean;
  halal?: boolean;
  tree_nuts?: boolean;
  high_carbon?: boolean;
  fish?: boolean;
  shellfish?: boolean;
  alcohol?: boolean;
  peanuts?: boolean;
}

export type MenuItemsByMealPeriodResponse = Record<string, RawMenuItem[]>;

export interface DiningHall {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  bgColor: string;
}

export interface MenuItem {
  id: number;
  name: string;
  hallId: number;
  hallName: string;
  mealPeriod: string;
  category: string;
  dietaryLabels: string[];
  allergens: string[];
  ingredients?: string[];
  rating?: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  hallId: number;
  hallName: string;
  items: MenuItem[];
}

export interface MenuState {
  menuByHall: Record<
    number,
    {
      hall: DiningHall;
      categories: MenuCategory[];
    }
  >;
  allMenuItems: MenuItem[];
  loading: boolean;
  error: string | null;
}

