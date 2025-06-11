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

    it('Marca e desmarca uma tarefa como concluída', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Revisar código{enter}');

    cy.get('[data-cy=toggle-todo-checkbox]')
      .check()
      .should('be.checked');

    cy.get('[data-cy=toggle-todo-checkbox]')
      .uncheck()
      .should('not.be.checked');
  });

  it('Mostra a contagem correta de tarefas ativas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}');

    cy.get('[data-cy=toggle-todo-checkbox]')
      .first()
      .check();

    cy.get('.todo-count')
      .should('contain', '1 item left');
  });

  it('adiciona uma tarefa e marca como concluída', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Estudar Cypress{enter}');

    cy.contains('li', 'Estudar Cypress')
      .should('exist')
      .as('tarefa');

    cy.get('@tarefa')
      .find('input[type=checkbox]')
      .check();

    cy.get('@tarefa')
      .should('have.class', 'completed');
  });
});