import { Cart, User } from '../../../models';

export interface StatisticsState {
    userCount: number;
    productCount: number;
    productCategoryCount: number;
    postCount: number;
}

export interface DashboardState {
    loading: boolean;
    statistics: StatisticsState;
    error: String | null;
    barchartCart: Cart[];
    barchartUser: string[];
    piechart: [];
}
