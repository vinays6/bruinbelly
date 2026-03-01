export const CURRENT_USER = '[username]';

export const DINING_HALLS = [
  {
    id: 'de-neve', name: '[De Neve Dining Hall]', emoji: '🏛️', bgColor: '#FFD6BA',
    items: [
      { id: 'dn-1', name: '[Grilled Salmon]',      rating: 8.4, category: 'Entree',  dietary: 'GF' },
      { id: 'dn-2', name: '[Pasta Primavera]',     rating: 7.2, category: 'Entree',  dietary: 'V'  },
      { id: 'dn-3', name: '[Caesar Salad]',        rating: 6.8, category: 'Salad',   dietary: 'V'  },
      { id: 'dn-4', name: '[Chocolate Lava Cake]', rating: 9.1, category: 'Dessert', dietary: ''   },
    ],
  },
  {
    id: 'epicuria', name: '[Epicuria at Covel]', emoji: '🌿', bgColor: '#C8ECDC',
    items: [
      { id: 'ep-1', name: '[Mediterranean Bowl]', rating: 8.9, category: 'Entree', dietary: 'VG' },
      { id: 'ep-2', name: '[Wood-fired Pizza]',   rating: 8.0, category: 'Entree', dietary: 'V'  },
      { id: 'ep-3', name: '[Roasted Veggies]',    rating: 6.5, category: 'Side',   dietary: 'VG' },
    ],
  },
  {
    id: 'bruin-plate', name: '[Bruin Plate]', emoji: '🥦', bgColor: '#B8F0D4',
    items: [
      { id: 'bp-1', name: '[Acai Power Bowl]',   rating: 9.3, category: 'Entree', dietary: 'VG' },
      { id: 'bp-2', name: '[Quinoa Grain Bowl]', rating: 7.7, category: 'Entree', dietary: 'VG' },
      { id: 'bp-3', name: '[Green Smoothie]',    rating: 7.0, category: 'Drink',  dietary: 'VG' },
    ],
  },
  {
    id: 'feast', name: '[Feast at Rieber]', emoji: '🍜', bgColor: '#FFF3B8',
    items: [
      { id: 'fe-1', name: '[Ramen Bowl]',       rating: 8.6, category: 'Entree', dietary: '' },
      { id: 'fe-2', name: '[Kung Pao Chicken]', rating: 7.9, category: 'Entree', dietary: '' },
    ],
  },
];

export const FEED_POSTS = [
  { id: 'p1', username: '[bruin_foodie]',     initials: 'BF', avatarColor: '#FFB5C8', itemName: '[Grilled Salmon]',      restaurant: '[De Neve]',    rating: 8.4, comment: '[The salmon was perfectly cooked - crispy outside and incredibly tender inside. Go before 6pm!]',              date: '[Today, 5:42 PM]',    likes: 24 },
  { id: 'p2', username: '[hungry_bruin]',     initials: 'HB', avatarColor: '#B8E4FF', itemName: '[Acai Power Bowl]',     restaurant: '[Bruin Plate]', rating: 9.3, comment: '[Best thing on The Hill all quarter. Granola is fresh and acai is not overly sweet. 10/10.]',               date: '[Yesterday, 12:15 PM]',likes: 41 },
  { id: 'p3', username: '[ucla_eats_2025]',   initials: 'UE', avatarColor: '#D4B8FF', itemName: '[Mediterranean Bowl]',  restaurant: '[Epicuria]',   rating: 8.9, comment: '[Epicuria never misses. Hummus was freshly made and the pita was warm. Worth the trek to Covel.]',        date: '[2 days ago]',        likes: 17 },
  { id: 'p4', username: '[westwood_wanderer]',initials: 'WW', avatarColor: '#FFD6BA', itemName: '[Chocolate Lava Cake]', restaurant: '[De Neve]',    rating: 9.1, comment: '[I dream about this dessert. Perfectly molten center every time. De Neve pastry team is unmatched.]',    date: '[3 days ago]',        likes: 58 },
  { id: 'p5', username: '[hill_life_305]',    initials: 'HL', avatarColor: '#B8F0D4', itemName: '[Ramen Bowl]',          restaurant: '[Feast]',      rating: 8.6, comment: '[Rich broth, chewy noodles, perfect soft-boiled egg. Go early - it runs out fast every time!]',          date: '[4 days ago]',        likes: 33 },
];

export const CALENDAR_DAYS = [
  { day: 'Mon', date: 'Mar 3', restaurant: '[De Neve]',    meal: '[Grilled Salmon Night]',    emoji: '🐟', why: '[Highest-rated protein this week. Peak freshness on Mondays based on 47 reviews.]' },
  { day: 'Tue', date: 'Mar 4', restaurant: '[Bruin Plate]',meal: '[Acai Bowl Morning]',        emoji: '🫐', why: '[Most-liked breakfast this month. Portions are extra generous on Tuesdays.]' },
  { day: 'Wed', date: 'Mar 5', restaurant: '[Epicuria]',   meal: '[Mediterranean Wednesday]',  emoji: '🌿', why: '[Weekly Mediterranean menu drops Wednesdays. Rated 9.2 avg by repeat visitors.]' },
  { day: 'Thu', date: 'Mar 6', restaurant: '[Feast]',      meal: '[Ramen Bowl Special]',       emoji: '🍜', why: '[Signature broth recipe Thursdays only. 89% positive sentiment this quarter.]' },
  { day: 'Fri', date: 'Mar 7', restaurant: '[De Neve]',    meal: '[Friday Pizza Night]',       emoji: '🍕', why: '[Wood-fired pizza is a Friday tradition. Ratings peak at 8.7 on Fridays.]' },
  { day: 'Sat', date: 'Mar 8', restaurant: '[Bruin Plate]',meal: '[Weekend Brunch Spread]',    emoji: '☀️', why: '[Weekend brunch gets extra budget. Top pick for relaxed Saturday mornings.]' },
  { day: 'Sun', date: 'Mar 9', restaurant: '[Epicuria]',   meal: '[Sunday Comfort Dinner]',    emoji: '🍗', why: '[Sunday roast scores highest weekly. Perfect comfort food before the week starts.]' },
];

export const TRENDING = {
  name: '[Acai Power Bowl]', restaurant: '[Bruin Plate]', rating: 9.3,
  reviews: '[127]', emoji: '🫐',
  summary: '[Bruins are obsessed this week - the granola is freshly made and fruit portions are massive. Most reviewers say it is the best breakfast option on The Hill right now.]',
};
