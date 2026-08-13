# OLLI Orçamentos

Aplicativo Expo/React Native para criar orçamentos e recibos, manter clientes, serviços e produtos, gerar PDF e fazer backup manual via Supabase.

O repositório também preserva o painel PWA em `web/` e o handoff visual em `design/handoff/`. Eles foram mantidos como módulos separados para não misturar código mobile, painel e referências.

## Estado atual

O projeto está em fase de MVP funcional. O núcleo local funciona offline com SQLite e possui validação automatizada. Backup/restauração em nuvem dependem de uma conta Supabase configurada. Consulte [docs/STATUS-DO-PROJETO.md](docs/STATUS-DO-PROJETO.md) para ver o que foi validado e o que ainda separa o APK interno de uma versão de produção.

## Stack

- Expo SDK 56 / React Native 0.85 / React 19
- TypeScript em modo estrito
- SQLite local com `expo-sqlite`
- Supabase Auth e tabela `backups` para cópia manual em nuvem
- React Navigation e React Native Paper
- Vitest para funções críticas de cálculo, moeda e HTML/PDF

## Começar

```powershell
npm ci
Copy-Item .env.example .env.local
npm run preflight
npm run web
```

Preencha em `.env.local` apenas os valores públicos do app:

```text
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

Nunca coloque `service_role`, senhas ou chaves privadas em variáveis `EXPO_PUBLIC_*`.

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm start` | inicia o Expo |
| `npm run web` | abre a versão web |
| `npm run android` | compila e executa no Android conectado |
| `npm run typecheck` | valida TypeScript |
| `npm test` | executa testes unitários |
| `npm run doctor` | verifica a saúde do projeto Expo |
| `npm run preflight` | executa TypeScript, testes e Expo Doctor |
| `npm run qa:web` | testa o fluxo inicial com o servidor web aberto |
| `npm run build:android:internal` | gera o APK release interno após o prebuild |

Para validar o painel preservado do repositório:

```powershell
Set-Location web
npm ci
npm run build
```

## Estrutura

```text
.github/            qualidade contínua e Dependabot
assets/             ícones e imagens empacotadas
docs/               documentação técnica e operacional
design/handoff/      referências e handoff visual preservados
scripts/            automações locais de QA
src/components/     componentes reutilizáveis
src/database/       banco SQLite e importação/exportação
src/navigation/     pilhas e abas
src/screens/        telas do aplicativo
src/services/       integrações externas
src/steps/          etapas do orçamento
src/theme/          tema visual
src/types/          tipos de domínio
src/utils/          cálculo, moeda, PDF e utilitários
supabase/migrations histórico SQL versionado
web/                 painel PWA Vite/React separado do app mobile
```

Documentos principais:

- [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md): regras de arquitetura;
- [docs/STATUS-DO-PROJETO.md](docs/STATUS-DO-PROJETO.md): funcionalidade e pendências;
- [docs/ANDROID.md](docs/ANDROID.md): APK, AAB e assinatura;
- [docs/SUPABASE.md](docs/SUPABASE.md): backend, RLS e checklist.

## Segurança do repositório

Não são versionados: `.env.local`, configurações locais de assistentes, `node_modules`, projeto Android gerado, resultados de QA e arquivos APK/AAB. O repositório deve permanecer privado enquanto o produto e a operação ainda estiverem em validação.
