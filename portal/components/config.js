const resourceConfig = {
  personas: [
    // {
    //   consonant: true,
    //   en: "school head",
    //   hi: "स्कूल प्रमुख",
    //   credentials: "e-Samwad",
    //   applicationId: process.env.NEXT_PUBLIC_FUSIONAUTH_SCHOOL_APP_ID,
    //   redirectUrl: "school",
    // },
    {
      consonant: false,
      en: "official",
      hi: "अधिकारी",
      credentials: "Admin Console",
      applicationId: process.env.NEXT_PUBLIC_FUSIONAUTH_STATE_APP_ID,
      redirectUrl: `admin#/student`,
    },
  ],
  homepageCards: [
    {
      //   title: {
      //     en: "Donate your smartphone",
      //     hi: "अपना स्मार्टफ़ोन दान करें",
      //   },
      //   target: "/donate",
      //   icon: "volunteer_activism",
      //   colour: "primary",
      // },{
      title: {
        en: "Donate a Smartphone as an Individual Donor",
        hi: "व्यक्तिगत दाता",
      },
      target: process.env.NEXT_PUBLIC_DONATE_DEVICE_INDIV_FORM_URL,
      icon: "volunteer_activism",
      colour: "primary",
    },
    {
      title: {
        en: "Donate a smartphone as a Corporate Donor",
        hi: "कॉर्पोरेट दाता",
      },
      target: process.env.NEXT_PUBLIC_DONATE_DEVICE_CORP_FORM_URL,
      icon: "corporate_fare",
      colour: "primary",
    },
    {
      title: {
        en: "Frequently Asked Questions",
        hi: "जानकारी",
      },
      target: process.env.NEXT_PUBLIC_FAQ_DOCUMENT_URL,
      icon: "quiz",
      colour: "primary",
    },
    {
      title: {
        en: "Login for state officials",
        hi: "राज्य के अधिकारियों के लिए लॉग इन",
      },
      target: "/login",
      icon: "login",
      colour: "secondary",
    },
    {
      title: {
        en: "Track your smartphone and get your Digi Saathi certificate",
        hi: "अपने स्मार्टफ़ोन को ट्रैक करें और अपना Digi साथी प्रशंसा पत्र लें",
      },
      target: "/track",
      icon: "grading",
      colour: "secondary",
    },
  ],
  donatePageCards: [
    {
      title: {
        en: "Individual donor",
        hi: "व्यक्तिगत दाता ",
      },
      target: process.env.NEXT_PUBLIC_DONATE_DEVICE_INDIV_FORM_URL,
      icon: "volunteer_activism",
      colour: "primary",
    },
    {
      title: {
        en: "Corporate donor",
        hi: "कॉर्पोरेट दाता",
      },
      target: process.env.NEXT_PUBLIC_DONATE_DEVICE_CORP_FORM_URL,
      icon: "corporate_fare",
      colour: "primary",
    },
  ],
  schoolPageCards: [
    {
      title: {
        en: "Demand estimation form",
        hi: "स्मार्टफ़ोन लागत अनुमान प्रपत्र भरें ",
      },
      target: process.env.NEXT_PUBLIC_REQUEST_DEVICE_FORM_URL,
      icon: "smartphone",
      colour: "primary",
    },
    {
      title: {
        en: "Update donee data",
        hi: "लाभार्थी जानकारी भरें",
      },
      target: "/admin",
      icon: "login",
      colour: "secondary",
    },
  ],
  statusChoices: [
    {
      id: "no-action-taken",
      name: "Donation in Progress", //No Action Taken
      icon: "warning",
      style: "error",
    },
    {
      id: "donor-no-init",
      name: "Delivery Not Initiated",
      icon: "pending_actions",
      style: "error",
    },
    {
      id: "donor-init",
      name: "Delivery Initiated",
      icon: "inventory",
      style: "pending",
    },
    {
      id: "received-state",
      name: "Received by state",
      icon: "real_estate_agent",
      style: "success",
      templateId: "1007356590433077522",
      template:
        "Congratulations! Your donated device with the tracking ID {#var#} has been successfully received by Samagra Shiksha, Himachal Pradesh.\nYou can visit the donation portal to download your DigitalSaathi eCertificate.\n\n\n- Samagra Shiksha, Himachal Pradesh",
      variables: ["device_tracking_key"],
    },
    {
      id: "delivered-child",
      name: "Delivered to child",
      icon: "check_circle",
      style: "success",
      templateId: "1007267945817846297",
      template:
        "Congratulations! Your donated device with the tracking ID {#var#} has been successfully donated to a child-in-need from {#var#},({#var#}) . Thank you for your contribution to a student's online learning.\n\n\n- Samagra Shiksha, Himachal Pradesh",
      variables: [
        "device_tracking_key",
        "recipient_school.name",
        "recipient_school.location.district",
      ],
    },
    {
      id: "cancelled",
      name: "Cancelled",
      icon: "disabled_by_default",
      style: "error",
    },
  ],
  deliveryTypeChoices: [
    { id: "hand", name: "Hand Off", filterable: true },
    { id: "pickup", name: "Pick Up", filterable: true },
    { id: "courier", name: "Courier", filterable: true },
    { id: "handnonhp", name: "Hand Off (outside HP)" },
    { id: "couriernonhp", name: "Courier (outside HP)" },
  ],
  gradeChoices: [
    {
      id: 1,
      name: "1",
    },
    {
      id: 2,
      name: "2",
    },
    {
      id: 3,
      name: "3",
    },
    {
      id: 4,
      name: "4",
    },
    {
      id: 5,
      name: "5",
    },
    {
      id: 6,
      name: "6",
    },
    {
      id: 7,
      name: "7",
    },
    {
      id: 8,
      name: "8",
    },
    {
      id: 9,
      name: "9",
    },
    {
      id: 10,
      name: "10",
    },
    {
      id: 11,
      name: "11",
    },
    {
      id: 12,
      name: "12",
    },
  ],
};

export default resourceConfig;
