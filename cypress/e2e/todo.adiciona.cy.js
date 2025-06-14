
describe('TodoMVC – adicionar tarefas', () => {
  const url = 'http://localhost:7001';

  beforeEach(() => {
    cy.visit(url);
  });

  it('adiciona duas tarefas e lista', () => {
    cy.get('.new-todo')
      .type('Estudar Jest{enter}')
      .type('Escrever testes E2E{enter}');

    cy.get('.todo-list li').should('have.length', 2);
    cy.contains('Estudar Jest').should('exist');
    cy.contains('Escrever testes E2E').should('exist');
  });
});
