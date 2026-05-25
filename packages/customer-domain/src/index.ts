import type { EntityId } from '@demo/shared-kernel';

export interface Customer {
  readonly id: EntityId;
  readonly name: string;
}
