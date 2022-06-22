import UserDto from "../dto/user/user.dto";

export type ReviewApi = {
    id: string;
    text: string;
    rating: number;
    postDate: Date;
    author: UserDto;
};
