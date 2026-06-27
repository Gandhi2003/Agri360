/** Branded primitive aliases shared across the domain. */
export type ID = string;
export type ISODateString = string;
export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;

/** Every persisted entity extends this. */
export interface BaseEntity {
  id: ID;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/** Generic option used by selects, filters, etc. */
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

/** Discriminated async-state union for non-Query state machines. */
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
