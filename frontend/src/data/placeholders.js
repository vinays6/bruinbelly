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
  { id: 'p1', username: 'bruin_foodie', initials: 'BF', avatarColor: '#FFB5C8', itemName: 'Chocolate-Hazelnut & Seasonal Fresh Fruit Belgian Waffle', restaurant: 'Study', rating: 8.4, comment: 'Make sure to get this fast, the warm waffle with the sweetness is really good', date: 'Today, 5:42 PM', likes: 24 },
  { id: 'p2', username: 'hungry_bruin', initials: 'HB', avatarColor: '#B8E4FF', itemName: 'Sirloin Steak Quesadilla', restaurant: 'Rendezvous', rating: 9.3, comment: 'Genuinely best thing on the Hill quarter, I get it every Sunday.', date: 'Yesterday, 12:15 PM', likes: 41 },
  { id: 'p3', username: 'ucla_eats_2026', initials: 'UE', avatarColor: '#D4B8FF', itemName: 'Lemon Dijon Roasted Salmon', restaurant: 'Bruin Bowl', rating: 8.9, comment: 'Bruinbowl is actually underrated. I always get the salmon but the others are good asw.', date: '2 days ago', likes: 17 },
  { id: 'p4', username: 'westwood_wanderer', initials: 'WW', avatarColor: '#FFD6BA', itemName: 'Mount Vesuvius', restaurant: 'Cafe 1919', rating: 9.1, comment: 'Perfect brownie with a molten center, and you get a huge scoop of ice cream. Wish it was here on weekends.', date: '3 days ago', likes: 58 },
  { id: 'p5', username: 'hill_life_305', initials: 'HL', avatarColor: '#B8F0D4', itemName: 'Spaghetti Bolognese', restaurant: 'Epicuria at Ackerman', rating: 8.6, comment: 'Slightly worse than the meatballs last quarter but still a solid classic.', date: '4 days ago', likes: 33 },
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
  name: 'BYO Yogurt Bowl', restaurant: 'Study', rating: 9.3,
  reviews: '127', emoji: '🍦',
  summary: 'Bruins are all over this one this week. Fresh fruit, solid yogurt, and consistent quality for an easy breakfast.',
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
