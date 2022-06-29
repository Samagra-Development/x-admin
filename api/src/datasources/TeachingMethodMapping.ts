export default class TeachingMethodMapping {
    mapping: any;

    [key: string]: string;

    constructor() {
        this.mapping = {
            '0':'None of the above',
            '1':'Gender inclusive education',
            '2':'Toy based pedagogy',
            '3':'Art integrated learning',
        }
    }
}
