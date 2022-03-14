import combineDataProviders  from 'react-admin';
import dataProvider2 from './hasuraDataprovider';

function buildDataProvider(){
    console.log("Entered provider")
const dataProvider = combineDataProviders((resource) => {
    switch (resource) {
        case 'school':
            console.log("Schoo;l")
            return dataProvider2;
        case 'assessment':
            return dataProvider2;
        default:
            throw new Error(`Unknown resource: ${resource}`);
    }
});
return dataProvider
}

export default buildDataProvider;

