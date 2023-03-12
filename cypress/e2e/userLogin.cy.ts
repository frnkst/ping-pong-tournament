describe("User login", () => {
  afterEach(() => {
    // cy.cleanupUser();
  });

  it("should not show an edit button if the user is not logged in", function() {
    cy.visitAndCheck("/");

    cy.findByRole('button', { name: "Edit" }).should("not.exist")
  });

  it("should show an edit button if the user is logged in", function() {
    cy.login();
    cy.visitAndCheck("/");

    cy.findAllByRole('button', { name: "Edit" }).should("exist")
  });
});
