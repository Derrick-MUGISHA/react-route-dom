import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, shopReducer, findById, findBySlug, totals, cartDetails } from '../src/store/shop.js';

test('ID and slug resolve the same product and unknown values are missing', () => {
  assert.equal(findById('1'), findBySlug('smart-watch'));
  assert.equal(findById('999'), undefined);
  assert.equal(findBySlug('missing-product'), undefined);
});

test('adding merges quantities, respects stock, and never mutates previous state', () => {
  const once = shopReducer(initialState, { type: 'add', id: 1 });
  assert.deepEqual(initialState.cart, []);
  let state = once;
  for (let i = 0; i < 30; i++) state = shopReducer(state, { type: 'add', id: 1 });
  assert.equal(state.cart.length, 1);
  assert.equal(state.cart[0].quantity, findById(1).stock);
  assert.equal(once.cart[0].quantity, 1);
  assert.equal(shopReducer(state, { type: 'add', id: 999 }), state);
});

test('quantity is bounded by stock and zero removes the item', () => {
  const state = shopReducer(initialState, { type: 'add', id: 2 });
  const updated = shopReducer(state, { type: 'quantity', id: 2, quantity: '999' });
  assert.equal(updated.cart[0].quantity, findById(2).stock);
  assert.deepEqual(shopReducer(updated, { type: 'quantity', id: 2, quantity: 0 }).cart, []);
});

test('totals apply delivery only to nonempty orders below $200', () => {
  assert.deepEqual(totals([]), { subtotal: 0, shipping: 0, total: 0 });
  assert.deepEqual(totals([{ price: 80, quantity: 1 }]), { subtotal: 80, shipping: 10, total: 90 });
  assert.deepEqual(totals([{ price: 100, quantity: 2 }]), { subtotal: 200, shipping: 0, total: 200 });
  assert.deepEqual(cartDetails([{ id: 999, quantity: 1 }]), []);
  assert.equal(cartDetails([{ id: 1, quantity: 2.7 }])[0].quantity, 2);
  assert.equal(cartDetails([{ id: 1, quantity: 999 }])[0].quantity, findById(1).stock);
});

test('placing an order requires a demo user and items, snapshots totals, and clears cart', () => {
  const action = { type: 'order', id: 'test-order', createdAt: '2026-11-20T10:00:00.000Z', delivery: { city: 'Kigali' } };
  const cartState = shopReducer(initialState, { type: 'add', id: 1 });
  assert.equal(shopReducer(cartState, action), cartState);
  const signedIn = shopReducer(cartState, { type: 'login', user: { name: 'Shopper', email: 'shopper@example.com' } });
  const placed = shopReducer(signedIn, action);
  assert.deepEqual(placed.cart, []);
  assert.equal(placed.orders[0].total, 130);
  assert.equal(placed.orders[0].email, 'shopper@example.com');
  assert.equal(placed.orders[0].items[0].quantity, 1);
  assert.equal(shopReducer(placed, action), placed);
  const loggedOut = shopReducer(placed, { type: 'logout' });
  assert.equal(loggedOut.user, null);
  assert.equal(loggedOut.orders.length, 1);
});
