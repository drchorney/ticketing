import { Subjects, Publisher, ExpirationCompleteEvent } from '@chorney-tickets/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
