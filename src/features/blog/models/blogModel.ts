import { Post } from '../../../models';

export interface BlogState {
    loading: boolean;
    error: string | null;
    postList: Post[];
}
