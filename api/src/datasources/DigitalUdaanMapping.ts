export default class DigitalUdaanMapping {
    mapping: any;

    [key: string]: string;

    constructor() {
        this.mapping = {
            '0':'0%-20%',
            '1':'20%-40%',
            '2':'40%-60%',
            '3':'60%-80%',
            '4':'> 80%',
            '5':'100%',
        }
    }
}
