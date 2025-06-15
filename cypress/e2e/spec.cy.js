describe('TODOMvc App', () => {

  beforeEach(() => {
    cy.visit('http://localhost:7001')
  })

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
  
  it('Limpa o campo de input após adicionar uma tarefa', () => {
      cy.get('[data-cy=todo-input]')
        .type('teste clear{enter}')
      cy.get('[data-cy=todo-input]')
        .should('have.value', '')
  })

  it('Input possui placeholder correto', () => {
    cy.get('[data-cy=todo-input]')
      .should('have.attr', 'placeholder', 'What needs to be done?')
  })


   it('Limpa todas as tarefas concluídas', () => {
    cy.get('[data-cy=todo-input]')
      .type('t1{enter}')
      .type('t2{enter}')
      .type('t3{enter}')

    cy.get('[data-cy=toggle-todo-checkbox]').eq(0).click()
    cy.get('[data-cy=toggle-todo-checkbox]').eq(1).click()

    cy.contains('Clear completed').should('be.visible').click()

    cy.get('[data-cy=todos-list] li')
      .should('have.length', 1)
      .first()
      .should('have.text', 't3')
  })

});