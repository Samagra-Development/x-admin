const resourceConfig = {
  personas: [
    {
      consonant: true,
      en: "school head",
      hi: "स्कूल प्रमुख",
      credentials: "e-Samwad",
      applicationId: process.env.NEXT_PUBLIC_FUSIONAUTH_SCHOOL_APP_ID,
      redirectUrl: "admin#/teacher",
    },
    // {
    //   consonant: false,
    //   en: "official",
    //   hi: "अधिकारी",
    //   credentials: "Admin Console",
    //   applicationId: process.env.NEXT_PUBLIC_FUSIONAUTH_STATE_APP_ID,
    //   redirectUrl: `admin#/teacher`,
    // },
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
      id: "PENDING",
      name: "Pending",//No Action Taken
      icon: "warning",
      color: "#FEC400",
    },
    {
      id: "REJECTED",
      name: "Rejected",
      icon: "pending_actions",
      color: "#F12B2C",
      templateId: "1007409368881000345",
      template: "Your registration request for e-Samvad has been rejected. Please contact your school head regarding this matter.\n\nSamagra Shiksha, Himachal Pradesh",
    },
    {
      id: "ACTIVE",
      name: "Active",
      icon: "inventory",
      color: "#29CC97",
      templateId: "1007578130357765332",
      template: "Your registration on e-Samvad has been approved. You can login to the app to access all the features.\n\nSamagra Shiksha, Himachal Pradesh",
    },
    {
      id: "DEACTIVATED",
      name: "Deactivated",
      icon: "real_estate_agent",
      color: "#cbcbcb",
    },
  ],
  jobCadre:[
    {id:'JBT',name:'JBT'},
    {id:'Head Teacher',name:'Head Teacher'},
    {id:'CHT',name:'CHT'},
    {id:'DPE',name:'DPE'},
    {id:'C&V',name:'C&V'},
    {id:'TGT',name:'TGT'},
    {id:'Lecturer',name:'Lecturer'},
    {id:'Principal',name:'Principal'},
    {id:'Head Master',name:'Head Master'},
  ],
  modeOfEmployment:[
    {id:'Permanent',name:'Permanent'},
    {id:'Contractual',name:'Contractual'},
    {id:'Others',name:'Others'},
  ],
  isEnabled:[
    {id:'false',name:'false'},
    {id:'true',name:'true'},
  ],
  deliveryTypeChoices: [
    { id: "hand", name: "Hand Off", filterable: true },
    { id: "pickup", name: "Pick Up", filterable: true },
    { id: "courier", name: "Courier", filterable: true },
    { id: "handnonhp", name: "Hand Off (outside HP)" },
    { id: "couriernonhp", name: "Courier (outside HP)" },
  ],
  schoolSession: [
    {id:'S',name:'Summer'},
    {id:'W',name:'Winter'}
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