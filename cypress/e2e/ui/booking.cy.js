import BookingPage from '../../support/pages/BookingPage';
import { generateRandomDates } from '../../support/utils/dateUtils';

describe('Book Room', () => {
  
  let userData
  
  beforeEach(() => {
    cy.fixture('booking').then((data) => {
      userData = data
    })
    cy.visit('/')
  });

  it('should complete a room booking successfully', () => {
    const {checkIn, checkOut} = generateRandomDates()
    const {firstName, lastName, email, phone} = userData.user

    BookingPage.checkAvailability(checkIn, checkOut)
    BookingPage.selectRoom()
    BookingPage.initiateReservation()
    BookingPage.guestForm(firstName, lastName, email, phone)
    BookingPage.finishReservationButton()

    BookingPage.validateBooking()
      .should('contain', 'Confirmed')
  });

  it('should show error when required fields are missing', () => {
    const {checkIn, checkOut} = generateRandomDates()

    BookingPage.checkAvailability(checkIn, checkOut)
    BookingPage.selectRoom()
    BookingPage.initiateReservation()
    BookingPage.finishReservationButton()

    cy.getErrorMessage()
      .should('be.visible')
  });
  
  it('should show error when fields contain invalid formats', () => {
    const {checkIn, checkOut} = generateRandomDates()
    const {firstName, lastName, email, phone} = userData.invalidUser

    BookingPage.checkAvailability(checkIn, checkOut)
    BookingPage.selectRoom()
    BookingPage.initiateReservation()
    BookingPage.guestForm(firstName, lastName, email, phone)
    BookingPage.finishReservationButton()

    cy.getErrorMessage()
      .should('be.visible')    
  });
  
})