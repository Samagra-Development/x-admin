import { UserSamikshaEdit, UserSamikshaList } from "@/resources/userSamiksha";

export const resourceConfig = [
  {
    name: "userSamiksha",
    list: UserSamikshaList,
    edit: UserSamikshaEdit,
    create: null,
    label: "Samiksha Users",
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
