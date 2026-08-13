# Android e APK

## APK interno

O perfil `preview` de `eas.json` está configurado para APK de instalação direta. A pasta `builds/` é ignorada pelo Git, pois APK é artefato de distribuição e não código-fonte.

Para validar o projeto:

```powershell
npm ci
npm run preflight
```

Para gerar localmente depois do prebuild:

```powershell
npx expo prebuild --platform android --clean --no-install
npm run build:android:internal
```

Em uma pasta sincronizada pelo Google Drive, o Gradle pode encontrar arquivos temporários travados. Nesse caso, faça a compilação em uma cópia temporária fora do Drive e copie somente o APK final para `builds/`.

## Build na nuvem

Depois de vincular o projeto a uma conta Expo/EAS:

```powershell
npx eas-cli build --platform android --profile preview
```

O perfil `production` gera AAB. Ele só deve ser usado depois de configurar a assinatura definitiva e validar os itens do checklist de produção em `docs/STATUS-DO-PROJETO.md`.

## Identidade do app

- pacote Android: `com.grtech.olliorcamentos`
- versão pública: `1.0.0`
- versionCode Android: `2`

Cada versão publicada deve aumentar o `versionCode`.
