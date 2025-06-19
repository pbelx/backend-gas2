import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Order, OrderStatus } from '../entities/Order'; // Assuming Order entity and OrderStatus enum are in '../entities/Order'

const router = Router();
const orderRepository = getRepository(Order);

// PUT /api/orders/:id/cancel - Cancel an order
router.put('/:id/cancel', async (req, res) => {
  try {
    const order = await orderRepository.findOne({ where: { id: req.params.id } });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if order can be cancelled (e.g., only PENDING or CONFIRMED orders)
    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.CONFIRMED) {
      return res.status(400).json({ error: 'Order cannot be cancelled at this stage' });
    }

    order.status = OrderStatus.CANCELLED;
    // Optionally, restore stock quantities if applicable
    // This depends on your business logic, for example:
    // for (const item of order.items) {
    //   await gasCylinderRepository.increment({ id: item.gasCylinder.id }, 'stockQuantity', item.quantity);
    // }

    const updatedOrder = await orderRepository.save(order);

    // Re-fetch to include relations
    const completeOrder = await orderRepository.findOne({
        where: { id: updatedOrder.id },
        relations: ['customer', 'driver', 'items', 'items.gasCylinder']
    });

    res.json(completeOrder);
  } catch (error) {
    console.error('Error cancelling order:', error); // Log the actual error
    res.status(500).json({ error: 'Failed to cancel order' });
  }
});

export default router;
