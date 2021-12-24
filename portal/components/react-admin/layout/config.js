import {
  SchoolEdit,
  SchoolList,
} from "@/components/react-admin/base/resources/schools";
import {
  TeacherEdit,
  TeacherList,
} from "@/components/react-admin/base/resources/teachers";
import {
  AssessmentsCreate,
  AssessmentsList,  
} from "@/components/react-admin/base/resources/assessments";
import {
  GradeAssessmentList, 
} from "@/components/react-admin/base/resources/gradeAssessment";

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
  },
  {
    name: "assessment",
    list: AssessmentsList,
    edit: null,
    create: AssessmentsCreate,
    label: "Assessments",
    icon: "chart",
    formUrl: "SOE",
  },
  {
    name: "grade_assessment",
    list: GradeAssessmentList,
    edit: null,
    create: null,
    label: "Grade Assessments",
    icon: "chart",    
  },
];
