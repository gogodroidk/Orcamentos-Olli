import { MD3DarkTheme } from 'react-native-paper';
import { Fonts } from './fonts';

/**
 * Tema "Cockpit" (ESCURO) — identidade principal do app OLLI.
 * Documentos (PDF) e o link do cliente usam o tema CLARO (ver `Doc`).
 */
export const Colors = {
  // ── Marca ───────────────────────────────────────────────
  primary: '#0B6FCE',          // Azul OLLI
  primaryLight: '#3B8FE0',
  primaryDark: '#0A2540',      // Azul profundo (ink)
  accent: '#34C6D9',           // Ciano gelo (frost) — acento da marca / IA
  accentBright: '#7FE9F5',     // ciano claro (olhos da OLLI, brilhos)
  secondary: '#34C6D9',

  // ── Cockpit (superfícies escuras) ───────────────────────
  background: '#0A1626',       // fundo do app
  bar: '#0C1B2E',              // tab bar / sidebar
  surface: 'rgba(255,255,255,0.05)',   // cards (vidro)
  surfaceSolid: '#0F2036',     // card opaco quando necessário
  surfaceVariant: '#0F2036',
  surfaceBorder: 'rgba(255,255,255,0.08)',
  card: 'rgba(255,255,255,0.05)',

  // ── Containers tonais (sobre escuro) ────────────────────
  primaryContainer: 'rgba(11,111,206,0.16)',
  primaryContainerText: '#CDE6FB',
  accentContainer: 'rgba(52,198,217,0.16)',
  secondaryContainer: 'rgba(52,198,217,0.16)',

  // ── Status ──────────────────────────────────────────────
  success: '#2BD787',
  successDark: '#15B66E',
  successLight: 'rgba(43,215,135,0.14)',
  danger: '#FF6B6B',
  dangerDark: '#F25555',
  dangerLight: 'rgba(255,107,107,0.14)',
  warning: '#F7B23B',
  warningLight: 'rgba(247,178,59,0.14)',

  // ── Texto (sobre escuro) ────────────────────────────────
  text: '#FFFFFF',
  onPrimary: '#FFFFFF',
  onBackground: '#FFFFFF',
  onSurface: '#FFFFFF',
  textMuted: 'rgba(226,232,240,0.55)',
  onSurfaceVariant: 'rgba(226,232,240,0.55)',
  onSurfaceMuted: 'rgba(226,232,240,0.40)',

  // ── Bordas ──────────────────────────────────────────────
  outline: 'rgba(255,255,255,0.08)',
  outlineDark: 'rgba(255,255,255,0.14)',

  // ── Tabs ────────────────────────────────────────────────
  tabActive: '#34C6D9',
  tabInactive: 'rgba(226,232,240,0.45)',

  // ── PDF / documento (tema CLARO — sincronizado com pdfGenerator) ──
  pdfSectionBg: '#0A2540',
  pdfColumnHeaderBg: '#13385F',
  pdfTotalBarBg: '#0A2540',
  pdfApproveGreen: '#15B66E',
  pdfRejectRed: '#F25555',
  pdfCardBg: '#F4F7FB',
  pdfBorderColor: '#E2E8F0',
};

/** Paleta CLARA para documentos: PDF e link do cliente. */
export const Doc = {
  paper: '#FFFFFF',
  canvas: '#E4E7EC',
  ink: '#16202E',
  inkSoft: '#1A2230',
  muted: '#5A6575',
  muted2: '#8A93A2',
  hairline: '#E7E9EE',
  hairline2: '#EDEFF2',
  accent: '#0B6FCE',
  accentOptions: ['#0B6FCE', '#0E7C66', '#B4451F', '#5B3DA8', '#1C2230'] as const,
};

// Gradientes da marca
export const Gradients = {
  primary: ['#1486E6', '#0B6FCE', '#0A2540'] as const,
  primaryDiagonal: ['#0B6FCE', '#34C6D9'] as const, // azul -> ciano (ação-mor / OLLI)
  brand: ['#0B6FCE', '#34C6D9'] as const,
  frost: ['#34C6D9', '#7FE9F5'] as const,
  success: ['#2BD787', '#15B66E'] as const,
  header: ['#0B6FCE', '#0A2540'] as const,
  dark: ['#13385F', '#0A2540'] as const,
  cockpit: ['#0C1B2E', '#0A1626'] as const,
};

export const AppTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: Colors.primary,
    primaryContainer: Colors.primaryContainer,
    secondary: Colors.accent,
    secondaryContainer: Colors.accentContainer,
    background: Colors.background,
    surface: Colors.surfaceSolid,
    surfaceVariant: Colors.surfaceVariant,
    error: Colors.danger,
    onPrimary: Colors.onPrimary,
    onBackground: Colors.onBackground,
    onSurface: Colors.onSurface,
    onSurfaceVariant: Colors.onSurfaceVariant,
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
  h2: { fontSize: 22, fontFamily: Fonts.extraBold, letterSpacing: -0.3 },
  h3: { fontSize: 16, fontFamily: Fonts.extraBold },
  h4: { fontSize: 14, fontFamily: Fonts.bold },
  body: { fontSize: 14, fontFamily: Fonts.regular },
  bodySmall: { fontSize: 13, fontFamily: Fonts.regular },
  caption: { fontSize: 12, fontFamily: Fonts.regular },
  // rótulos small-caps (10–11px / 800 / letter-spacing)
  label: { fontSize: 11, fontFamily: Fonts.extraBold, letterSpacing: 1.2 },
  button: { fontSize: 15, fontFamily: Fonts.bold },
  // Serifada editorial (Spectral) — títulos de documento e números de destaque
  display: { fontSize: 30, fontFamily: Fonts.serifBold, letterSpacing: -0.5 },
  serifTitle: { fontSize: 22, fontFamily: Fonts.serif },
  serifNum: { fontFamily: Fonts.serif },
};

// Sombras para tema escuro (pretas, mais densas que o tema claro)
export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.32,
    shadowRadius: 18,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.4,
    shadowRadius: 34,
    elevation: 12,
  },
};
