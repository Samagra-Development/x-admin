import {
  SchoolEdit,
  SchoolList,
} from "@/components/react-admin/base/resources/schools";
import {
  TeacherEdit,
  TeacherList,
} from "@/components/react-admin/base/resources/teachers";

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
];
