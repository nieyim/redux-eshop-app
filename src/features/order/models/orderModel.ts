import { Order } from '../../../models';

export interface OrderState {
    loading: boolean;
    error: string | null;
    orderList: Order[];
}
