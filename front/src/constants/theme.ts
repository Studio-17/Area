
const themeConfig = {
  palette: {
    common: {
      black: '#000',
      white: '#fff',
      grey: '#E2DDFF'
    },
    primary: '#0165F5',
    secondary: '#a37c5b',
    background: '#FFF7FA',
  },
  spacingUnit: 8
};

/* Do not modify here, edit themeConfig instead */
export const theme = {
  palette: {
    ...themeConfig.palette
  },
  spacing: (...units: number[]) =>
    units.map((unit) => `${themeConfig.spacingUnit * unit}px`).join(' ')
};
