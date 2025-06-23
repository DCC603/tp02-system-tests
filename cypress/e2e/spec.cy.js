describe('TODOMvc App', () => {

  it('Edits an existing todo item', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
        .type('Original Task{enter}');

    cy.get('[data-cy=todos-list] li label')
        .dblclick();

    const new_text =  Math.random().toString()
    cy.get('[data-cy=todos-list] li .edit')
        .clear()
        .type(new_text + '{enter}');

    cy.get('[data-cy=todos-list] li')
        .should('have.text', new_text);
  });

  it('active filter show only not completed', () => {
    cy.visit('');

    for (let i = 0; i < 10; i++) {
      cy.get('[data-cy=todo-input]')
          .type(`Task ${i}{enter}`);
    }

    for (let i = 0; i < 6; i++) {
      cy.get('[data-cy=todos-list] li [data-cy=toggle-todo-checkbox]')
          .eq(i)
          .click();
    }

    cy.get('[data-cy=filter-active-link]')
        .click();

    cy.get('[data-cy=todos-list] li')
        .should('have.length', 4) // 10 - 6
        .each(($el, index) => {
          cy.wrap($el).should('contain', `Task ${index + 6}`);
        });
  });

  it('Does not add empty todo items', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
        .type('{enter}');

    cy.get('[data-cy=todos-list] li')
        .should('have.length', 0);
  });

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
});
