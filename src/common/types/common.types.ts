export type ID = string;
export type ISODateString = string;
export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;

export interface BaseEntity {
  id: ID;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
