import {User} from './user.type.js';

export type commentType = {
  text: string;
  postDate: Date;
  rating: number;
  author: User;
};
