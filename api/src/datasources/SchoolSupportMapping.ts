export default class SchoolSupportMapping {
    mapping: any;

    [key: string]: string;

    constructor() {
        this.mapping = {
            '0' : 'No support needed',
            '1' : 'Textbook availability with students',
            '2' : 'Practice workbook availability with students',
            '3' : 'Teacher availability',
            '4' : 'Teacher training',
            '5' : 'Better infrastructure',}
    }
}
