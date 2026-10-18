import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  const parentTicket = {
    id: 1,
    name: 'Kannada Rajyotsava 2026 - Entry (10y+)',
    quantity: 1
  };
  const childTicket = {
    id: 2,
    name: 'Kannada Rajyotsava 2026 - Entry Ticket (0y-10y)',
    quantity: 1
  };

  beforeEach(() => {
    localStorage.removeItem('cartItems');
    service = new CartService();
  });

  it('does not add a child ticket unless its parent ticket is in the cart', () => {
    expect(service.addToCart(childTicket)).toBeFalse();
    expect(service.getCart()).toEqual([]);
  });

  it('allows a child ticket when its parent ticket is in the cart', () => {
    expect(service.addToCart(parentTicket)).toBeTrue();
    expect(service.addToCart(childTicket)).toBeTrue();
    expect(service.getCart().map(item => item.product.id)).toEqual([1, 2]);
  });

  it('removes dependent child tickets when the parent ticket is removed', () => {
    service.addToCart(parentTicket);
    service.addToCart(childTicket);

    expect(service.removeFromCart(parentTicket.id)).toBeTrue();
    expect(service.getCart()).toEqual([]);
  });

  it('removes invalid child tickets from a previously saved cart', () => {
    localStorage.setItem('cartItems', JSON.stringify([
      { product: childTicket, quantity: childTicket.quantity }
    ]));

    expect(service.getCart()).toEqual([]);
    expect(JSON.parse(localStorage.getItem('cartItems') || '[]')).toEqual([]);
  });
});
