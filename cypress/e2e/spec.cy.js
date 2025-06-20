describe("TODOMvc App", () => {
  it("Verifica se app está abrindo", () => {
    cy.visit("");
  });

  it("Insere uma tarefa", () => {
    cy.visit("");

    cy.get("[data-cy=todo-input]").type("TP2 de Engenharia de Software{enter}");

    cy.get("[data-cy=todos-list]")
      .children()
      .should("have.length", 1)
      .first()
      .should("have.text", "TP2 de Engenharia de Software");
  });

  it("Insere e deleta uma tarefa", () => {
    cy.visit("");

    cy.get("[data-cy=todo-input]").type("TP2 de Engenharia de Software{enter}");

    cy.get("[data-cy=todos-list]").children().should("have.length", 1);

    cy.get("[data-cy=todos-list] > li [data-cy=remove-todo-btn]")
      .invoke("show")
      .click();

    cy.get("[data-cy=todos-list]").children().should("have.length", 0);
  });

  it("Filtra tarefas completas e ativas", () => {
    cy.visit("");

    cy.get("[data-cy=todo-input]")
      .type("TP2 de ES{enter}")
      .type("Prova de ES{enter}");

    cy.get("[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]")
      .first()
      .click();

    cy.get("[data-cy=filter-active-link").click();
    cy.get("[data-cy=todos-list]")
      .children()
      .should("have.length", 1)
      .first()
      .should("have.text", "Prova de ES");

    cy.get("[data-cy=filter-completed-link").click();
    cy.get("[data-cy=todos-list]")
      .children()
      .should("have.length", 1)
      .first()
      .should("have.text", "TP2 de ES");

    cy.get("[data-cy=filter-all-link").click();
    cy.get("[data-cy=todos-list]").children().should("have.length", 2);
  });
});

describe("Testes TP2 de Engenharia de Software", () => {
  it("Insere tarefa e renomeia", () => {
    cy.visit("");

    cy.get("[data-cy=todo-input]").type("Tarefa 1{enter}");

    cy.get("[data-cy=todos-list]")
      .children()
      .first()
      .should("have.text", "Tarefa 1");

    cy.get("[data-cy=todos-list] > li")
      .children()
      .first()
      .dblclick()
      .get("[class=edit]")
      .clear()
      .type("Tarefa 1 renomeada{enter}");

    cy.get("[data-cy=todos-list]")
      .children()
      .first()
      .should("have.text", "Tarefa 1 renomeada");
  });

  it("Atribui concluído para todas as tarefas", () => {
    cy.visit("");

    cy.get("[data-cy=todo-input]")
      .type("Tarefa 1{enter}")
      .type("Tarefa 2{enter}")
      .type("Tarefa 3{enter}");

    cy.get("[class=toggle-all-label]").click();

    cy.get("[data-cy=filter-completed-link").click();
    cy.get("[data-cy=todos-list]").children().should("have.length", 3);
  });

  it("Conclui tarefas com botão Clear Completed", () => {
    cy.visit("");

    cy.get("[data-cy=todo-input]").type("Tarefa 1{enter}");

    cy.get("[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]")
      .first()
      .click();

    cy.get("[class=clear-completed").click();

    cy.get("[data-cy=todos-list]").children().should("have.length", 0);
  });
});
