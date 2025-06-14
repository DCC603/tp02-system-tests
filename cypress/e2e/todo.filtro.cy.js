describe('TodoMVC – filtro Ativas', () => {
  const url = 'http://localhost:7001';

  beforeEach(() => {
    cy.visit(url);
    cy.get('.new-todo')
      .type('Tarefa pendente{enter}')      // ainda ativa
      .type('Tarefa concluída{enter}');    // vamos concluir

    // marca a 2ª como concluída
    cy.get('.todo-list li').eq(1).find('.toggle').click();
  });

  it('mostra apenas tarefas ativas quando filtro Active é clicado', () => {
    cy.contains('Active').click();                // link no rodapé
    cy.get('.todo-list li').should('have.length', 1);
    cy.contains('Tarefa pendente').should('exist');
    cy.contains('Tarefa concluída').should('not.exist');
  });
});
