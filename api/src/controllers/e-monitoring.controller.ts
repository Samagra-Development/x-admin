import {repository} from '@loopback/repository';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {EMonitoring} from '../models';
import {EMonitoringRepository} from '../repositories';
import {EMonitoring as EMonitoringType} from './e-monitoring-graphQL-model';
import {graphQLHelper} from './graphQL-helper';
import sendLog from "../utils/adminLogger";

export class EMonitoringController {
  constructor(
    @repository(EMonitoringRepository)
    public eMonitoringRepository: EMonitoringRepository,
  ) {}

  @post('/e-monitoring')
  @response(200, {
    description: 'E-monitoring model instance',
    content: {'application/json': {schema: getModelSchemaRef(EMonitoring)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EMonitoring, {
            title: 'NewEMonitoring',
            exclude: ['id'],
          }),
        },
      },
    })
    eMonitoring: Omit<EMonitoring, 'id'>,
  ): Promise<EMonitoring> {
    const instanceID = eMonitoring.data[0]?.instanceID;
    const data = eMonitoring?.data[0]
    const logBody = `Data to loopback received. Your Instance ID is *${instanceID}*. \n\n  Complete Object is as followed : ${JSON.stringify(data)}`;
    sendLog(
        `*✅ Saksham Samiksha Monitoring *: ${logBody}`,
        process.env.SLACK_E_MONITORING_LOGS_CHANNEL_ID,
    );
    console.log("Personal Channel Id : ", process.env.SLACK_E_MONITORING_LOGS_CHANNEL_ID)
    const eMonitoringType = new EMonitoringType(data);
    console.log("Personal Log : ", eMonitoringType)
    const gQLHelper = new graphQLHelper();
    if (eMonitoringType.instanceID) {
      const {errors, data: gqlResponse} = await gQLHelper.startExecuteInsert(
          eMonitoringType,
      );
      if (errors) {
        console.error(errors);
      } else {
        console.log(gqlResponse);
      }
    }
    // to insert into MangoDB
    return this.eMonitoringRepository.create(eMonitoring);

  }

  // @get('/donate-devices/count')
  // @response(200, {
  //   description: 'DonateDevice model count',
  //   content: { 'application/json': { schema: CountSchema } },
  // })
  // async count(
  //   @param.where(DonateDevice) where?: Where<DonateDevice>,
  // ): Promise<Count> {
  //   return this.donateDeviceRepository.count(where);
  // }

  // @patch('/donate-devices')
  // @response(200, {
  //   description: 'DonateDevice PATCH success count',
  //   content: { 'application/json': { schema: CountSchema } },
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(DonateDevice, { partial: true }),
  //       },
  //     },
  //   })
  //   donateDevice: DonateDevice,
  //   @param.where(DonateDevice) where?: Where<DonateDevice>,
  // ): Promise<Count> {
  //   return this.donateDeviceRepository.updateAll(donateDevice, where);
  // }

  // @get('/donate-devices/{id}')
  // @response(200, {
  //   description: 'DonateDevice model instance',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(DonateDevice, { includeRelations: true }),
  //     },
  //   },
  // })
  // async findById(
  //   @param.path.string('id') id: string,
  //   @param.filter(DonateDevice, { exclude: 'where' }) filter?: FilterExcludingWhere<DonateDevice>
  // ): Promise<DonateDevice> {
  //   return this.donateDeviceRepository.findById(id, filter);
  // }

  // @patch('/donate-devices/{id}')
  // @response(204, {
  //   description: 'DonateDevice PATCH success',
  // })
  // async updateById(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(DonateDevice, { partial: true }),
  //       },
  //     },
  //   })
  //   donateDevice: DonateDevice,
  // ): Promise<void> {
  //   await this.donateDeviceRepository.updateById(id, donateDevice);
  // }

  // @put('/donate-devices/{id}')
  // @response(204, {
  //   description: 'DonateDevice PUT success',
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() donateDevice: DonateDevice,
  // ): Promise<void> {
  //   await this.donateDeviceRepository.replaceById(id, donateDevice);
  // }

  // @del('/donate-devices/{id}')
  // @response(204, {
  //   description: 'DonateDevice DELETE success',
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.donateDeviceRepository.deleteById(id);
  // }
}
