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

  it('Edita um item todo', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]').type('Edit this todo{enter}');
    cy.get('[data-cy=todos-list] > li label')
        .dblclick();
    cy.get('[data-cy=todos-list] > li .edit')
        .clear()
        .type('Edited todo{enter}');
    cy.get('[data-cy=todos-list]')
        .children()
        .first()
        .should('have.text', 'Edited todo');
  });

  it('Marca todos os todos como completos', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]').type('Task 1{enter}Task 2{enter}');
    cy.get('.toggle-all-label').click();
    cy.get('[data-cy=todos-list] > li')
        .each(($el) => {
          cy.wrap($el).should('have.class', 'completed');
        });
  });

  it('Limpa os todos completos', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]').type('To complete{enter}');
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
        .click();
    cy.get('.clear-completed').click();
    cy.get('[data-cy=todos-list]')
        .children()
        .should('have.length', 0);
  });
});
