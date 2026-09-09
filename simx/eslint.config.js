import microbit from "@microbit/eslint-config/react";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  ...microbit,
  reactRefresh.configs.vite,
  {
    settings: {
      "react-x": {
        version: "18.3.1",
      },
    },
  },
];
