export const coffeeList = [
  {
    id: '1',
    name: 'Caffe Mocha',
    subtitle: 'Deep Foam',
    price: 4.53,
    rating: 4.8,
    reviews: 230,
    category: 'All Coffee',
    image: require('../../assets/coffee_mocha.jpg'),
    description:
      'A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo...',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '2',
    name: 'Flat White',
    subtitle: 'Espresso',
    price: 3.53,
    rating: 4.8,
    reviews: 180,
    category: 'Machiato',
    image: require('../../assets/coffee_flatwhite.jpg'),
    description:
      'A flat white is a coffee drink consisting of espresso with microfoamed milk. It generally has a higher ratio of espresso to milk.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '3',
    name: 'Cappuccino',
    subtitle: 'with Oat Milk',
    price: 4.20,
    rating: 4.6,
    reviews: 150,
    category: 'Latte',
    image: require('../../assets/coffee_cappuccino.jpg'),
    description:
      'A cappuccino is an espresso-based coffee drink that originated in Italy, and is prepared with steamed milk foam.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '4',
    name: 'Americano',
    subtitle: 'Black Coffee',
    price: 2.99,
    rating: 4.5,
    reviews: 200,
    category: 'Americano',
    image: require('../../assets/coffee_americano.jpg'),
    description:
      'Caffè Americano is a type of coffee drink prepared by diluting an espresso shot with hot water at a 1:3 to 1:4 ratio.',
    sizes: ['S', 'M', 'L'],
  },
];

export const categories = ['All Coffee', 'Machiato', 'Latte', 'Americano'];
