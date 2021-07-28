import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {RequestDevice} from '../models';
import {RequestDeviceRepository} from '../repositories';
import {RequestDevice as RequestDeviceType} from './request-device-graphQL-model';
import {graphQLHelper} from './graphQL-helper';

export class RequestDeviceController {
  constructor(
    @repository(RequestDeviceRepository)
    public requestDeviceRepository: RequestDeviceRepository,
  ) {}

  @post('/request-devices')
  @response(200, {
    description: 'RequestDevice model instance',
    content: {'application/json': {schema: getModelSchemaRef(RequestDevice)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RequestDevice, {
            title: 'NewRequestDevice',
            exclude: ['id'],
          }),
        },
      },
    })
    requestDevice: Omit<RequestDevice, 'id'>,
  ): Promise<RequestDevice> {
    const instanceID = requestDevice.data[0]?.instanceID;
    const filter = {where: {'data.instanceID': instanceID}};
    const existingRecord = await this.requestDeviceRepository.findOne(filter);
    if (!existingRecord) {
      const data = requestDevice?.data?.[0];
      const requestDeviceType = new RequestDeviceType(data);
      const gQLHelper = new graphQLHelper();
      const {errors, data: gqlResponse} = await gQLHelper.startExecuteInsert(
        requestDeviceType,
      );
      if (errors) {
        console.error(errors);
      } else {
        console.log(gqlResponse);
      }
      return this.requestDeviceRepository.create(requestDevice);
    } else return existingRecord;
  }
  /* 
  @get('/request-devices/count')
  @response(200, {
    description: 'RequestDevice model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RequestDevice) where?: Where<RequestDevice>,
  ): Promise<Count> {
    return this.requestDeviceRepository.count(where);
  }

  @get('/request-devices')
  @response(200, {
    description: 'Array of RequestDevice model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RequestDevice, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RequestDevice) filter?: Filter<RequestDevice>,
  ): Promise<RequestDevice[]> {
    return this.requestDeviceRepository.find(filter);
  }

  @patch('/request-devices')
  @response(200, {
    description: 'RequestDevice PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RequestDevice, {partial: true}),
        },
      },
    })
    requestDevice: RequestDevice,
    @param.where(RequestDevice) where?: Where<RequestDevice>,
  ): Promise<Count> {
    return this.requestDeviceRepository.updateAll(requestDevice, where);
  }

  @get('/request-devices/{id}')
  @response(200, {
    description: 'RequestDevice model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RequestDevice, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RequestDevice, {exclude: 'where'})
    filter?: FilterExcludingWhere<RequestDevice>,
  ): Promise<RequestDevice> {
    return this.requestDeviceRepository.findById(id, filter);
  }

  @patch('/request-devices/{id}')
  @response(204, {
    description: 'RequestDevice PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RequestDevice, {partial: true}),
        },
      },
    })
    requestDevice: RequestDevice,
  ): Promise<void> {
    await this.requestDeviceRepository.updateById(id, requestDevice);
  }

  @put('/request-devices/{id}')
  @response(204, {
    description: 'RequestDevice PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() requestDevice: RequestDevice,
  ): Promise<void> {
    await this.requestDeviceRepository.replaceById(id, requestDevice);
  }

  @del('/request-devices/{id}')
  @response(204, {
    description: 'RequestDevice DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.requestDeviceRepository.deleteById(id);
  }
*/
}
