import {
  DonateDeviceRequestEdit,
  DonateDeviceRequestList,
} from "@/resources/donate-device";
import {
  RequestDeviceEdit,
  RequestDeviceList,
} from "@/resources/request-device";
import {
  CandidateShow,
  CandidateList,
} from "@/components/react-admin/base/resources/candidateProfile/index";
export const resourceConfig = [
  {
    name: "candidate_profile",
    list: CandidateList,
    // edit: CandidateEdit,
    show: CandidateShow,
    create: null,
    label: "Candidate Data",
    icon: "person",
  },
  // {
  //   name: "candidate_vacancy_interest",
  //   list: InterestedCandidateist,
  //   edit: InterestedCandidateEdit,
  //   create: null,
  //   label: "Interested Candidates",
  //   icon: "person",
  // },
  // {
  //   name: "employer_details",
  //   list: RecruiterList,
  //   edit: RecruiterEdit,
  //   create: null,
  //   label: "Recruiter Data",
  //   icon: "person",
  // },
  // {
  //   name: "vacancy_details",
  //   list: VacancyList,
  //   edit: VacancyEdit,
  //   create: null,
  //   label: "Vacancy Data",
  //   icon: "person",
  // },
];
