import {
  SchoolEdit,
  SchoolList,
} from "@/components/react-admin/base/resources/schools";
import {
  TeacherEdit,
  TeacherList,
} from "@/components/react-admin/base/resources/teachers";
import {
  AssessmentsList,
} from "@/components/react-admin/base/resources/assessments";

export const resourceConfig = [
  {
    name: "school",
    list: SchoolList,
    edit: SchoolEdit,
    create: null,
    label: "School Information",
    icon: "school",
  },{
    name: "teacher",
    list: TeacherList,
    edit: TeacherEdit,
    create: null,
    label: "Employees",
    icon: "person",
  },{
    name: "assessment",
    list: AssessmentsList,
    edit: null,
    create: null,
    label: "Assessments",
    icon: "book",
    formUrl: "Incubation_Center_Visit.xml",
  },
];
