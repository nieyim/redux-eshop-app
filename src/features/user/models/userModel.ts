import { User } from '../../../models';

export interface UserState {
    loading: boolean;
    error: string | null;
    userList: User[];
}
