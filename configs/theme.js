import { createTheme } from "@material-ui/core";
import {
  colors,
  bodyFontStyle,
  card as MuiCard,
  chip as MuiChip,
  button as MuiButton,
} from "styles";

export default createTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: "#fff",
    },
    secondary: {
      main: colors.secondary,
      contrastText: "#fff",
    },
    error: {
      main: colors.error,
    },
    success: {
      main: colors.success,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
      default: colors.default,
      hint: colors.textHint,
    },
  },
  overrides: {
    "@global": {
      body: {
        ...bodyFontStyle,
      },
    },
    MuiButton,
    MuiCard,
    MuiChip,
  },
});
