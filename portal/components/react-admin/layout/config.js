import {
  schoolEdit,
  schoolList,
} from "@/components/react-admin/base/resources/schools";
import {
  teacherEdit,
  teacherList,
} from "@/components/react-admin/base/resources/teachers";

export const resourceConfig = [
  {
    name: "school",
    list: schoolList,
    edit: schoolEdit,
    create: null,
    label: "School Information",
    icon: "school",
  },{
    name: "teacher",
    list: teacherList,
    edit: teacherEdit,
    create: null,
    label: "Employees",
    icon: "person",
  },
];
