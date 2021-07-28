import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class DonateDevice extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  token?: string;

  @property({
    type: 'string',
  })
  content?: string;

  @property({
    type: 'string',
  })
  formId?: string;

  @property({
    type: 'string',
  })
  formVersion?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  data?: object[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DonateDevice>) {
    super(data);
  }
}

export interface DonateDeviceRelations {
  // describe navigational properties here
}

export type DonateDeviceWithRelations = DonateDevice & DonateDeviceRelations;
