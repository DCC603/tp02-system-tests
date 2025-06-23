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

  it('Marca e desmarca uma atividade como completada', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Atividade importante{enter}');
    
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();
    
    cy.get('[data-cy=filter-completed-link]')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);
    
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  })

  it('Marca todas as atividades como completadas a partir do botão toggle all label', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Roteiro Prático 3{enter}')
      .type('Atividade avaliativa{enter}');

    cy.get('[data-cy=toggle-all-label]')
      .click();
    
    cy.get('[data-cy=filter-active-link]')
      .click()
    
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);

    cy.get('[data-cy=filter-completed-link')
      .click()

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  })

  it('Usa o botão Clear completed para apagar as tarefas completadas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Terminar Trabalho Prático{enter}')
      .type('Fazer atividade{enter}');

    
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
    
    cy.get('[data-cy=clear-completed-button]')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Fazer atividade');
  })
});