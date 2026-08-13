# Estado do projeto

Atualizado em 12/08/2026.

## O que está funcional

- inicialização local e criação do banco SQLite;
- cadastro de clientes, serviços e produtos;
- criação e edição de orçamentos;
- cálculo de subtotal, desconto, acréscimo e total;
- geração e compartilhamento de PDF;
- recibos e dados do negócio;
- autenticação e backup/restauração manual via Supabase quando o ambiente está configurado;
- versão web usada para validação rápida da interface;
- projeto Android nativo gerável a partir da configuração Expo.

## Validações automatizadas

O comando único é:

```powershell
npm run preflight
```

Ele executa:

- TypeScript sem emissão de arquivos;
- testes unitários com Vitest;
- Expo Doctor.

O GitHub Actions repete esse preflight em cada push e pull request.

Última validação local em 12/08/2026:

- TypeScript: passou;
- testes unitários: 9/9 passaram;
- Expo Doctor: 21/21 verificações passaram;
- QA web: Home e fluxo de novo orçamento passaram em 1280x720 e 390x844;
- Android: APK release compilado para `com.grtech.olliorcamentos`, versão `1.0.0`, versionCode `2`;
- assinatura do APK: esquema v2 válido, com certificado Android Debug para uso interno.

## Limites conhecidos

- backup em nuvem é manual; não há sincronização automática em segundo plano;
- aprovação e rejeição do orçamento são combinadas pelo WhatsApp, não por links clicáveis dentro do PDF;
- o APK interno usa assinatura de desenvolvimento e serve para teste/instalação direta, não para publicação na Play Store;
- a restauração real do Supabase deve ser testada com uma conta de homologação antes de tratar o app como produção;
- notificações e outros recursos planejados ainda não equivalem a um fluxo comercial completo em produção.

## Critério para chamar de produção

Antes de publicar para clientes:

1. criar uma chave de assinatura Android definitiva e guardá-la fora do Git;
2. testar instalação e atualização em pelo menos um aparelho Android físico;
3. testar cadastro, login, backup e restauração com uma conta de homologação;
4. revisar permissões, política de privacidade e ficha da Play Store;
5. gerar AAB assinado de produção e validar no canal de teste interno da Play Console.
