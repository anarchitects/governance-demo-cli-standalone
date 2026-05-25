import { BookingController } from '@demo/booking-interface';

const controller = new BookingController();
const booking = controller.createBooking();

console.log('Booking API started.');
console.log(booking);
