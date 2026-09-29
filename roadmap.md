# Roadmap: Caça ao Curso - Formulário de Sorteio (Instituto Reis)

Este documento descreve o passo a passo para a criação e implantação da nova página `/sorteio` (estilo Quiz) integrada de forma gratuita com o Google Sheets, e a automação de confirmação via WhatsApp.

## Fase 1: Backend e Banco de Dados (Google Sheets + Apps Script)

**Objetivo:** Preparar a planilha para receber os dados gratuitamente e gerar uma URL (API) para o site enviar as respostas.

- [x] Criar uma nova aba (worksheet) na planilha do Excel/Google Sheets existente, chamada "Sorteio_QR_Code".
- [x] Configurar as colunas na planilha para receber todas as 10 perguntas + dados pessoais (Nome, Idade, WhatsApp, Bairro, E-mail).
- [x] Criar um script no Google Apps Script vinculado à planilha (código que fará o papel de servidor de forma 100% gratuita, sem cold-start ou limites severos).
- [x] Publicar o script como um "Aplicativo da Web" para gerar a URL (Endpoint) que será consumida pelo site.

## Fase 2: Interface e Design (`/sorteio`)

**Objetivo:** Criar a estrutura HTML e CSS do formulário no formato "Quiz" passo a passo.

- [x] Criar o arquivo `sorteio.html` (acessível como `/sorteio` via servidor web) mantendo a identidade visual Premium (cores, fontes, logos) do Instituto Reis.
- [x] Construir a capa de introdução: "CAÇA AO CURSO — VOCÊ ENCONTROU!".
- [x] Estruturar as 10 etapas do formulário (estilo Typeform), mesclando botões de múltipla escolha e campos de texto (para as perguntas 5, 7 e 8, além dos dados pessoais).
- [x] Adicionar barra de progresso para manter o usuário engajado.

## Fase 3: Lógica JavaScript e Integração

**Objetivo:** Fazer o quiz funcionar (avançar passos) e enviar os dados para a planilha.

- [x] Implementar a navegação passo a passo (mostrar apenas uma pergunta por vez, com botão "Próximo").
- [x] Validar campos obrigatórios para evitar envios em branco.
- [x] Integrar o envio do formulário, conectando o evento de "Submit" ao fetch via POST para a URL do Google Apps Script (Fase 1).
- [x] Tratar estados de "Enviando..." (Loading) para uma boa experiência do usuário.

## Fase 4: Tela de Sucesso e Redirecionamento (WhatsApp)

**Objetivo:** Confirmar a participação e criar o gatilho para a pessoa enviar a mensagem no WhatsApp.

- [x] Construir a tela final que aparece logo após os dados caírem na planilha (tela de sucesso).
- [x] Adicionar o botão com a copy: _"Para confirmar sua participação no caça ao curso do instituto reis, confirme no whatsapp clicando no botão"_.
- [x] Configurar o link dinâmico do WhatsApp (`https://wa.me/5521966666335?text=Acabei%20de%20me%20cadastrar%20no%20ca%C3%A7a%20ao%20curso%20do%20instituto%20reis`) com a mensagem pré-definida.

## Fase 5: Testes e Deploy

**Objetivo:** Garantir que tudo funciona no ambiente real.

- [ ] Realizar envios de teste para confirmar se as informações estão entrando nas colunas corretas da aba no Google Sheets.
- [ ] Testar a responsividade no celular (já que o público acessará via QR Code na rua, a experiência mobile tem que ser impecável e fluida).
- [ ] Fazer o Push para a branch `main` do GitHub para disparar o GitHub Actions (FTP).
- [ ] Validar a publicação final no servidor da Hostinger em `/sorteio`.
