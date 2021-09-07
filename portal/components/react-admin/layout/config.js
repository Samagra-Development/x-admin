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
import { RecruiterData } from "@/components/react-admin/base/resources/recruiterData/Recruiter";
import { VacancyData } from "@/components/react-admin/base/resources/vacancydata/vacancydata";
import {
  CandidateData,
  InterestedCandidateist,
} from "@/components/react-admin/base/resources/canditatelist/candidatelist";

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

  {
    name: "employer_details",
    list: RecruiterData,
    edit: null,

    create: null,
    label: "Recruiter Data",
    icon: "person",
  },
  {
    name: "vacancy_details",
    list: VacancyData,
    edit: null,
    create: null,
    label: "Vacancy Data",
    icon: "person",
  },
  {
    name: "candidate_vacancy_interest",
    list: InterestedCandidateist,
    create: null,
    label: "Interested Candidates",
    icon: "person",
  },
];
