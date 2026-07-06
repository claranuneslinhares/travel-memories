# Travel Memories
## Autores

Maria Clara Nunes e Raynara Gustavo

## Descrição

Travel Memories é um aplicativo mobile desenvolvido em React Native com Expo que permite registrar e organizar memórias de viagens. O usuário pode cadastrar informações sobre cada viagem, adicionar uma foto, registrar a localização e visualizar os locais visitados em um mapa.


---

## Objetivo

Desenvolver um aplicativo para registrar viagens, permitindo que o usuário armazene suas experiências de forma simples e intuitiva.

---

## Principais funcionalidades

- Cadastro de viagens
- Registro de:
  - Destino
  - Data
  - Diário da viagem
  - Avaliação por corações
- Captura de foto utilizando a câmera do celular
- Registro da localização atual
- Busca da localização de viagens já realizadas
- Visualização das viagens em um mapa
- Pesquisa de viagens pelo destino
- Edição das informações cadastradas
- Exclusão de viagens
- Armazenamento local utilizando AsyncStorage

## Como executar o projeto

1. Clone o repositório.

```bash
git clone <url-do-repositorio>
```

2. Instale as dependências.

```bash
npm install
```

3. Execute o projeto.

```bash
npx expo start
```

4. Para gerar o APK:

```bash
eas build -p android
```

---

## Estrutura do projeto

```
src/
 ├── components/
 ├── context/
 ├── navigation/
 ├── screens/
 ├── types/
 └── App.tsx
```

---

## Recursos utilizados

- Câmera do dispositivo
- Localização (GPS)
- Mapa interativo
- Armazenamento local
- Navegação entre telas


