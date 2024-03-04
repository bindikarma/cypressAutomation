/// <reference types="cypress" />

describe("Signup Page Tests", () => {
    const testData = {
      successfulSignUp: {
        username: "test_bindi",
        email: "test_bindi@gmail.com",
        password: "TestBindi123"
      },
      missingEmailAddress: {
        username: "test_bindi1",
        email: "",
        password: "TestBindi123"
      },
      missingUsername: {
        username: "",
        email: "test_bindi1@gmail.com",
        password: "TestBindi123"
      },
      missingPassword: {
        username: "test_bindi1",
        email: "test_bindi1@gmail.com",
        password: ""
      },
      invalidEmailFormat: {
        username: "test_bindi1",
        email: "test_bindigmail.com",
        password: "TestBindi123"
      },
      weakPassword: {
        username: "test_bindi1",
        email: "test_bindi1@gmail.com",
        password: "abc"
      },
      existingEmailAddress: {
        username: "test_bindi1",
        email: "test_bindi@gmail.com",
        password: "TestBindi123"
      },
      existingUsername: {
        username: "test_bindi",
        email: "test_bindi1@gmail.com",
        password: "TestBindi123"
      },
      caseSensitiveEmailAddress: {
        username: "test_bindi1",
        email: "TesTBiNdi1@gmail.com",
        password: "TestBindi123"
      }
    };
  
    beforeEach(() => {
      cy.visit("https://next-realworld.vercel.app/user/register");
    });
  
    it("Successful sign-up", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.successfulSignUp.username);
      cy.get(":nth-child(2) > .form-control").type(testData.successfulSignUp.email);
      cy.get(":nth-child(3) > .form-control").type(testData.successfulSignUp.password);
      cy.get(".btn").click();
      cy.url().should("include", "/user");
    });
  
    it("Missing Email Address", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.missingEmailAddress.username);
      cy.get(":nth-child(3) > .form-control").type(testData.missingEmailAddress.password);
      cy.get(".btn").click();
      cy.get(".error-messages").should("contain", "email can't be blank");
    });
  
    it("Missing Username", () => {
      cy.get(":nth-child(2) > .form-control").type(testData.missingUsername.email);
      cy.get(":nth-child(3) > .form-control").type(testData.missingUsername.password);
      cy.get(".btn").click();
      cy.get(".error-messages").should("contain", "username can't be blank");
    });
  
    it("Missing Password", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.missingPassword.username);
      cy.get(":nth-child(2) > .form-control").type(testData.missingPassword.email);
      cy.get(".btn").click();
      cy.get(".error-messages").should("contain", "password can't be blank");
    });
  
    it("Invalid Email Format", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.invalidEmailFormat.username);
      cy.get(":nth-child(2) > .form-control").type(testData.invalidEmailFormat.email);
      cy.get(":nth-child(3) > .form-control").type(testData.invalidEmailFormat.password);
      cy.get(".btn").click();
      cy.get(".error-messages").should("contain", "email is invalid");
    });
  
    it("Weak Password", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.weakPassword.username);
      cy.get(":nth-child(2) > .form-control").type(testData.weakPassword.email);
      cy.get(":nth-child(3) > .form-control").type(testData.weakPassword.password);
      cy.get(".btn").click();
      cy.get(".error-messages").should("contain", "password is too weak");
    });
  
    it("Existing Email Address", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.existingEmailAddress.username);
      cy.get(":nth-child(2) > .form-control").type(testData.existingEmailAddress.email);
      cy.get(":nth-child(3) > .form-control").type(testData.existingEmailAddress.password);
      cy.get(".btn").click();
      cy.get(".error-messages").should("contain", "email has already been taken");
    });
  
    it("Existing Username", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.existingUsername.username);
      cy.get(":nth-child(2) > .form-control").type(testData.existingUsername.email);
      cy.get(":nth-child(3) > .form-control").type(testData.existingUsername.password);
      cy.get(".btn").click();
      cy.get(".error-messages").should("contain", "username has already been taken");
    });
  
    it("Case Sensitivity for Email Address", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.caseSensitiveEmailAddress.username);
      cy.get(":nth-child(2) > .form-control").type(testData.caseSensitiveEmailAddress.email);
      cy.get(":nth-child(3) > .form-control").type(testData.caseSensitiveEmailAddress.password);
      cy.get(".btn").click();
      cy.url().should("include", "/user");
    });
  
    it("Cross-Browser Compatibility", () => {
      const browsers = ["chrome", "firefox"];
      browsers.forEach(browser => {
        cy.visit("https://next-realworld.vercel.app/user/register", { browser });
        cy.get(":nth-child(1) > .form-control").type("user1");
        cy.get(":nth-child(2) > .form-control").type("user1@example.com");
        cy.get(":nth-child(3) > .form-control").type("Test1234!");
        cy.get(".btn").click();
        cy.url().should("include", "/user");
      });
    });
  });
  
  my name is bhindi