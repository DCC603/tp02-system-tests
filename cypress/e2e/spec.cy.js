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

  // Exercício: Implementar mais 3 testes
  it('Limpa tarefas completas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .eq(1)
      .click();

    cy.get('[class=clear-completed]')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa 3');
  });

  it ('Verifica botão de marcar todas', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}');

    cy.get('.toggle-all-label') //seta que alterna todas as tarefas
      .click();
    
    cy.get('[data-cy=todos-list]') 
      .children()
      .should('have.length', 3);
    
    cy.get('[data-cy=filter-completed-link')
      .click();
      
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3)
      .first()
      .should('have.text', 'Tarefa 1')
      .next()
      .should('have.text', 'Tarefa 2')
      .next()
      .should('have.text', 'Tarefa 3');

    cy.get('[data-cy=filter-active-link')
    .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0)
    
    cy.get('[data-cy=filter-all-link')
      .click();
    
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3);

    cy.get('.toggle-all-label') //seta que alterna todas as tarefas
      .click();
    
    cy.get('[data-cy=filter-active-link')
    .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3)
    
    cy.get('[data-cy=filter-completed-link')
      .click();
    
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);

  });

  it('Edita uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa a ser editada{enter}');

    cy.get('[data-cy=todos-list] > li')
      .first()
      .dblclick();

    cy.get('[data-cy=todos-list] > li input.edit')
      .clear()
      .type('Tarefa editada{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa editada');
  });

});