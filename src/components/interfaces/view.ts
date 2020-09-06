export interface IView<T> {
    render: (data: T[]) => void;
}