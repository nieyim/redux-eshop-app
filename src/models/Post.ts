import { User } from './User';

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: number;
    thumbnail: string;
    createdAt: number;
    user: User;
}
