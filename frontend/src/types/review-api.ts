import UserDto from "../dto/user/user.dto";

export type ReviewApi = {
    id: string;
    comment: string;
    rating: number;
    date: Date;
    user: {
        avatarUrl: string;
        email: string;
        id: string,
        userType: string;
        name: string;
    };
};
