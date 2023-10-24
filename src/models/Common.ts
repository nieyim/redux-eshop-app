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
