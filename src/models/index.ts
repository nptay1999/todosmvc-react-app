export interface Item {
  title: string;
  isComplete: boolean;
}

export enum Filter {
  All,
  Active,
  Completed
}