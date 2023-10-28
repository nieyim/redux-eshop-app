export interface ListResponse<T> {
    data: T[];
}

export interface ObjectResponse<T> {
    data: T;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export type IconMappings = {
    [key: string]: JSX.Element;
};

export interface ListParams {
    _sort?: string;
    _order?: 'asc' | 'desc';
    _q?: string;
}
