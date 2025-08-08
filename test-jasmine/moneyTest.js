import { calculatePriceCents } from "../scripts/utils/money.js";

 describe('Test Suite: Calculate Price Cents', () => {
  it('Convert to dollars', () => {
    expect(calculatePriceCents(2025)).toEqual('20.25')
  })
  it('works with 0', () => {
    expect(calculatePriceCents(0)).toEqual('0.00');
  })
  it('rounds up to the nearest cent', () => {
    expect(calculatePriceCents(2000.5)).toEqual('20.01');
  })
 })