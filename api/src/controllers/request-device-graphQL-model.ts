export class RequestDevice {
  name?: string | null;
  phone_number?: string | null;
  created_at?: string | null;
  district?: string | null;
  block?: string | null;
  pincode?: string | null;
  school_name?: string | null;
  udise?: number | null;
  total_students?: number | null;
  student_count_no_smartphone?: string | null;
  student_details?: string | null;
  declaration?: Boolean | null;

  operationsDoc = `
    mutation insertDemand($demand: device_demand_response_insert_input!) {
      insert_device_demand_response_one(object: $demand) {
        id
      }
    }
  `;
  variableName = `demand`;
  operationName = `insertDemand`;
  databaseOperationName = `insert_device_demand_response_one`;

  constructor(data: any) {
    this.name = data?.name ?? null;
    this.phone_number = data?.contact ?? null;
    this.created_at = data?.['*meta-submission-date*'] ?? null;
    this.district = data?.district ?? null;
    this.block = data?.block ?? null;
    this.school_name = data?.school ?? null;
    this.pincode = this.convertToString(data?.pincode) ?? null;
    this.udise = this.extractUDISE(data?.school) ?? null;
    this.total_students = data?.totalstudents ?? null;
    this.student_count_no_smartphone = data?.donation ?? null;
    this.student_details = data?.details ?? null;
    this.declaration = this.convertToBoolean(data?.declaration) ?? null;
  }

  convertToBoolean(response: string): boolean {
    if (response === 'yes') return true;
    else return false;
  }

  extractUDISE(response: string): number | null {
    if (response.split('-').length > 1) return parseInt(response.split('-')[1]);
    return null;
  }

  convertToString(response: number): string | null {
    if (response) {
      return String(response);
    }
    return null;
  }
}
