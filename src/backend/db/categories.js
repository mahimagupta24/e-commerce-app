import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "men",
      imageUrl:'http://localvaluemagazine.com/wp-content/uploads/2017/12/men-clothes.jpg',
      description:"check out our latest men collection"
    },
  {
    _id: uuid(),
    categoryName: "women",
      imageUrl:'https://tse4.mm.bing.net/th?id=OIP.UWRNRJcB0bMEMZ0WuoQ8PgHaGH&pid=Api&P=0&h=180',
      description:"check out our latest women collection"
    },
  {
    _id: uuid(),
    categoryName: "kids",
      imageUrl:'https://i.pinimg.com/originals/61/69/5d/61695d9162eb15614d82ec6bd011501d.jpg',
      description:"check out our latest kids collection"
  },
];
