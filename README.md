# 🚀 DaviSpeck_mongo-data-ingestion-typescript

Um projeto de ingestão de dados em TypeScript, focado no processamento e armazenamento de dados acadêmicos e profissionais em bancos de dados MongoDB e PostgreSQL. O sistema oferece rotas para processar diferentes formatos de arquivos (Excel, CSV, Parquet) e serviços para gerenciar instituições de ensino, programas de pós-graduação e perfis individuais.

## ✨ Funcionalidades Principais

### 📊 Processamento de Dados
- **Rotas para processamento de arquivos**: Excel, CSV e Parquet.
- **Serviços de ingestão**: Processamento em lote de dados acadêmicos e profissionais.
- **Validação e normalização**: Verificação de campos obrigatórios e transformação de tipos.

### 🏛️ Gerenciamento de Instituições e Programas
- **IES (Instituições de Ensino Superior)**: Criação e atualização de registros.
- **PPG (Programas de Pós-Graduação)**: CRUD completo com validação de campos.
- **Perfis Acadêmicos**: Armazenamento e validação de perfis com relacionamentos a IES e PPG.

### ⏱️ Linha do Tempo e Histórico
- **Timeline Data**: Armazenamento de eventos temporais com prevenção de duplicatas.
- **Histórico de Processos**: Registro de ações em processos com validação de campos.

### 🛠️ Utilitários
- **Leitura de arquivos**: Suporte a Excel, CSV e Parquet.
- **Divisão de arquivos**: Script para dividir arquivos Parquet em chunks menores.
- **Logging**: Sistema de logs estruturados com saída para console e arquivo.

## 📂 Arquivos Importantes

### 🐳 Configuração Docker
- **`docker-compose.yml`**: Configuração de containers para MongoDB, PostgreSQL e Node.js.

### 🏗️ Estrutura Principal
- **`app.ts`**: Configuração da aplicação Express com middleware e rotas.
- **`server.ts`**: Inicialização do servidor e conexão com bancos de dados.
- **`routes.ts`**: Definição das rotas da API.
- **`database.ts`**: Configuração de conexões com MongoDB e PostgreSQL.

### 🧩 Serviços
- **`process.service.ts`**: Processamento e persistência de dados acadêmicos.
- **`ies.service.ts`**: Gerenciamento de Instituições de Ensino Superior.
- **`ppg.service.ts`**: Operações CRUD para Programas de Pós-Graduação.
- **`profile.service.ts`**: Criação e gestão de perfis acadêmicos.
- **`timeline-data.service.ts`**: Gerenciamento de registros de timeline.
- **`historico-processo.service.ts`**: Registro de histórico de processos.

### 📦 Modelos e Entidades
- **`ies.model.ts`**: Schema Mongoose para IES.
- **`ppg.model.ts`**: Schema Mongoose para PPG.
- **`profile.model.ts`**: Schema Mongoose para perfis acadêmicos.
- **`timeline-data.entity.ts`**: Entidade TypeORM para dados de timeline.
- **`historico-processo.entity.ts`**: Entidade TypeORM para histórico de processos.

### 🛠️ Utilitários
- **`reader.ts`**: Leitura de arquivos Excel, CSV e Parquet.
- **`helpers.ts`**: Funções utilitárias para conversão e validação de dados.
- **`split-parquet-file.py`**: Script para dividir arquivos Parquet.
- **`read-parquet.py`**: Script de exploração para arquivos Parquet.

### 🧪 Testes
- **`routes.test.ts`**: Testes de integração para rotas de processamento.
- **`profile.integration.test.ts`**: Testes para rota de perfis.
- **`ppg.integration.test.ts`**: Testes para rota de PPG.

## 🚀 Instalação e Execução

### Pré-requisitos
- Docker e Docker Compose instalados.
- Node.js (versão compatível com o projeto).

### Passos para Execução
1. **Clone o repositório**:
   ```bash
   git clone https://github.com/DaviSpeck/mongo-data-ingestion-typescript.git
   cd mongo-data-ingestion-typescript
   ```

2. **Inicie os containers**:
   ```bash
   docker-compose up -d
   ```

3. **Instale as dependências**:
   ```bash
   npm install
   ```

4. **Execute a aplicação**:
   ```bash
   npm start
   ```

5. **Acesse a API**:
   - A API estará disponível em `http://localhost:3000/api`.

## 📦 Dependências Externas
- **Bancos de Dados**:
  - MongoDB (6.0)
  - PostgreSQL (15)
- **Bibliotecas Principais**:
  - Express
  - Mongoose
  - TypeORM
  - Winston (para logging)
  - DuckDB (para processamento de Parquet)

## 📜 Licença
Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido por [DaviSpeck](https://github.com/DaviSpeck).  
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.