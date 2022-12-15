import {EnumPermits} from "./enum.permits";


export enum UpdatePermitsActionEnum {
  ADD_PERMITS = '+',
  REMOVE_PERMITS = '-',
}

export type UpdatePermitsDto = {
  action: UpdatePermitsActionEnum;
  list: EnumPermits[];
};

export enum UpdatePermitOperation {
  ADD = '+',
  REMOVE = '-',
}
