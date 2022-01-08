const controls = [
  {
    name: "username",
    type: "text",
    placeholder: "Username",
    autoComplete: "off",
    required: true,
  },
  {
    name: "password",
    type: "text",
    placeholder: "Password",
    autoComplete: "off",
    required: true,
    style: {
      WebkitTextSecurity: "disc",
      "font-family": "text-security-disc",
    },
  },
];

export default controls;
