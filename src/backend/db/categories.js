import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "men",
      imageUrl:'https://images.unsplash.com/photo-1632226390535-2f02c1a93541?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbiUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    _id: uuid(),
    categoryName: "women",
      imageUrl:'https://tse4.mm.bing.net/th?id=OIP.UWRNRJcB0bMEMZ0WuoQ8PgHaGH&pid=Api&P=0&h=180'
  },
  {
    _id: uuid(),
    categoryName: "kids",
      imageUrl:'https://i.pinimg.com/originals/61/69/5d/61695d9162eb15614d82ec6bd011501d.jpg'
  },
];
