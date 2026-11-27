ECODESPENSA | FIAP GLOBAL SOLUTION 2 — 2026
CitizenTech — Consumo inteligente e sustentável

INTEGRANTE
Bruna Fazan — RM564463

1. PROPOSTA
O EcoDespensa apoia famílias e cidadãos na organização dos alimentos domésticos, priorizando a validade e registrando consumo e descarte. Não requer login, servidor ou banco remoto. ODS 12, meta 12.3: redução do desperdício alimentar. Fonte: https://sdgs.un.org/goals/goal12

2. EXECUÇÃO
Requisitos: Node.js 22 LTS, npm, conexão para instalação inicial e navegador moderno. Opcional: Expo Go compatível com SDK 54 ou emulador Android configurado.
Extraia o ZIP e abra a pasta EcoDespensa que contém package.json no VS Code. No terminal:
  npm install
  npm run web
Para dispositivo móvel: npm start e escaneie o QR code com Expo Go compatível, na mesma rede. Para emulador Android: npm run android. Para parar: Ctrl+C.
Se houver incompatibilidade de dependências, execute npx expo install --check e revise o diagnóstico. Não é necessário instalar banco ou Java para o modo web.

3. FUNCIONALIDADES
Cadastro: nome (2 a 80 caracteres), categoria, quantidade positiva, unidade e validade no formato AAAA-MM-DD. Datas inexistentes são rejeitadas.
Despensa: busca por nome, filtro de categoria e situação combináveis, ordenação crescente por validade.
Alertas visuais: vencido quando a data é anterior ao dia local; a vencer quando faltam 0 a 3 dias; no prazo nos demais casos. Não há notificações push.
Consumo e descarte: confirmação encerra a quantidade integral do registro. O histórico permanece consultável; não há baixa parcial.
Painel: contagem de registros ativos, próximos do vencimento, vencidos, consumidos e descartados. Os números representam registros, não peso, volume ou impacto ambiental comprovado.

4. TECNOLOGIAS E ARQUITETURA
React Native 0.81, Expo SDK 54, React 19, JavaScript, React Native Web e AsyncStorage. Escolha: reutilização de código mobile/web, prototipação simples e funcionamento local após carregamento. App.js contém a interface e a coordenação dos fluxos; src/domain.js concentra as regras puras; src/storage.js encapsula leitura/gravação JSON assíncrona.
Fluxo atual: interface -> validação/regra de domínio -> adaptador de armazenamento -> atualização do estado após gravação bem-sucedida. Na abertura, os registros são lidos antes de permitir alterações.
Arquitetura futura (não implantada): aplicativo -> API Gateway HTTPS -> serviço de inventário (cadastro e baixa), serviço de validade (eventos e alertas) e serviço de indicadores (projeções agregadas). Cada serviço possui armazenamento próprio; inventário publica eventos identificados de modo idempotente; alertas e indicadores consomem os eventos com consistência eventual. Autenticação, autorização por domicílio, proteção de dados e sincronização offline são requisitos dessa evolução. Não há integração real entre usuários nesta versão.

5. MEMÓRIA E EFICIÊNCIA
FlatList virtualiza a listagem (8 itens iniciais e por lote, janela 5); useMemo evita recomputar filtros e métricas sem mudança dos dados; atualização por cópia preserva estado; timer e listener AppState são removidos no unmount; a referência live evita atualizações após desmontagem. A gravação é serializada por trava; falhas de leitura impedem sobrescrita. AsyncStorage guarda apenas texto JSON, sem fotos nem anexos. O conjunto completo é carregado em memória e regravado a cada alteração; para volumes elevados, migrar para SQLite com paginação e índices. Não foram realizadas medições de memória.

6. TESTES
npm test (Node test runner, sem dependências externas). Os 11 testes de domínio passaram no ambiente de preparação. Consulte docs/RESULTADO_TESTES.txt. A instalação Expo não foi possível nesse ambiente por falha DNS no registro npm; a interface e a persistência precisam de validação manual no dispositivo/navegador.
Roteiro de validação: cadastrar dois itens com datas distintas; testar data inválida; pesquisar e filtrar; verificar alertas; confirmar consumo e descarte; recarregar e verificar histórico e painel.

7. LIMITES E RESPONSABILIDADE
O aplicativo não determina segurança alimentar nem recomenda consumir alimentos vencidos. As datas devem ser interpretadas junto às instruções de armazenamento e do fabricante. Não há sincronização, notificações externas, dados pessoais obrigatórios ou comprovação empírica da redução do desperdício. Os dados ficam no dispositivo/navegador e podem ser perdidos ao limpar armazenamento.
