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

  it("should be able to edit a todo", () => {
    cy.visit("");

    cy.get("[data-cy=todo-input]").type("tipo error{enter}");

    cy.get("[data-cy=todos-list]")
      .children()
      .contains("tipo error")
      .parent()
      .parent()
      .dblclick()
      .type("{selectAll}{backspace}typo error");
  });

  it("should complete all tasks", () => {
    cy.visit("");

    cy.get("[data-cy=todo-input]")
      .type("1{enter}")
      .type("2{enter}")
      .type("3{enter}");

    cy.get(".toggle-all-label").click();

    cy.get("[data-cy=filter-completed-link]").click();

    cy.get("[data-cy=todos-list]").children().should("have.length", 3);
  });

  it("should complete all tasks and another one", () => {
    cy.visit("");

    cy.get("[data-cy=todo-input]")
      .type("1{enter}")
      .type("2{enter}")
      .type("3{enter}");

    cy.get(".toggle-all-label").click();

    cy.get("[data-cy=filter-completed-link]").click();

    cy.get("[data-cy=todos-list]").children().should("have.length", 3);

    cy.get("[data-cy=todo-input]").type("oi{enter}");

    cy.get("[data-cy=filter-all-link]").click();
    cy.get("[data-cy=todos-list]").children().should("have.length", 4);

    cy.get("[data-cy=filter-active-link]").click();
    cy.get("[data-cy=todos-list]").children().should("have.length", 1);
  });
});

