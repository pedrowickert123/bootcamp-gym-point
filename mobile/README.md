<h1 align="center">
<img src="../logo-gympoint.png">
</h1>
<h3 align="center">
Mobile React Native - GoStack Bootcamp  <a href="https://rocketseat.com.br" target="__blank">Rocketseat</a>
</h3>

## :iphone: Mobile

## Rquisitos

- Git [Git](https://git-scm.com)
- Node.js [Node.js v10.16](https://nodejs.org/)
- Yarn [Yarn v1.13](https://yarnpkg.com/)
- Emulador Android [emulador](https://developer.android.com/)
- React Native CLI [react-native-cli](https://github.com/react-native-community/cli)
- Back-end Gympoint [Back-end-gympoint](../backend)

## Instruções

```bash
# clonando o repositório:
git clone https://github.com/pedrowickert123/bootcamp-gym-point.git

# entrando na pasta do projeto
cd mobile

# instalando as dependências do package.json:
yarn install

# criar .env para informar as SUAS variáveis de ambiente
cp .env.example .env

# Habilitar as comunicação do emulador com (API, reactotron)
adb reverse tcp:4444 tcp:4444
adb reverse tcp:8081 tcp:8081
adb reverse tcp:9090 tcp:9090

# instalando o App no emulador (ANDROID)
react-native run-android

# inicializando App Mobile
react-native start
```

## Login

**_Deve inserir um aluno na aplicação web e acessar o app com o ID gerado_**
