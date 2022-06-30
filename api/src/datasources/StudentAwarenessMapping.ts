export default class StudentAwarenessMapping {
    mapping: any;

    [key: string]: string;

    constructor() {
        this.mapping = {
            '0':'None of the above',
            '1':'Project Udaan',
            '2':'Avsar student report cards',
            '3':'Avsar end of chapter practice quiz',
            '4':'DIKSHA videos',
        }
    }
}
