export interface HeadCell<T extends { id: string }> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}
