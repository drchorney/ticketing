import { Message } from 'node-nats-streaming';
import { Subjects, Listener, PaymentCreatedEvent, OrderStatus } from '@chorney-tickets/common';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  // on the Message NATS thing we care most about the ask() method
  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const { id, orderId } = data;

    const order = await Order.findById(orderId);

    if (!order) {
    throw new Error('Order not found');
    }

    order.status = OrderStatus.Complete;
    await order.save();

    msg.ack();
  }
}
