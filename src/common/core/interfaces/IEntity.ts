import {Identifier} from "../../domain/Identifier";


export type BaseProps = {
  [index: string]: unknown;
};

export interface IEntity {
  readonly _id: Identifier;

  equals(entity: IEntity): boolean;
}
