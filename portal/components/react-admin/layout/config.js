import {
  UserSamikshaEdit,
  UserSamikshaList,
} from "@/resources/userSamiksha";

export const resourceConfig = [
  {
    name: "userSamiksha",
    list: UserSamikshaList,
    edit: UserSamikshaEdit,
    create: null,
    label: "Samiksha Users",
    icon: "person",
  },
];
