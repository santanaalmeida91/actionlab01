# GH-200 CI/CD Lab

Um site estático minúsculo (HTML/CSS/JS puro, zero dependências de build)
com um pipeline real de CI/CD em `.github/workflows/ci-cd.yml`, feito para
você colocar num repositório GitHub, ver rodar de verdade e ir quebrando/
consertando enquanto revisa para o GH-200.

O pipeline tem dois jobs:

1. **`test`** — roda em todo `push`/`pull_request`: instala Node, executa
   `npm test` (testes de `src/utils.js` com o runner nativo do Node, sem
   dependências externas) e um "lint" simples que falha se sobrar algum
   `TODO` no código.
2. **`deploy`** — `needs: test` e só roda em `push` direto para `main`
   (nunca em PR). Injeta o SHA do commit, o número do run e a data no
   rodapé do site, e publica no **GitHub Pages** usando
   `actions/deploy-pages`.

## 1. Colocar no seu GitHub

```bash
# dentro da pasta gh200-cicd-lab/
git init
git add .
git commit -m "chore: initial commit — GH-200 CI/CD lab"
git branch -M main
git remote add origin https://github.com/<SEU_USUARIO>/gh200-cicd-lab.git
git push -u origin main
```

## 2. Habilitar o GitHub Pages

No repositório: **Settings → Pages → Build and deployment → Source** →
selecione **GitHub Actions** (não "Deploy from a branch" — o workflow já
cuida disso).

## 3. Assistir o pipeline rodar

Aba **Actions** do repositório → clique no run mais recente → veja o job
`Build & Test` passar e o job `Deploy to GitHub Pages` publicar o site.
A URL final aparece no resumo do job de deploy (e em Settings → Pages).

## 4. Exercícios práticos (mapeados aos domínios do GH-200)

Cada item abaixo é uma mudança pequena, isolada, para você fazer, dar
`git push` (de preferência numa branch + Pull Request) e observar o
comportamento no pipeline real — exatamente o tipo de cenário cobrado na
prova.

### Domínio 1 — Author and manage workflows
- [ ] Abra uma branch, quebre o teste em `tests/utils.test.js` (troque um
      `5` por `6`) e abra um PR contra `main`. Veja o job `test` falhar e
      o `deploy` nem aparecer (ele está atrás de `needs: test`).
- [ ] Adicione uma `strategy: matrix` no job `test` para rodar em Node 18
      e 20 (há um comentário `🧪 TRY THIS` já indicando onde).
- [ ] Descomente o bloco `concurrency` no topo do workflow, dê dois pushes
      seguidos rápido em `main` e veja o primeiro run ser cancelado.
- [ ] Adicione `paths-ignore: ['**.md']` no `on.push` e confirme que editar
      só o README não dispara mais o pipeline.
- [ ] Adicione um `GITHUB_STEP_SUMMARY` no job `test` escrevendo quantos
      testes passaram.

### Domínio 2 — Consume and troubleshoot workflows
- [ ] Quebre o YAML de propósito (desalinhe uma indentação) e veja onde o
      erro aparece na aba Actions.
- [ ] Depois de um run com falha, corrija o problema e use **Re-run failed
      jobs** em vez de reenviar um commit — repare que ele não re-executa
      o que já tinha passado.
- [ ] Ative os debug secrets `ACTIONS_STEP_DEBUG` e `ACTIONS_RUNNER_DEBUG`
      (Settings → Secrets and variables → Actions) e compare o volume de
      log antes/depois.

### Domínio 3 — Author and maintain actions
- [ ] Extraia o step de "lint" para uma **composite action** em
      `.github/actions/no-todo-check/action.yml` e chame-a do
      `ci-cd.yml` com `uses: ./.github/actions/no-todo-check`. Lembre-se:
      todo `run:` de composite action precisa de `shell:` explícito.

### Domínio 4 — Manage GitHub Actions for the enterprise
- [ ] Em **Settings → Environments → github-pages**, adicione um
      **required reviewer** (pode ser você mesmo) e veja o job `deploy`
      pausar esperando aprovação manual no próximo push para `main`.
- [ ] Crie uma variável de repositório (`vars`) chamada `SITE_TITLE` e use
      `${{ vars.SITE_TITLE }}` em algum step do workflow (ex.: um `echo`
      no resumo do job) para praticar a diferença entre `vars` e
      `secrets`.

### Domínio 5 — Secure and optimize automation
- [ ] Rode `npm test` localmente e confirme que o job `test` não pediu
      `permissions` de escrita — só o `deploy` eleva `pages`/`id-token`.
      Tente rodar o site com o token só de leitura e observe que nada
      quebra (least privilege em ação).
- [ ] Troque `actions/checkout@v4` por um SHA completo (copie o SHA atual
      da tag `v4` no repositório `actions/checkout`) e confirme que o
      workflow continua funcionando — só que agora está pinado.
- [ ] Adicione um step que tenta ecoar `${{ secrets.GITHUB_TOKEN }}` e
      confirme, no log, que o valor aparece mascarado (`***`).

## Estrutura

```text
gh200-cicd-lab/
├── .github/workflows/ci-cd.yml   ← o pipeline
├── index.html                    ← a página
├── style.css
├── script.js                     ← lógica de DOM (countdown + contador)
├── src/utils.js                  ← funções puras, testadas
├── tests/utils.test.js           ← testes (node --test)
├── package.json
└── README.md
```

## Rodar localmente

```bash
npm test               # roda a suíte de testes
open index.html        # ou simplesmente abra o arquivo no navegador
```

Bom estudo — e bom pipeline. 🚀
