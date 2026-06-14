import { MD3LightTheme } from 'react-native-paper';
import { Fonts } from './fonts';

export const Colors = {
  // Marca
  primary: '#0B6FCE',         // Azul OLLI (Artic Blue)
  primaryLight: '#3B8FE0',
  primaryDark: '#0A2540',     // Azul Profundo (Deep Ink)
  primaryContainer: '#E4F0FB',
  primaryContainerText: '#0A2540',
  accent: '#34C6D9',          // Ciano Gelo (Frost) — acento da marca
  accentContainer: '#DCF5F9',
  secondary: '#34C6D9',
  secondaryContainer: '#DCF5F9',

  // Status
  success: '#15B66E',
  successLight: '#DDF5EA',
  danger: '#F25555',
  dangerLight: '#FDE8E8',
  warning: '#F5A524',
  warningLight: '#FDF1DC',

  // Superfícies
  background: '#F4F7FB',
  surface: '#FFFFFF',
  surfaceVariant: '#EEF3F9',
  card: '#FFFFFF',

  // Texto
  onPrimary: '#FFFFFF',
  onBackground: '#0A2540',
  onSurface: '#0F2742',
  onSurfaceVariant: '#64748B',
  onSurfaceMuted: '#94A3B8',

  // Bordas
  outline: '#E2E8F0',
  outlineDark: '#CBD5E1',

  // Tabs
  tabInactive: '#94A3B8',
  tabActive: '#0B6FCE',

  // PDF
  pdfSectionBg: '#0A2540',
  pdfColumnHeaderBg: '#13385F',
  pdfTotalBarBg: '#0A2540',
  pdfApproveGreen: '#15B66E',
  pdfRejectRed: '#F25555',
  pdfCardBg: '#F4F7FB',
  pdfBorderColor: '#E2E8F0',
};

// Gradientes da marca
export const Gradients = {
  primary: ['#1486E6', '#0B6FCE', '#0A2540'] as const,
  primaryDiagonal: ['#0B6FCE', '#34C6D9'] as const, // azul -> ciano (ação-mor)
  brand: ['#0B6FCE', '#34C6D9'] as const,
  success: ['#19C77A', '#15B66E'] as const,
  header: ['#0B6FCE', '#0A2540'] as const,
  card: ['#1486E6', '#0B6FCE'] as const,
  dark: ['#13385F', '#0A2540'] as const,
  frost: ['#34C6D9', '#0B6FCE'] as const,
  surface: ['#FFFFFF', '#EEF3F9'] as const,
};

export const AppTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    primaryContainer: Colors.primaryContainer,
    secondary: Colors.accent,
    secondaryContainer: Colors.accentContainer,
    background: Colors.background,
    surface: Colors.surface,
    surfaceVariant: Colors.surfaceVariant,
    error: Colors.danger,
    onPrimary: Colors.onPrimary,
    onBackground: Colors.onBackground,
    onSurface: Colors.onSurface,
    outline: Colors.outline,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  full: 999,
};

export const Typography = {
  h1: { fontSize: 28, fontFamily: Fonts.extraBold, letterSpacing: -0.5 },
  h2: { fontSize: 22, fontFamily: Fonts.bold, letterSpacing: -0.3 },
  h3: { fontSize: 18, fontFamily: Fonts.semiBold },
  h4: { fontSize: 16, fontFamily: Fonts.semiBold },
  body: { fontSize: 14, fontFamily: Fonts.regular },
  bodySmall: { fontSize: 13, fontFamily: Fonts.regular },
  caption: { fontSize: 12, fontFamily: Fonts.regular },
  label: { fontSize: 11, fontFamily: Fonts.semiBold, letterSpacing: 0.5 },
  button: { fontSize: 15, fontFamily: Fonts.bold },
};

// Sombras tingidas de azul profundo (não preto neutro)
export const Shadow = {
  sm: {
    shadowColor: '#0A2540',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#0A2540',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0A2540',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 20,
    elevation: 8,
  },
};
