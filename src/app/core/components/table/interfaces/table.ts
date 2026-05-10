export interface ITable {
  headers: string[];
  rows: Partial<ICell>[][];
}

interface ICell {
  label: string;
  type: 'text' | 'date' | 'number' | 'boolean' | 'currency' | 'badge';
  action: Partial<IAction>;
}


interface IAction{
  isEdit: boolean;
  isDelete: boolean;
  isDetail: boolean;
}