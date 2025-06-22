describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

/* ------------------------------------------------------------------ */
/* 1 – Criar múltiplas tarefas e verificar contagem                    */
/* ------------------------------------------------------------------ */
it('Adiciona três tarefas e exibe-las na lista', () => {
  cy.visit('');

  const itens = ['Estudar Cypress', 'Enviar relatório', 'Fazer exercícios'];

  itens.forEach(t => cy.get('[data-cy=todo-input]').type(`${t}{enter}`));

  cy.get('[data-cy=todos-list] li')
    .should('have.length', itens.length)
    .each(($li, idx) => {
      cy.wrap($li).should('have.text', itens[idx]);
    });
});

/* ------------------------------------------------------------------ */
/* 2 – Concluir item e usar filtros Active / Completed                 */
/* ------------------------------------------------------------------ */
it('Conclui uma tarefa e valida filtros “Active” e “Completed”', () => {
  cy.visit('');

  cy.get('[data-cy=todo-input]')
    .type('Primeira tarefa{enter}')
    .type('Segunda tarefa{enter}');

  // Conclui a primeira
  cy.get('[data-cy=todos-list] li')
    .first()
    .find('[data-cy=toggle-todo-checkbox]')
    .check();

  // Filtro Active → apenas a não concluída
  cy.get('[data-cy=filter-active-link]').click();
  cy.get('[data-cy=todos-list] li')
    .should('have.length', 1)
    .first()
    .should('have.text', 'Segunda tarefa');

  // Filtro Completed → apenas a concluída
  cy.get('[data-cy=filter-completed-link]').click();
  cy.get('[data-cy=todos-list] li')
    .should('have.length', 1)
    .first()
    .should('have.text', 'Primeira tarefa');
});

/* ------------------------------------------------------------------ */
/* 3 – Limpar concluídos com o botão “Clear completed”                 */
/* ------------------------------------------------------------------ */
it('Remove tarefas concluídas usando “Clear completed”', () => {
  cy.visit('');

  ['A', 'B', 'C'].forEach(t =>
    cy.get('[data-cy=todo-input]').type(`${t}{enter}`)
  );

  // Conclui A e C
  cy.get('[data-cy=todos-list] li').eq(0)
    .find('[data-cy=toggle-todo-checkbox]').check();
  cy.get('[data-cy=todos-list] li').eq(2)
    .find('[data-cy=toggle-todo-checkbox]').check();

  // Botão “Clear completed” aparece e remove A e C
  cy.contains('button', 'Clear completed')
    .should('be.visible')
    .click();

  // Deve restar apenas B
  cy.get('[data-cy=todos-list] li')
    .should('have.length', 1)
    .first()
    .should('have.text', 'B');
});
});