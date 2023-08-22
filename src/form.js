import iconArcade from "../assets/images/icon-arcade.svg";
import iconAdvanced from "../assets/images/icon-advanced.svg";
import iconPro from "../assets/images/icon-pro.svg";

const body = [
  {
    TITLE: "Personal info",
    NAME: "Your Info",
    SUBTITLE: "Please provide your name, email address, phone number",
    QUESTIONS: [
      { type: "input", label: "Name", placeholder: "e.g.Stephen King" },
      {
        type: "input",
        label: "Email Address",
        placeholder: "e.g.stephenking@lorem.com"
      },
      {
        type: "input",
        label: "Phone Number",
        placeholder: "e.g.+1 234 567 890"
      }
    ]
  },
  {
    TITLE: "Select your plan",
    NAME: "Select Plan",
    SUBTITLE: "You have the option of monthly or yearly billing.",
    QUESTIONS: [
      {
        type: "card",
        options: [
          {
            id: "arcade",
            img: iconArcade,
            title: "Arcade",
            subtitle: "$9/mo"
          },
          {
            id: "advanced",
            img: iconAdvanced,
            title: "Advanced",
            subtitle: "$12/mo"
          },
          {
            id: "pro",
            img: iconPro,
            title: "Pro",
            subtitle: "$15/mo"
          }
        ]
      },
      {
        type: "switch",
        from: "Monthly",
        to: "Yearly"
      }
    ]
  }
];

export default body;
