# OLLI Orçamentos

Aplicativo mobile (Android / iOS) para **criação e gestão de orçamentos e recibos**, desenvolvido pela **GR Tech**. Construído com Expo + React Native + TypeScript, com banco de dados local (SQLite) e backup/sincronização na nuvem via Supabase.

## ✨ Funcionalidades

- **Dashboard** com visão geral do negócio e gráficos
- **Orçamentos** criados em um assistente de 4 etapas: cliente → itens → detalhes → personalização
- **Clientes, Produtos e Serviços** (catálogo)
- **Geração de PDF** e compartilhamento do orçamento
- **Emissão de recibos** com assinatura
- **Meu Negócio / Conta** — dados da empresa e configurações
- Armazenamento **offline** (SQLite) com **backup** via Supabase

## 🧱 Stack

- **Expo SDK 56** / **React Native 0.85** / **TypeScript**
- **React Navigation** (bottom tabs + native stack)
- **expo-sqlite** — banco de dados local
- **Supabase** — backup / sincronização na nuvem
- **expo-print** / **expo-sharing** — geração e envio de PDF
- **react-native-signature-canvas** — assinatura de recibos
- **react-native-gifted-charts** — gráficos
- **react-native-paper** — componentes de UI
- **Plus Jakarta Sans** — tipografia

## 📁 Estrutura

```
src/
  components/   Componentes reutilizáveis (botões, inputs, cards, logo, badges...)
  screens/      Telas (Home, Orçamentos, Clientes, Produtos, Serviços, Conta...)
  steps/        Assistente de novo orçamento (4 etapas)
  navigation/   Navegação do app (AppNavigator)
  database/     Camada de acesso ao SQLite
  services/     Integração Supabase e backup
  utils/        Moeda, datas, máscaras, geração de PDF, IDs
  theme/        Cores, espaçamentos e tipografia
  types/        Tipos TypeScript compartilhados
assets/         Ícones do app e splash screen
```

## 🚀 Como rodar

Pré-requisitos: **Node.js LTS** e o app **Expo Go** (ou um *development build*).

```bash
npm install
npm run preflight
npm start        # inicia o Metro / Expo
npm run android  # roda no Android
npm run ios      # roda no iOS
npm run web      # versão web
```

> ⚠️ Este projeto usa o **Expo SDK 56**. Consulte a documentação exata da versão em
> https://docs.expo.dev/versions/v56.0.0/ antes de alterar dependências ou código nativo.

## 📦 Notas

- As pastas nativas `android/` e `ios/` são **geradas** pelo Expo (`expo prebuild`) e, por isso,
  não são versionadas (ver `.gitignore`). Rode `npx expo prebuild` para recriá-las localmente.
- Identificador do app: `com.grtech.olliorcamentos`.
- Credenciais públicas do app Expo ficam em `.env.local`, baseado em `.env.example`.
- A prévia web do app Expo usa `metro.config.js` para carregar o WASM do `expo-sqlite`.

## ✅ Verificações

```bash
npm run preflight
```

Com o servidor web Expo aberto em `http://127.0.0.1:8082`, também é possível validar a Home e o início do fluxo:

```bash
npm run qa:web
```
