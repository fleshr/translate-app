export interface TestProps {
  "data-testid"?: string;
}

export type BaseProps<T = object> = T & TestProps;
