import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {EMonitoring, EMonitoringRelations} from '../models';

export class EMonitoringRepository extends DefaultCrudRepository<
  EMonitoring,
  typeof EMonitoring.prototype.id,
    EMonitoringRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(EMonitoring, dataSource);
  }
}
