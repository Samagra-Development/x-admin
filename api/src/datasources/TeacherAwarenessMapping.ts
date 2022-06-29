export default class TeacherAwarenessMapping {
    mapping: any;

    [key: string]: string;

    constructor() {
        this.mapping = {
            '0':'None of the above',
            '1':'Avsar report card',
            '2':'DIKSHA worksheets',
            '3':'DIKSHA video',
            '4':'Avsar end of chapter practice quiz',
            '5':'FLN agenda of the state',
        }
    }
}
