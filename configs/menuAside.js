import {
  mdiAccountCircle,
  mdiMonitor,
  mdiHelpCircle,
  mdiLock,
  mdiSquareEditOutline,
  mdiTable,
  mdiMenuOpen,
  mdiTelevisionGuide,
  mdiBarcode,
  mdiPalette,
  mdiCardAccountDetailsOutline,
  mdiOpenInNew,
  mdiFormDropdown,
  mdiBallot,
  mdiViewQuilt,
} from "@mdi/js";

export default [
  {
    to: "/",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  {
    to: "/prem/tablesListsView",
    label: "Tables & Lists",
    icon: mdiTable,
    updateMark: "warning",
  },
  {
    to: "/FormsView",
    label: "Forms Base",
    icon: mdiSquareEditOutline,
  },
  {
    to: "/prem/FormsView",
    label: "Forms Advanced",
    icon: mdiBallot,
  },
  {
    to: "/uiView",
    label: "UI Base",
    icon: mdiTelevisionGuide,
  },
  {
    to: "/prem/uiView",
    label: "UI Advanced",
    icon: mdiViewQuilt,
  },
  {
    to: "/prem/styleView",
    label: "Styles",
    icon: mdiPalette,
  },
  {
    to: "/prem/pricingView",
    label: "Pricing layout",
    icon: mdiBarcode,
  },

  {
    to: "/prem/profileView",
    label: "Profile",
    icon: mdiAccountCircle,
  },
  {
    to: "/prem/loginView",
    label: "Login",
    icon: mdiLock,
  },
  {
    // Key should be unique for each submenus object
    // It is required for open/close logic
    key: "submenus-1",
    label: "Sub",
    icon: mdiMenuOpen,
    menuSecondary: [
      {
        to: "/profileView",
        label: "Sample RouterLink",
        icon: mdiCardAccountDetailsOutline,
      },
      {
        label: "External link",
        href: "https://justboil.me",
        icon: mdiOpenInNew,
        target: "_blank",
      },
      {
        label: "Dropdown",
        icon: mdiFormDropdown,
        menu: [
          {
            label: "Dropdown item One",
          },
          {
            label: "Dropdown item Two",
          },
        ],
      },
    ],
  },
  {
    href: "https://justboil.me/tailwind-admin-templates/vue-dashboard/",
    label: "About",
    icon: mdiHelpCircle,
  },
];
