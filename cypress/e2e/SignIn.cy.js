/// <reference types="cypress" />

describe("Login Page Tests", () => {
    const testData = {
      successfulSignIn: {
        email: "test_bindi@gmail.com",
        password: "TestBindi123"
      },
      missingEmailAddress: {
        email: "",
        password: "TestBindi123"
      },
      missingPassword: {
        email: "test_bindi@gmail.com",
        password: ""
      },
      invalidEmailFormat: {
        email: "test_bindigmail.com",
        password: "TestBindi123"
      },
      incorrectPassword: {
        email: "test_bindi@gmail.com",
        password: "abc"
      },
      invalidEmailAddress: {
        email: "testkarma2024@gmail.com",
        password: "TestBindi123"
      },
      emailCaseSensitivity: {
        email: "TEST_bindi@gmail.com",
        password: "TestBindi123"
      },
      passwordCaseSensitivity: {
        email: "test_bindi@gmail.com",
        password: "TESTBindi123"
      },
      accountLockout: {
        correctCredentials: {
          email: "test_bindi@gmail.com",
          password: "TestBindi123"
        },
        incorrectCredentials: {
          email: "test_bindi@gmail.com",
          password: "abc"
        }
      }
    };
  
    beforeEach(() => {
      cy.visit("https://next-realworld.vercel.app/user/login");
    });
  
    it("Successful sign-in", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.successfulSignIn.email);
      cy.get(":nth-child(2) > .form-control").type(testData.successfulSignIn.password);
      cy.get(".btn").click();
      cy.url().should("include", "/user");
    });
  
    it("Missing Email Address", () => {
      cy.get(":nth-child(2) > .form-control").type(testData.missingEmailAddress.password);
      cy.get(".btn").click();
      cy.get(".error-messages").should("contain", "email can't be blank");
    });
  
    it("Missing Password", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.missingPassword.email);
      cy.get(".btn").click();
      cy.get(".error-messages").should("contain", "password can't be blank");
    });
  
    it("Invalid Email Format", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.invalidEmailFormat.email);
      cy.get(":nth-child(2) > .form-control").type(testData.invalidEmailFormat.password);
      cy.get(".btn").click();
      cy.get(".error-messages").should("contain", "email is invalid");
    });
  
    it("Incorrect Password", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.incorrectPassword.email);
      cy.get(":nth-child(2) > .form-control").type(testData.incorrectPassword.password);
      cy.get(".btn").click();
      cy.get(".error-messages").should("contain", "password is invalid");
    });
  
    it("Invalid Email Address", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.invalidEmailAddress.email);
      cy.get(":nth-child(2) > .form-control").type(testData.invalidEmailAddress.password);
      cy.get(".btn").click();
      cy.get(".error-messages").should("contain", "email is invalid");
    });
  
    it("Email Case Sensitivity", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.emailCaseSensitivity.email);
      cy.get(":nth-child(2) > .form-control").type(testData.emailCaseSensitivity.password);
      cy.get(".btn").click();
      cy.url().should("include", "/user");
    });
  
    it("Password Case Sensitivity", () => {
      cy.get(":nth-child(1) > .form-control").type(testData.passwordCaseSensitivity.email);
      cy.get(":nth-child(2) > .form-control").type(testData.passwordCaseSensitivity.password);
      cy.get(".btn").click();
      cy.url().should("include", "/user");
    });
  
    it("Account Lockout After Multiple Failed Attempts", () => {
      for (let i = 0; i < 3; i++) {
        cy.get(":nth-child(1) > .form-control").type(testData.accountLockout.incorrectCredentials.email);
        cy.get(":nth-child(2) > .form-control").type(testData.accountLockout.incorrectCredentials.password);
        cy.get(".btn").click();
        cy.get(".error-messages").should("contain", "password is invalid");
      }
      cy.get(":nth-child(1) > .form-control").type(testData.accountLockout.correctCredentials.email);
      cy.get(":nth-child(2) > .form-control").type(testData.accountLockout.correctCredentials.password);
      cy.get(".btn").click();
      cy.url().should("include", "/user");
    });
  });
  