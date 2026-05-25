import { createBooking, type Booking } from '@demo/booking-domain';

export class CreateBookingUseCase {
  execute(): Booking {
    return createBooking({
      id: 'booking-1',
      customerId: 'customer-1',
      startsAt: new Date('2026-06-01T10:00:00.000Z'),
      endsAt: new Date('2026-06-01T12:00:00.000Z')
    });
  }
}
