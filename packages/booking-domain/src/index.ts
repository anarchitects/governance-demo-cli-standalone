import type { EntityId } from '@demo/shared-kernel';

export interface Booking {
  readonly id: EntityId;
  readonly customerId: EntityId;
  readonly startsAt: Date;
  readonly endsAt: Date;
}

export function createBooking(input: {
  id: EntityId;
  customerId: EntityId;
  startsAt: Date;
  endsAt: Date;
}): Booking {
  if (input.endsAt <= input.startsAt) {
    throw new Error('Booking end time must be after start time.');
  }

  return {
    id: input.id,
    customerId: input.customerId,
    startsAt: input.startsAt,
    endsAt: input.endsAt
  };
}
