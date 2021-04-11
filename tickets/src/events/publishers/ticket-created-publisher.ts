import { Publisher, Subjects, TicketCreatedEvent } from '@chorney-tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
