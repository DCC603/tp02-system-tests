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
    cy.get('[data-cy=todo-input]')
      .type('Tarefa editável{enter}');
    cy.get('[data-cy=todos-list] li')
      .first()
      .find('label')
      .dblclick();
    cy.get('[data-cy=todos-list] li')
      .first()
      .find('input.edit')
      .clear()
      .type('Tarefa editada{enter}');
    cy.get('[data-cy=todos-list] li')
      .first()
      .find('label')
      .should('have.text', 'Tarefa editada');
  });

  it('Marca e desmarca uma tarefa como concluída', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('Tarefa para completar{enter}');
    cy.get('[data-cy=toggle-todo-checkbox]')
      .check();
    cy.get('[data-cy=todos-list] li')
      .should('have.class', 'completed');
    cy.get('[data-cy=toggle-todo-checkbox]')
      .uncheck();
    cy.get('[data-cy=todos-list] li')
      .should('not.have.class', 'completed');
  });

  it('Limpa todas as tarefas concluídas', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('Tarefa ativa{enter}')
      .type('Tarefa concluída{enter}');
    cy.get('[data-cy=todos-list] li')
      .last()
      .find('[data-cy=toggle-todo-checkbox]')
      .check();
    cy.get('.clear-completed')
      .click();
    cy.get('[data-cy=todos-list] li')
      .should('have.length', 1)
      .first()
      .find('label')
      .should('have.text', 'Tarefa ativa');
  });
});