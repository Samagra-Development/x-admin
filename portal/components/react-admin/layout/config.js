import {
  ESamwadUsersEdit,
  ESamwadUsersList,
} from "@/components/react-admin/base/resources/eSamwadUsers";

export const resourceConfig = [
  {
    name: "e_samwad_users",
    list: ESamwadUsersList,
    edit: ESamwadUsersEdit,
    create: null,
    label: "e-Samwad Users",
    icon: "person",
  },
];
