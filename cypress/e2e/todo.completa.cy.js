describe('TodoMVC – concluir tarefa', () => {
  const url = 'http://localhost:7001';

  beforeEach(() => {
    cy.visit(url);
    cy.get('.new-todo').type('Terminar roteiro E2E{enter}');
  });

  it('marca como concluída e recebe classe .completed', () => {
    cy.get('.todo-list li').first().find('.toggle').click();
    cy.get('.todo-list li')
      .first()
      .should('have.class', 'completed')
      .find('label')
      .should('have.css', 'text-decoration-line', 'line-through');
  });
});
