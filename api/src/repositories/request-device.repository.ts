import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {RequestDevice, RequestDeviceRelations} from '../models';

export class RequestDeviceRepository extends DefaultCrudRepository<
  RequestDevice,
  typeof RequestDevice.prototype.id,
  RequestDeviceRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(RequestDevice, dataSource);
  }
}
