const palette = {
  yellow: "#FDB44BE5",
  yellowLight: "#FFE67B",
  yellowA11y: "#C68417",
  blue: "#00BBF0",
  blueFade: "#00AAE0",
  blueLight: "#67EEFF",
  blueA11y: "#008BBD",
  red: "#FF6F6E",
  redLight: "#FFF3F8",
  redA11y: "#D32F2F",
  green: "#00BA88",
  greenLight: "#F2FFFB",
  greenAlly: "#00966D",
};

const status = {
  primary: palette.blue,
  secondary: palette.yellow,
  error: palette.red,
  success: palette.green,
};

const text = {
  textPrimary: "#00204A",
  textSecondary: "#fff",
  textDefault: "#1A365C",
  textHint: "#4D6380",
};

const color = {
  ...palette,
  ...status,
  ...text,
};

export default color;
