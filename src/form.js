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
        id: "card",
        type: "card",
        options: [
          {
            id: "arcade",
            img: iconArcade,
            title: "Arcade",
            subtitle: (awnser) => {
              return awnser.switch === "Yearly" ? "$90/yr" : "$9/mo";
            },
            extra: (awnser) => {
              return awnser.switch === "Yearly" && "2 months free";
            }
          },
          {
            id: "advanced",
            img: iconAdvanced,
            title: "Advanced",
            subtitle: (awnser) => {
              return awnser.switch === "Yearly" ? "$120/yr" : "$12/mo";
            },
            extra: (awnser) => {
              return awnser.switch === "Yearly" && "2 months free";
            }
          },
          {
            id: "pro",
            img: iconPro,
            title: "Pro",
            subtitle: (awnser) => {
              return awnser.switch === "Yearly" ? "$150/yr" : "$15/mo";
            },
            extra: (awnser) => {
              return awnser.switch === "Yearly" && "2 months free";
            }
          }
        ]
      },
      {
        id: "switch",
        type: "switch",
        from: "Monthly",
        to: "Yearly"
      }
    ]
  },
  {
    TITLE: "Pick add-ons",
    SUBTITLE: "Add-ons help enhance your gaming experience",
    NAME: "ADD-ONS",
    QUESTIONS: [
      {
        id: "add-ons",
        type: "checkbox",
        options: [
          {
            id: 1,
            title: "Online service",
            subtitle: "Access to multiplayer games",
            value: (awnser) => {
              return awnser.switch === "Monthly" ? "$1/mo" : "$10/yr";
            }
          },
          {
            id: 2,
            title: "Larger storage",
            subtitle: "Extra 1TB of cloud save",
            value: (awnser) => {
              return awnser.switch === "Monthly" ? "$2/mo" : "$20/yr";
            }
          },
          {
            id: 3,
            title: "Customizable profile",
            subtitle: "Custom theme on your profile",
            value: (awnser) => {
              return awnser.switch === "Monthly" ? "$2/mo" : "$20/yr";
            }
          }
        ]
      }
    ]
  },
  {
    TITLE: "Summary",
    SUBTITLE: "Double-check everything looks OK before confirming",
    NAME: "SUMMARY",
    QUESTIONS: [
      {
        type: "summary",
        resume: {
          header: {
            title: (awnser) => awnser.card.title,
            subtitle: (awnser) =>
              typeof awnser.card.subtitle === "function"
                ? awnser.card.subtitle(awnser)
                : awnser.card.subtitle
          },
          content: (awnser) => {
            return awnser.checkbox;
          },
          total: (awnser) => {
            const price = Number(
              awnser.card
                .subtitle(awnser)
                .replace("$", "")
                .replace("/mo", "")
                .replace("/yr", "")
            );
            const total = awnser.checkbox.reduce((total, item) => {
              return (
                total +
                Number(
                  item
                    .value(awnser)
                    .replace("$", "")
                    .replace("/mo", "")
                    .replace("/yr", "")
                )
              );
            }, price);
            return `$${total}/${awnser.checkbox[0].value(awnser).substring(4)}`;
          }
        }
      }
    ]
  }
];

export default body;
