import {
  CandidateInterestShow,
  InterestedCandidateList,
} from "@/components/react-admin/base/resources/canditatelist/index";
import {
  CandidateList,
  CandidateShow,
} from "@/components/react-admin/base/resources/candidateProfile/index";
import {
  DonateDeviceRequestEdit,
  DonateDeviceRequestList,
} from "@/resources/donate-device";
import { RecruiterData, RecruiterShow } from "@/components/react-admin/base/resources/recruiterData/index";
import {
  RequestDeviceEdit,
  RequestDeviceList,
} from "@/resources/request-device";
import {
  VacancyData,
  VacancyDataShow,
} from "@/components/react-admin/base/resources/vacancydata/index";

import { useSession } from "next-auth/client";

const ResourceConfig = () => {
  const [session] = useSession();
  if (session.role === "Recruiter") {
    return [
      {
        name: "candidate_profile",
        list: CandidateList,
        show: CandidateShow,
        create: null,
        icon: "person",
      },
      {
        name: "vacancy_details",
        list: VacancyData,
        show: VacancyDataShow,
        edit: null,
        create: null,
        label: "Vacancy Data",
        icon: "person",
      },
      {
        name: "candidate_vacancy_interest",
        list: InterestedCandidateList,
        show: CandidateInterestShow,
        create: null,
        label: "Interested Candidates",
        icon: "person",
      },
    ];
  } else {
    return [
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
        show: VacancyDataShow,
        edit: null,
        create: null,
        label: "Vacancy Data",
        icon: "person",
      },
      {
        name: "candidate_vacancy_interest",
        list: InterestedCandidateList,
        show: CandidateInterestShow,
        create: null,
        label: "Interested Candidates",
        icon: "person",
      },
    ];
  }
}



export default ResourceConfig;


