describe('LoginPage', () => {
    beforeEach(() => {
      cy.visit('/login'); 
    });
  
    it('displays the login page correctly', () => {
      cy.get('.card-header').should('contain', 'Welcome to Snapspace');
      cy.get('.card-text').should('contain', 'Sign in to continue.');
      cy.get('.login-with-google-btn').should('be.visible');
    });
  
    it('triggers Google login when "Continue with Google" button is clicked', () => {
      
      cy.get('.login-with-google-btn').click();
      
     
      cy.window().then((win) => {
        const token = win.localStorage.getItem('token');
        if (token) {
          cy.log('Token stored in local storage:', token);
        } else {
          cy.log('Token not found; check Google login API setup.');
        }
      });
    });
  
    it('redirects to /home after successful login', () => {
      cy.get('.login-with-google-btn').click();
  
     
      cy.url().should('include', '/home');
    });
  
    it('logs an error if Google login fails', () => {
      cy.window().then((win) => {
       
        cy.spy(win.console, 'error').as('consoleError');
  
     
        cy.get('.login-with-google-btn').click();
        cy.get('@consoleError').should('be.calledWithMatch', /Login Failed/);
      });
    });
  });
  