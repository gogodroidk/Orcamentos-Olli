# OLLI — Handoff de Construção (para Codex / próximo dev)

> Este documento + o repositório neste zip = **tudo que precisa** para continuar a construção do OLLI.
> Leia este arquivo inteiro antes de começar. Datado: 2026-06-15.

---

## 0. TL;DR
OLLI é a evolução de um **app de orçamentos** para uma **plataforma de operação completa** para
prestadores de serviço (foco ar-condicionado/refrigeração, versátil), com um **assistente de IA "OLLI"**
em todas as telas e um modelo **SaaS** (planos). O backend (Supabase) e um esqueleto de painel web (PWA)
já existem. O **design final (alta fidelidade)** está em `design/handoff/`. Falta **recriar o design no
app Expo/React Native** e empilhar as features (ver Roadmap). O dono **quer vender como SaaS**.

---

## 1. Stack & distribuição (alvo)
- **Expo SDK 56** · React Native 0.85 · **TypeScript**
- React Navigation (bottom tabs + native stack)
- **expo-sqlite** (offline) + **Supabase** (nuvem / sync / auth)
- expo-print / expo-sharing (PDF e compartilhamento)
- react-native-signature-canvas (assinatura) · react-native-gifted-charts (gráficos)
- Fontes: **Plus Jakarta Sans** (UI) + **Spectral** (serifada, títulos de documento e números)
- **Distribuição:** Android (Play Store, nativo) · **iPhone (PWA — sem taxa da Apple)** · Web (painel do patrão)
- ⚠️ **OBRIGATÓRIO:** o `AGENTS.md` exige ler os docs versionados em
  https://docs.expo.dev/versions/v56.0.0/ **antes de escrever código** (a API do Expo mudou).

---

## 2. O QUE JÁ FOI FEITO ✅

### 2.1 Backend Supabase (PRONTO, na `main`)
- Projeto **"OLLI ORCAMENTOS"** — ref `yiaeplqinnnnniyvwtls` (org `OLLI`).
- URL: `https://yiaeplqinnnnniyvwtls.supabase.co` · anon key (pública) está em `src/config.ts` e `web/.env`.
- Criadas 9 tabelas com **RLS por usuário** (`user_id = auth.uid()`): `empresa`, `clientes`, `servicos`,
  `produtos`, `orcamentos`, `recibos`, `modelos`, `depoimentos`, `contadores`. Tabela legada `backups` preservada.
- **Arquitetura híbrida** nas tabelas complexas (`orcamentos`/`recibos`/`modelos`/`empresa`): colunas
  consultáveis (numero, status, valor_total, cliente_nome, datas…) **+** coluna `dados jsonb` com o objeto
  completo — espelha como o app já guarda os dados, facilitando a migração.
- `id` é **TEXT** (UUID gerado no cliente). `user_id` tem default `auth.uid()` (não enviar no insert).
- Arquivos: `supabase/migrations/0001_create_core_orcamentos_schema.sql`, `supabase/types.ts`
  (tipos TS gerados — fonte canônica), `supabase/README.md`.

### 2.2 Painel web PWA (esqueleto PRONTO, na `main`, em `web/`)
- Vite + React + TS + react-router + @supabase/supabase-js + vite-plugin-pwa.
- Login Supabase, camada de dados tipada (`web/src/lib/api.ts`), páginas-lista, **instalável** (manifest+SW).
- **Estilo neutro proposital** — tokens em variáveis CSS (`:root`), prontos pra receber o design.
- Rodar: `cd web && npm install && npm run dev`. Build verificado (tsc 0 erros, dist com SW).

### 2.3 Design handoff (em `design/handoff/`)
- Protótipos HTML de **alta fidelidade** + `README.md` com **design tokens, telas e interações**.
- `OLLI App.dc.html` é o protótipo PRINCIPAL (app navegável). Os outros são telas individuais.
- ⚠️ São **referência visual/comportamental**, NÃO copiar como código. Recriar em RN/Expo.

### 2.4 Fundação do design system no APP (Fase 1 — EM ANDAMENTO, NÃO verificado)
Mudanças já aplicadas no working tree (incluídas neste zip), mas **`npm install`+`tsc` ainda NÃO rodaram com sucesso** (interrompido):
- `src/theme/index.ts` — **reescrito** para o tema **escuro "cockpit"** (tokens de cor/sombra/tipografia),
  + paleta clara `Doc` para PDF/link do cliente, + `Typography.display/serifTitle/serifNum` (Spectral), MD3DarkTheme.
- `src/theme/fonts.ts` — adicionados slots serif (`serif`, `serifMedium`, `serifBold` = Spectral).
- `App.tsx` — carrega Spectral via `useFonts`.
- `package.json` — adicionada dep `@expo-google-fonts/spectral@^0.4.1`.
- `src/components/OlliCard.tsx` — borda sutil (estilo "vidro" do tema escuro).
- `src/steps/Step1Cliente.tsx` — **convertido de ISO-8859 → UTF-8** (bug pré-existente que quebrava o tsc).

**Próximo passo técnico imediato:** `npm install` → `npx tsc --noEmit` e corrigir o que sobrar (ver Gotchas).

---

## 3. DECISÕES TOMADAS (não reabrir sem motivo)
- **SaaS desde já** (o dono quer vender p/ outros prestadores). Multiempresa já está no DNA via RLS por usuário.
  Para times (papéis admin/funcionário) será preciso uma camada de organização → usuários (fase posterior).
- **Cobrança/billing:** Stripe (quando o núcleo estiver vendável). 
- **iPhone via PWA** (sem taxa Apple de US$99/ano); **Android nativo** (Play, US$25 único); **Web = painel do patrão**.
- **Tema do app = ESCURO "cockpit"**; **documentos (PDF, link do cliente) = CLARO** (ver paleta `Doc`).
- **Banco híbrido** (jsonb + colunas) espelhando o storage atual do app.
- `applyFontPatch()` (em `src/theme/fonts.ts`) aplica Plus Jakarta Sans globalmente por `fontWeight`,
  sem editar tela por tela. A **Spectral** é usada explicitamente via `fontFamily: Fonts.serif` (o patch respeita).

---

## 4. ROADMAP (fatiar — construir em direção ao "tudo")
1. **Fase 1 (EM ANDAMENTO):** design system + **Home (cockpit)** + **Novo Orçamento (wizard 4 etapas)** +
   **PDF editorial** + **Link do Cliente (aprovar/recusar)**. Reusa o backend. Custo externo zero.
2. **Fase 2:** **OLLI Voz** (falar → orçamento): speech-to-text + LLM extrai itens + casa com o catálogo.
3. **💳 Cobrança (Stripe):** planos (Grátis/Pro/Empresa), trial 14 dias, limites por plano.
4. **Fase 3:** **Processos / OS guiada** (checklists, ordem de serviço, fotos antes/depois + assinatura, lembretes).
5. **Fase 4:** **Agenda + rotas/ETA** (Google Directions, paga) + **equipe ao vivo**.
6. **Fase 5:** **Painel web completo** + papéis **admin/funcionário**.
7. **Fase 6:** **Estoque** + **códigos de erro** (IA ingere manuais) + preços de mercado.

---

## 5. ONDE CONTINUAR AGORA — passos da Fase 1 (em ordem)
1. `npm install` (a dep Spectral já está corrigida p/ `^0.4.1`) → `npx tsc --noEmit`; corrigir erros restantes.
2. **Reconstruir `src/screens/HomeScreen.tsx`** no layout cockpit (refs: `design/handoff/OLLI Home.dc.html`
   e `OLLI App.dc.html`). Para a Fase 1, usar SÓ dados que já existem (faturamento aprovado, conversão,
   em aberto, recentes, e o lembrete "cobrar orçamentos parados +5 dias" — calculável). Deixar
   agenda/equipe/"mala de hoje" para fases futuras (ou como teaser "em breve").
3. **Varrer as demais telas** (`Orcamentos`, `Catalogo`, `Servicos`, `Produtos`, `Clientes`, `Conta`,
   `EmitirRecibo`, `VisualizarOrcamento`, `steps/*`) para o tema escuro. Muitas adaptam via tokens, MAS
   há trechos com cores hardcoded a corrigir (ex.: na Home antiga, um chip com `backgroundColor:'#fff'`
   e texto `Colors.onSurface` que agora é branco → ficaria invisível).
4. **Nova tab bar** (5 abas do design: Início · Agenda · **＋Orçamento** (botão central elevado, gradiente)
   · Estoque · Conta). Agenda/Estoque podem ser placeholders "em breve" na Fase 1.
5. **Wizard Novo Orçamento** (`src/screens/NovoOrcamentoScreen.tsx` + `src/steps/Step1..4`) no design
   (`OLLI Novo Orcamento.dc.html`): tabs Cliente · Itens · Detalhes · Enviar; total recalcula ao vivo;
   tela de sucesso com link copiável + WhatsApp + Ver PDF.
6. **PDF editorial** (`src/utils/pdfGenerator.ts`, via expo-print, HTML→PDF, tema **claro** `Doc`, Spectral
   nos títulos/totais, espinha de cor à esquerda, marca d'água do monograma). Ref: `OLLI Orcamento.dc.html`.
7. **Link do Cliente** (no app `web/`, rota pública responsiva, tema claro): aprovar/recusar grava status
   no Supabase e (futuro) notifica a empresa. Ref: `OLLI Link Cliente.dc.html`.

> Observação: integrar o app ao Supabase (hoje o app usa SQLite local + `backups` em blob). Estratégia
> recomendada: manter SQLite como **cache offline** e **sincronizar** com as tabelas do Supabase. A
> numeração sequencial (`contadores`) deve virar função no banco / upsert atômico p/ não colidir entre dispositivos.

---

## 6. GOTCHAS / ARMADILHAS (importante!)
- **`@expo-google-fonts/spectral` mais nova = `0.4.1`** (NÃO existe `0.4.2`). Usar `^0.4.1`.
- **NUNCA** usar `| tail` (ou qualquer pipe) com `npm install` em background sem checar `${PIPESTATUS[0]}`
  — o pipe mascara o exit code e um install que FALHOU parece ter dado certo (foi o que aconteceu: node_modules ficou vazio).
- `src/steps/Step1Cliente.tsx` estava em **ISO-8859** (corrigido p/ UTF-8). Se aparecer erro tsc
  "File appears to be binary", é encoding — rodar `iconv -f ISO-8859-1 -t UTF-8 arquivo > tmp && mv tmp arquivo`.
- **Não dá pra verificar o visual do RN em ambiente headless** — validar rodando no **Expo Go**
  (iPhone: abrir a Câmera no QR code do `npx expo start`; estar na mesma Wi-Fi).
- **Supabase — 2 avisos de segurança** (recomendado resolver):
  1. Função pré-existente `public.rls_auto_enable()` é SECURITY DEFINER exposta a anon/authenticated →
     `revoke execute on function public.rls_auto_enable() from anon, authenticated;`
  2. Proteção contra senha vazada desligada → ligar em Dashboard → Authentication → Providers → Password.
- `app.json`: `extra.eas.projectId` é **placeholder** — rodar `eas init` p/ um projectId real do EAS.
- Falta `assets/android-icon-background.png` (uma camada do ícone adaptativo Android) — o dono vai subir; não bloqueia.

---

## 7. REPOSITÓRIO / GIT
- GitHub: **`gogodroidk/Orcamentos-Olli`**. Branch de dev: **`claude/admiring-pasteur-vyqmd5`**.
- **PR #3** (backend Supabase) e **PR #6** (painel web PWA) já **mergeados na `main`**.
- As mudanças da **Fase 1 (fundação do tema)** estavam **não commitadas** quando este zip foi gerado —
  estão incluídas aqui no working tree (ver seção 2.4).

---

## 8. CONTEÚDO DESTE ZIP
- Projeto Expo/RN completo (`App.tsx`, `src/`, `assets/`, `app.json`, etc.) com as mudanças da Fase 1.
- `design/handoff/` — protótipos de design (alta fidelidade) + README com tokens/telas.
- `supabase/` — migração SQL + tipos TS + README de arquitetura.
- `web/` — painel web PWA (esqueleto).
- `AGENTS.md` / `CLAUDE.md` — regras do projeto (ler docs Expo v56 antes de codar).
- Este `HANDOFF.md`.
- **NÃO incluído:** `node_modules/`, `.git/`, `dist/`, `.expo/` (reinstalar com `npm install`).
