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

  it('Edita uma tarefa existente', () => {
  cy.visit('');

  cy.get('[data-cy=todo-input]').type('Tarefa para editar{enter}');

  cy.get('[data-cy=todos-list] li label')
    .dblclick();

  cy.get('[data-cy=todos-list] li .edit')
    .clear()
    .type('Tarefa editada com sucesso{enter}');

  cy.get('[data-cy=todos-list] li label')
    .should('have.text', 'Tarefa editada com sucesso');
});

  it('Marca todas as tarefas como concluídas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]').type('Tarefa 1{enter}').type('Tarefa 2{enter}');

    cy.get('.toggle-all-label').click();

    cy.get('[data-cy=todos-list] li').each(($el) => {
      cy.wrap($el).should('have.class', 'completed');
    });
  });

  it('Remove tarefas concluídas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]').type('Tarefa concluída{enter}');

    cy.get('[data-cy=toggle-todo-checkbox]').click();

    cy.get('.clear-completed').click();

    cy.get('[data-cy=todos-list]').children().should('have.length', 0);
  });

});