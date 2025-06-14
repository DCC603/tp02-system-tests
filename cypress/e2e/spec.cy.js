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

  // Novos testes adicionados aqui

  it('Edita uma tarefa existente', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa para editar{enter}');

    cy.get('[data-cy=todos-list] > li')
      .first()
      .dblclick();

    cy.get('[data-cy=todos-list] > li input.edit')
      .clear()
      .type('Tarefa editada{enter}');

    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('have.text', 'Tarefa editada');
  });

  it('Limpa todas as tarefas completas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .each(($el) => {
        cy.wrap($el).click();
      });

    cy.get('[data-cy=clear-completed-btn]')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Marca todas as tarefas como completas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}');

    cy.get('[data-cy=toggle-all-checkbox]')
      .click();

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .each(($el) => {
        cy.wrap($el).should('be.checked');
      });
  });
});
