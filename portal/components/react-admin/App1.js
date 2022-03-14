import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import {
  MuiThemeProvider,
  createMuiTheme,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import englishMessages from 'ra-language-english';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { store } from './e/utils/localsotage.service';
import { EsamwadList } from "@/components/react-admin/base/resources/esamwad";

import CustomLayout from "./layout";
import customTheme from "./theme";
import createAdminStore from './createAdminStore';

import dP from './base/dataProviders';
// import dP from './customHasura/dataProvider';

const messages = {
  en: {
    ...englishMessages,
    resources: {
      roles: {
        fields: {
          resources: 'Resources',
          permissions: 'Permissions',
        },
      },
    },
  },
};

const i18nProvider = polyglotI18nProvider((locale) => messages[locale], 'en', {
  allowMissing: true,
});


const history = createHashHistory();

class App1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataProvider: null };
    this.getPermission = this.getPermission.bind(this);
  }

  componentDidMount() {
    console.log(dP)
    dP.then((dataProvider) => {
      console.log(dataProvider)
      this.setState({ dataProvider });
    });
  }

  getPermission = (resource, permission, role = '') => {
    if (role === 'admin') return true;

    // eslint-disable-next-line consistent-return
    return store.getItem('permissions').then((permissionsForUser) => {
      if (permissionsForUser) {
        return (
          permissionsForUser[resource] &&
          permissionsForUser[resource].indexOf(permission) > -1
        );
      }
    });
  };

  render() {
    const { dataProvider } = this.state;
    if (!dataProvider) {
      return (
        <div className='flex flex-1 flex-col items-center justify-center h-384'>
          <CircularProgress
            variant='indeterminate'
            style={{ color: '#757575' }}
          />
          <Typography
            variant='h5'
            className='text-20 mb-16'
            color='textSecondary'
            style={{ marginTop: '1rem' }}
          >
            This page is loading, just a moment please.
          </Typography>
        </div>
      );
    }

    return (
      <Provider
      store={createAdminStore({
        authProvider,
        history,
        i18nProvider,
        dataProvider,
      })}
    >
        <MuiThemeProvider theme={createMuiTheme(customTheme)}>
          <Admin
            i18nProvider={i18nProvider}
            // catchAll={Error404Page}
            layout={CustomLayout}
            // authProvider={authProvider}
            dataProvider={dataProvider}
            // customRoutes={customRoutes}
            // loginPage={LoginPage}
            history={history}
            title='My Admin'
          >
            {/* {(permissions) => [ */}
              <Resource
              name='userESamwad'
              list={
                EsamwadList
              }
              // icon={ComponentsIcon}
            />,
              {/* <Resource key='stream_subject' name='stream_subject' />,
              <Resource key='question_assessment' name='question_assessment' />,
              <Resource key='assessment_grade' name='assessment_grade' />,
              <Resource key='school_grade' name='school_grade' />,
            ]} */}
          </Admin>
        </MuiThemeProvider>
        </Provider>
    );
  }
}

export default App1;
