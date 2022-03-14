const GET_LIST = 'GET_LIST';
const GET_ONE = 'GET_ONE';
const GET_MANY = 'GET_MANY';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';
const { FusionAuthClient } = require('@fusionauth/node-client');

function fusionAuthDataProvider(
  config = { fusionAuthAPIKey: '', fusionAuthURL: '' }
) {
  if (!config.fusionAuthAPIKey || !config.fusionAuthURL) {
    console.log(
      '!! IMPORTANT || Fusion auth details required in config !!! (fusionAuthAPIKey and fusionAuthURL)'
    );
  }

  function Exception(status, message) {
    this.status = status;
    this.message = message;
 }

  return (type, resource, params) => {
    const client = new FusionAuthClient(
      config.fusionAuthAPIKey,
      config.fusionAuthURL
    );
    switch (type) {
      case GET_LIST: {
        const {
          filter: { ids, applicationId, sent_date_lte, sent_date_gte },
        } = params;                  
        try {
          return client
            .retrieveApplications()
            .then((response) => {
              let applications = (response.successResponse && response.successResponse.applications) || [];
              if (ids && ids.length) {
                applications = applications.filter((a) => {
                  return ids.indexOf(a.id) > -1;
                });
              }              
              if(applicationId) {
                applications = applications.filter( (app) => app.data && app.data.applicationId === applicationId );
              }     
              if(sent_date_lte) {
                applications = applications.filter( app => {   
                  if(app.data.lastSentAt) {              
                    let dateString = (app.data.lastSentAt).split(",")[0];                  
                    let [day, month, year] = dateString.split("/")
                    let formattedDateString = new Date(year, month, day).toLocaleDateString("en-CA", {timezones: "Asia/Kolkata"});                  
                    return (formattedDateString <= sent_date_lte)
                  }
                  return false;
                });
              }     
              if(sent_date_gte) {                
                applications = applications.filter( app => { 
                  if(app.data.lastSentAt) {                 
                    let dateString = (app.data.lastSentAt).split(",")[0];                                   
                    let [day, month, year] = dateString.split("/")                  
                    let formattedDateString = new Date(year, month, day).toLocaleDateString("en-CA", {timezones: "Asia/Kolkata"});         
                    return (formattedDateString >= sent_date_gte)
                  }
                  return false;
                });
              }                        
              return {
                data: applications,
                total: (response.successResponse && response.successResponse.total) || applications.length,
              };
            })
            .catch((e) => {
              console.log(e);
              return {
                data: [],
                total: 0,
              };
            });
        } catch (error) {
          console.log(error);
          return {
            data: [],
            total: 0,
          };
        }
      }

      case GET_MANY: {
        const { ids } = params;
        try {
          return client
            .retrieveApplications()
            .then((response) => {
              let applications = response.successResponse.applications || [];
              if (ids && ids.length) {
                applications = applications.filter((a) => {
                  return ids.indexOf(a.id) > -1;
                });
              }
              return {
                data: applications,
                total: response.successResponse.total || applications.length,
              };
            })
            .catch((e) => {
              console.log(e);
              return {
                data: [],
                total: 0,
              };
            });
        } catch (error) {
          console.log(error);
          return {
            data: [],
            total: 0,
          };
        }
      }

      case GET_ONE: {
        try {          
          return client
            .retrieveApplication(params.id)
            .then((response) => {
              return {
                data: response.successResponse.application,
              };
            })
            .catch(() => {
              return {
                data: null,
                total: 0,
              };
            });
        } catch (error) {
          console.log('Get One Catch', error);
          return {
            data: null,
            total: 0,
          };
        }
      }
      case CREATE: {
        try {
          return client
            .createApplication(null, {
              application: params.data,
            })
            .then((response) => {
              return {
                data: response.successResponse.application || {},
              };
            })
            .catch((error) => {
              let { errorResponse: { fieldErrors }, statusCode }  = error;                           
              throw new Exception(
                statusCode,
                (fieldErrors['application.name'] && fieldErrors['application.name'][0] && fieldErrors['application.name'][0].message )                               
            )
              return {
                data: null,
              };
            });
        } catch (error) {
          console.log('Create Catch', error);
          return {
            data: null,
          };
        }
      }
      case UPDATE: {
        try {
          return client
            .updateApplication(params.id || params.uuid, {
              application: params.data,
            })
            .then((response) => {
              return {
                data: response.successResponse.application || {},
              };
            })
            .catch(() => {
              return {
                data: null,
              };
            });
        } catch (error) {
          console.log('Update Catch', error);
          return {
            data: null,
          };
        }
      }
      case DELETE: {
        try {
          return client
            .deleteApplication(params.id || params.uuid)
            .then((response) => {              
              return {
                data: (response.successResponse && response.successResponse.application) || {},
              };
            })
            .catch((error) => {
              let  { errorResponse = {} } = error;              
              let { fieldErrors, statusCode } = errorResponse;              
              throw new Exception(statusCode, fieldErrors);               
              return { 
                data: null,
              }
            });
        } catch (error) {
          console.log('Delete Catch', error);
          return {
            data: null,
          };
        }
      }
      default:
    }
    return null;
  };
}

export default fusionAuthDataProvider;
