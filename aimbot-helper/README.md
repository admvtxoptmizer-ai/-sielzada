# 🎯 AIMBOT HELPER - @SIELZADA

Sistema completo de auxílio com Aimbot, Aimlock e configurações avançadas.

## 🚀 Instalação

```bash
npm install
```

## 💻 Desenvolvimento Local

```bash
npm run dev
```

Acesse: http://localhost:8888

## 📦 Deploy no Netlify

### Opção 1: Via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Opção 2: Via Git
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin [SEU_REPOSITORIO]
git push -u origin main
```

Depois conecte o repositório no painel do Netlify.

## 🎮 Funcionalidades

### Aimbot
- ✅ Auxilio 50%, 75%, 100%
- ✅ Aimlock
- ✅ FOV ajustável (0-10)
- ✅ Headshot automático
- ✅ Sem recuo

### Configurações
- 📍 Memory addresses do Free Fire
- 📍 Registry DWORD completos
- 📍 Touch controls configurados
- 📍 Injeção em libil2cpp.so

## 🔧 API Endpoints

### POST /api/aimbot
```json
{
  "auxilio": true,
  "aimlock": true,
  "fov": 5,
  "mode": "auxilio 100%",
  "intensity": 100
}
```

### GET /api/config
Retorna todas as configurações do sistema

## 📱 Interface

- Design moderno com Particles.js
- Animações suaves
- Responsivo
- Status em tempo real

## 👤 Créditos

**Design & Interface:** @sielxis
**Sistema:** @SIELZADA

## 📄 Licença

Este projeto é apenas para fins educacionais.
