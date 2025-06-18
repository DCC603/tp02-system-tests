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

  
  it('Completa uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Sistemas Operacionais{enter}');
    
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('have.class', 'completed');
  })

  it('Limpa tarefas completas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP IHC{enter}')
      .type('TP2 IA{enter}')
      .type('Estudar prova SO{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .eq(0) 
      .click();
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .eq(2) 
      .click();

    cy.get('.clear-completed')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 IA'); 
  });

  it('Edita uma tarefa existente', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Fazer teste cypress{enter}');

    cy.get('[data-cy=todos-list] > li')
      .first()
      .dblclick();

    cy.get('[data-cy=todos-list] > li.editing .edit')
      .clear()
      .type('Tarefa editada com sucesso{enter}');

    cy.get('[data-cy=todos-list] > li')
    .should('have.text', 'Tarefa editada com sucesso');

    cy.get('[data-cy=todos-list]')
    .children().should('have.length', 1);
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
});