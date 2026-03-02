// CURRENT_USER is now set dynamically from login. Remove static version.

export const DINING_HALLS = [
  {
    id: 'de-neve', name: 'De Neve Dining Hall', emoji: '🏛️', bgColor: '#FFD6BA',
    items: [
      { id: 'dn-1', name: 'Al Pastor Pork Street Tacos', rating: 8.4, category: 'Entree', dietary: 'GF' },
      { id: 'dn-2', name: 'Mexican Rice', rating: 7.2, category: 'Entree', dietary: 'V' },
      { id: 'dn-3', name: 'Beyond Burger', rating: 5.8, category: 'Salad', dietary: 'V' },
      { id: 'dn-4', name: 'Cilantro Rice', rating: 7.1, category: 'Dessert', dietary: '' },
    ],
  },
  {
    id: 'epicuria', name: 'Epicuria at Covel', emoji: '🌿', bgColor: '#C8ECDC',
    items: [
      { id: 'ep-1', name: 'Cheese Ravioli w/ Mushroom Sauce', rating: 9.2, category: 'Entree', dietary: 'VG' },
      { id: 'ep-2', name: 'Citrus Basmati Rice', rating: 8.0, category: 'Entree', dietary: 'V' },
      { id: 'ep-3', name: 'Corn Couscous Fritter', rating: 6.5, category: 'Entree', dietary: 'VG' },
    ],
  },
  {
    id: 'bruin-plate', name: 'Bruin Plate', emoji: '🥦', bgColor: '#B8F0D4',
    items: [
      { id: 'bp-1', name: 'Frijoles de la Olla', rating: 8.3, category: 'Entree', dietary: 'VG' },
      { id: 'bp-2', name: 'Spicy Beef & Eggplant Flatbread', rating: 7.7, category: 'Entree', dietary: 'VG' },
      { id: 'bp-3', name: 'Halal Garlic Orange Chicken Thigh', rating: 9.3, category: 'Entree', dietary: 'VG' },
    ],
  },
  {
    id: 'feast', name: 'Feast at Rieber', emoji: '🍜', bgColor: '#FFF3B8',
    items: [
      { id: 'fe-1', name: 'Spam Fried Rice', rating: 8.6, category: 'Entree', dietary: '' },
      { id: 'fe-2', name: 'Spicy Beef Udon', rating: 6.9, category: 'Entree', dietary: '' },
    ],
  },
];

export const FEED_POSTS = [
  { id: 'p1', username: 'bruin_foodie', initials: 'BF', avatarColor: '#FFB5C8', itemName: 'Grilled Salmon', restaurant: 'De Neve', rating: 8.4, comment: 'The salmon was perfectly cooked, crispy outside and tender inside. Go before 6pm!', date: 'Today, 5:42 PM', likes: 24 },
  { id: 'p2', username: 'hungry_bruin', initials: 'HB', avatarColor: '#B8E4FF', itemName: 'Acai Power Bowl', restaurant: 'Bruin Plate', rating: 9.3, comment: 'Best thing on The Hill this quarter. Fresh granola and balanced sweetness.', date: 'Yesterday, 12:15 PM', likes: 41 },
  { id: 'p3', username: 'ucla_eats_2026', initials: 'UE', avatarColor: '#D4B8FF', itemName: 'Mediterranean Bowl', restaurant: 'Epicuria', rating: 8.9, comment: 'Epicuria never misses. Warm pita and fresh hummus were excellent.', date: '2 days ago', likes: 17 },
  { id: 'p4', username: 'westwood_wanderer', initials: 'WW', avatarColor: '#FFD6BA', itemName: 'Chocolate Lava Cake', restaurant: 'De Neve', rating: 9.1, comment: 'Perfect molten center every time. Dessert team at De Neve is elite.', date: '3 days ago', likes: 58 },
  { id: 'p5', username: 'hill_life_305', initials: 'HL', avatarColor: '#B8F0D4', itemName: 'Ramen Bowl', restaurant: 'Feast', rating: 8.6, comment: 'Rich broth, chewy noodles, perfect soft-boiled egg. Go early before it sells out.', date: '4 days ago', likes: 33 },
];

export const CALENDAR_DAYS = [
  { day: 'Sun', date: 'Mar 1', restaurant: 'Epicuria', meal: 'Ravioli Primavera', emoji: '🍗', why: 'Epicuria\'s Ravioli Primavera is a fan favorite, known for its rich flavors and generous portions.' },
  { day: 'Mon', date: 'Mar 2', restaurant: 'De Neve', meal: 'Cheese Pizza', emoji: '🍕', why: 'Late night De Neve pizza has always been a staple of hill culture.' },
  { day: 'Tue', date: 'Mar 3', restaurant: 'Bruin Café', meal: 'Acaí Bowl', emoji: '🫐', why: 'Most-liked desert this month. Lines are worth and always tastes fresh.' },
  { day: 'Wed', date: 'Mar 4', restaurant: 'Epicuria', meal: 'Middle Eastern-style Grilled Chicken w/ Cucumber Relish', emoji: '🌿', why: 'Middle Eastern menu lands midweek and usually scores very highly from repeat diners.' },
  { day: 'Thu', date: 'Mar 5', restaurant: 'Feast at Rieber', meal: 'Mochi Ice Cream', emoji: '🍡', why: 'Potentially one of the most well-recieved deserts ever introduced.' },
  { day: 'Fri', date: 'Mar 6', restaurant: 'Study', meal: 'Sandwich', emoji: '🥪', why: 'One of the most consistent meals for consistent study-ers.' },
  { day: 'Sat', date: 'Mar 7', restaurant: 'Bruin Plate', meal: 'Spicy Winter Squash Tortilla Pizza', emoji: '🍕', why: 'Although it might not yet be the most popular, this flatbread has consistently scored very highly amongst select users.' },
];

export const TRENDING = {
  name: 'Acai Power Bowl', restaurant: 'Bruin Plate', rating: 9.3,
  reviews: '127', emoji: '🫐',
  summary: 'Bruins are all over this one this week. Fresh granola, solid fruit portions, and consistent quality.',
};

export const ITEM_DETAILS = {
  'dn-1': {
    name: 'Grilled Salmon',
    restaurant: 'De Neve Dining Hall',
    avgRating: 8.4,
    description: 'Atlantic salmon fillet grilled with lemon herb butter and served with seasonal vegetables.',
    labels: ['Gluten-Free', 'High Protein', 'Contains Fish'],
    allergens: ['Fish', 'Dairy', 'Soy'],
    ingredients: ['Atlantic Salmon', 'Lemon Butter', 'Garlic', 'Fresh Dill', 'Olive Oil', 'Sea Salt', 'Black Pepper', 'Seasonal Vegetables'],
  },
  'dn-2': {
    name: 'Pasta Primavera',
    restaurant: 'De Neve Dining Hall',
    avgRating: 7.2,
    description: 'Penne in garlic olive oil with seasonal vegetables, basil, and parmesan.',
    labels: ['Vegetarian', 'Contains Dairy', 'Contains Gluten'],
    allergens: ['Gluten/Wheat', 'Dairy', 'Eggs'],
    ingredients: ['Penne Pasta', 'Zucchini', 'Bell Peppers', 'Cherry Tomatoes', 'Garlic', 'Olive Oil', 'Parmesan', 'Fresh Basil'],
  },
  'dn-3': {
    name: 'Caesar Salad',
    restaurant: 'De Neve Dining Hall',
    avgRating: 6.8,
    description: 'Romaine with house caesar dressing, croutons, and shaved parmesan.',
    labels: ['Vegetarian', 'Contains Dairy', 'Contains Gluten'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Anchovies'],
    ingredients: ['Romaine Lettuce', 'Caesar Dressing', 'Croutons', 'Parmesan', 'Lemon Juice', 'Black Pepper'],
  },
  'dn-4': {
    name: 'Chocolate Lava Cake',
    restaurant: 'De Neve Dining Hall',
    avgRating: 9.1,
    description: 'Molten dark chocolate cake served warm with a soft center.',
    labels: ['Vegetarian', 'Contains Dairy', 'Contains Gluten'],
    allergens: ['Dairy', 'Eggs', 'Gluten', 'Soy'],
    ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla Extract', 'Salt'],
  },
};

export const DEFAULT_ITEM_DETAIL = {
  name: 'Menu item',
  restaurant: 'UCLA Dining',
  avgRating: 0,
  description: 'A UCLA dining item prepared daily by the culinary team.',
  labels: ['Dining Hall Favorite', 'Student Pick'],
  allergens: ['See dining.ucla.edu for details'],
  ingredients: ['Ingredients list not available in app'],
};

export const PLACEHOLDER_REVIEWS = [
  {
    id: 'rev-placeholder-1',
    username: 'fufu16',
    rating: 4.5,
    comment: "Yo ts was lowk kinda fire can't lie it makes the fact that my bf cheated on me a lot better",
    date: 'Today, 12:30 PM',
    imageUrl: null,
  },
  {
    id: 'rev-placeholder-2',
    username: 'hungryhanson',
    rating: 3.5,
    comment: 'Pretty solid option during the day but you get tired of it soon',
    date: 'Yesterday, 6:15 PM',
    imageUrl: null,
  },
];
