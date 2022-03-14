import React from 'react';
import { Route } from 'react-router-dom';
import AllComponents from '../fuse-base/components/lazy.components';
import DashboardPage from './pages/dashboard.page';
import MaintenancePage from './pages/maintenance.page';
import FaqPage from './pages/faqs.page';
import StatePage from './pages/samarth-assessment/state.page';
import DistrictPage from './pages/samarth-assessment/district.page';
import BlockPage from './pages/samarth-assessment/block.page';
import SchoolPage from './pages/samarth-assessment/school.page';
import RankingPage from './pages/samarth-assessment/ranking.page';
import VisitCompilancePage from './pages/shiksha-saathi/visitCompilance.page';
import VisitAnalysis15Page from './pages/shiksha-saathi/visitAnalysis15.page ';
import VisitAnalysis18Page from './pages/shiksha-saathi/visitAnalysis18.page';
import VisitAnalysis112Page from './pages/shiksha-saathi/visitAnalysis112.page';
import PreBoardDashboard from './pages/preboard/preBoardDashboard.page';
import SchoolLevelPage from './pages/preboard/schoolLevel.page';
import WeeklyProgressPage from './pages/preboard/weeklyProgress.page';
import MonitoringVisitsPage from './pages/preboard/monitoringVisits.page';
import ESamwadDashbaord from './pages/esamwad/esamwadDashboard.page';
import ESamwadPortal from './pages/esamwad/esamwadPortal.page';
import SchoolVisitedPage from './pages/shiksha-saathi/schoolVisited.page';
import GoogleMapsPage from './pages/google-maps.page';
import HarGharPathshalaPage from './pages/har-ghar-pathshala/harGharPathshala.page';
import GoogleConsole from './pages/analytics.page';
import ESamwadSMSMonitoring from './pages/esamwad/esamwadSMSMonitoring.page';
import MaterialTable from './pages/esamwad/materialTable';
import ODKUploadPage from './pages/odk-upload.page';

const ExternalModule = () => (
  <>
    <Route path='/e/all-components' component={AllComponents} />
    <Route path='/e/dashboard' component={DashboardPage} />
    <Route path='/e/upload-odk' component={ODKUploadPage} />
    <Route path='/e/faqs' component={FaqPage} />
    <Route path='/e/maintenance' component={MaintenancePage} />
   
    <Route path='/e/analytics' component={GoogleConsole} />
    {/* har ghar pathshala */}
    <Route path='/e/har-ghar-pathshala' component={HarGharPathshalaPage} />

    {/* samarth */}
    <Route path='/e/state-dashboard' component={StatePage} />
    <Route path='/e/district-dashboard' component={DistrictPage} />
    <Route path='/e/block-dashboard' component={BlockPage} />
    <Route path='/e/school-dashboard' component={SchoolPage} />
    <Route path='/e/ranking-dashboard' component={RankingPage} />

    {/* shiksha saathi */}
    <Route path='/e/visit-compilance' component={VisitCompilancePage} />
    <Route path='/e/visit-analysis-1-5' component={VisitAnalysis15Page} />
    <Route path='/e/visit-analysis-1-8' component={VisitAnalysis18Page} />
    <Route path='/e/visit-analysis-1-12' component={VisitAnalysis112Page} />
    <Route path='/e/school-visited-analysis' component={SchoolVisitedPage} />

    {/* esamwad */}
    <Route path='/e/esamwad-usage-dashbaord' component={ESamwadDashbaord} />
    <Route path='/e/esamwad-portal' component={ESamwadPortal} />
    <Route path='/e/esamwad-sms-monitoring' component={ESamwadSMSMonitoring} />

    {/* preboard */}
    <Route path='/e/pre-board-dashbaord' component={PreBoardDashboard} />
    <Route path='/e/2020-school-level-strategy' component={SchoolLevelPage} />
    <Route
      path='/e/2020-weekly-progress-report'
      component={WeeklyProgressPage}
    />
    <Route
      path='/e/monitoring-visit-dashboard'
      component={MonitoringVisitsPage}
    />
    <Route path='/e/google-map' component={GoogleMapsPage} />
    <Route path='/e/view-data/' component={MaterialTable} />
  </>
);

export default React.memo(ExternalModule);
