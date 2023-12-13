import { Cart } from '../../../models';

export default interface CartState {
    loading: boolean;
    error: string | null;
    cartList: Cart[];
}
