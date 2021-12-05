import { alpha } from "@material-ui/core/styles";
import colors from "./colors";

const button = {
  root: {
    height: "48px",
    minWidth: "100px",
    borderRadius: "40px",
    whiteSpace: "nowrap",
    padding: "0 16px",
    fontWeight: 500,
    "&&": {
      boxShadow: "none",
    },
  },
  label: {
    fontSize: "16px",
    fontWeight: 500,
  },
  contained: {
    "&&:hover": {
      boxShadow: "0px 2px 10px -1px rgb(0 0 0 / 20%)",
    },
    "&&:active": {
      boxShadow: "0px 2px 10px -1px rgb(0 0 0 / 20%)",
    },
  },
  containedPrimary: {
    "&&": {
      backgroundColor: colors.primary,
    },
    "&&:hover": {
      backgroundColor: alpha(colors.primary, 1.1),
    },
  },
  containedSecondary: {
    "&&": {
      color: colors.textPrimary,
      backgroundColor: "#fff",
    },
  },
};

export default button;
