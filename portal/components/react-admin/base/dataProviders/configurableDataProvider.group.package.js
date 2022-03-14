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
  function createGroupException(status, message) {
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
          filter: { ids, applicationId, globalSearch },
        } = params;               
        try {          
          return client
            .retrieveGroups()
            .then((response) => {
              let groups = (response.successResponse && response.successResponse.groups) || [];              
              if (ids && ids.length) {
                groups = groups.filter((a) => {
                  return ids.indexOf(a.id) > -1;
                });
              }              
              if(applicationId) {
                groups = groups.filter( (grp) => grp.data && grp.data.applicationId === applicationId)
              }
              if(config.fusionAuthApplicationId) {
                groups = groups.filter( (grp) => grp.data && grp.data.applicationId === config.fusionAuthApplicationId)
              }
             if(globalSearch) {               
               groups = groups.filter ( grp => grp.name?.toLowerCase().includes(globalSearch.toLowerCase()));
             } 
              return {
                data: groups,
                total: response.successResponse.total || groups.length,
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
            .retrieveGroups()
            .then((response) => {
              let groups = response.successResponse.groups || [];
              if (ids && ids.length) {
                groups = groups.filter((a) => {
                  return ids.indexOf(a.id) > -1;
                });
              }
              return {
                data: groups,
                total: response.successResponse.total || groups.length,
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
            .retrieveGroup(params.id)
            .then((response) => {
              return {
                data: response.successResponse.group,
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
            .createGroup(null, {
              group: params.data,
            })
            .then((response) => {
              return {
                data: response.successResponse.group,
              };
            })
            .catch((error) => {              
              console.error(error);
              let { errorResponse: { fieldErrors }, statusCode }  = error;                           
              throw new createGroupException(
                statusCode,
                (fieldErrors['group.name'] && fieldErrors['group.name'][0] && fieldErrors['group.name'][0].message )                               
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
            .updateGroup(params.id || params.uuid, {
              group: params.data,
            })
            .then((response) => {
              return {
                data: response.successResponse.group,
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
            .deleteGroup(params.id || params.uuid)
            .then((response) => {              
              return {
                data: (response.successResponse && response.successResponse.group) || {}
              };
            })
            .catch(() => ({
              data: null,
            }));
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
