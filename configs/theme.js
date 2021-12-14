import {
  MuiPalette,
  bodyFontStyle,
  card as MuiCard,
  chip as MuiChip,
  button as MuiButton,
  typography as MuiTypography,
} from "styles";

const themeConfig = {
  palette: MuiPalette,
  overrides: {
    "@global": {
      body: {
        ...bodyFontStyle,
      },
    },
    MuiButton,
    MuiCard,
    MuiChip,
    MuiTypography,
  },
};

export default themeConfig;
