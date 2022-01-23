import { UserSamikshaList } from "@/resources/userSamiksha";
import { AttendanceList } from "../base/resources/attendance";

export const resourceConfig = [
  {
    name: "student",
    list: UserSamikshaList,
    edit: null,
    create: null,
    label: "Samiksha Students",
    icon: "person",
  },
  {
    name: "attendance",
    list: AttendanceList,
    edit: null,
    create: null,
    label: "Samiksha Attendance",
    icon: "person",
  },  
  {
    name: "users",
    list: null,
    edit: null,
    create: null,
    label: "Users",
    icon: "person",
  },
];
