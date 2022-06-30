export default class VisitTypeMapping {
    mapping: any;

    [key: string]: string;

    constructor() {
        this.mapping = {
            '1':'Regular school visit',
            '2':'Summer vacation visit',
        }
    }
}
