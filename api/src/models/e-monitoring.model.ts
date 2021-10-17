import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class EMonitoring extends Entity {
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

  constructor(data?: Partial<EMonitoring>) {
    super(data);
  }
}

export interface EMonitoringRelations {
  // describe navigational properties here
}

export type EMonitoringWithRelations = EMonitoring & EMonitoringRelations;
