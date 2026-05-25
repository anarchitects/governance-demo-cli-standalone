import type { Booking } from '@demo/booking-domain';

export class InMemoryBookingRepository {
  private readonly bookings = new Map<string, Booking>();

  save(booking: Booking): void {
    this.bookings.set(booking.id, booking);
  }

  findById(id: string): Booking | undefined {
    return this.bookings.get(id);
  }
}
