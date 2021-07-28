import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {DonateDevice, DonateDeviceRelations} from '../models';

export class DonateDeviceRepository extends DefaultCrudRepository<
  DonateDevice,
  typeof DonateDevice.prototype.id,
  DonateDeviceRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(DonateDevice, dataSource);
  }
}
