import pincodeToBlock from '../datasources/pincodeToBlock';
export class DonateDevice {
  name?: string | null;
  phone_number?: string | null;
  created_at?: string | null;
  state_ut?: string | null;
  district?: string | null;
  block?: string | null;
  other_district?: null;
  address?: string | null;
  landmark?: string | null;
  pincode?: string | null;
  delivery_mode?: string | null;
  delivery_mode_outside_HP?: string | null;
  declaration_acknowledgement?: string | null;
  device_company?: string | null;
  device_other_model?: string | null;
  device_model?: string | null;
  device_size?: string | null;
  device_age?: number | null;
  device_condition?: string | null;
  call_function?: boolean | null;
  wa_function?: boolean | null;
  yt_function?: boolean | null;
  charger_available?: boolean | null;
  final_declaration?: string | null;
  device_tracking_key?: string | null;
  delivery_status?: string | null;

  operationsDoc = `
    mutation insertDonor($donor: device_donation_donor_insert_input!) {
      insert_device_donation_donor_one(object: $donor) {
        id
        phone_number
        device_tracking_key
      }
    }
  `;
  variableName = `donor`;
  operationName = `insertDonor`;
  databaseOperationName = `insert_device_donation_donor_one`;

  constructor(data: any) {
    this.name = data?.name ?? null;
    this.phone_number = data.contact ?? null;
    this.created_at = data['*meta-submission-date*'] ?? null;
    this.state_ut = data.state ?? null;
    this.district = data.district ?? null;
    this.block = this.fetchBlock(this.convertToString(data.pincode)) ?? null;
    this.other_district = data.otherdistrict ?? null;
    this.address = data.address ?? null;
    this.landmark = data.landmark ?? null;
    this.pincode = this.convertToString(data.pincode) ?? null;
    this.delivery_mode = data.delivery ?? null;
    this.declaration_acknowledgement = data.declaration ?? null;
    this.delivery_mode_outside_HP = data.deliverynonhp ?? null;
    this.device_company = data.company ?? null;
    this.device_other_model = data.companyother ?? null;
    this.device_model = data.modelname ?? null;
    this.device_size = data.screen ?? null;
    this.device_age = data.years ?? null;
    this.device_condition = data.condition ?? null;
    this.call_function = this.convertToBoolean(data.calls) ?? null;
    this.wa_function = this.convertToBoolean(data.wa) ?? null;
    this.yt_function = this.convertToBoolean(data.youtube) ?? null;
    this.charger_available = this.convertToBoolean(data.charger) ?? null;
    this.final_declaration = data.finalDecalaration ?? null;
    this.device_tracking_key = data.trackingKey ?? null;
    this.delivery_status = 'no-action-taken';
  }

  fetchBlock(pincode: string | null): string | null {
    if (!pincode) return null;
    const pincodeBlockMapping = new pincodeToBlock();
    if (!pincodeBlockMapping.mapping[pincode]) return 'OTHER';
    return pincodeBlockMapping.mapping[pincode];
  }

  convertToBoolean(response: string): boolean {
    if (response?.charAt(response.length - 1) === 'y') return true;
    else return false;
  }

  convertToString(response: number): string | null {
    if (response) {
      return String(response);
    }
    return null;
  }
}
