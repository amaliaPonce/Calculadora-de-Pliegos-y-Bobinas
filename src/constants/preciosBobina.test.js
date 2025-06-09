import { describe, it, expect } from 'vitest';
import preciosBobina from './preciosBobina';

describe('preciosBobina', () => {
  it('should contain a price for vinilo', () => {
    expect(preciosBobina.vinilo).toBeGreaterThan(0);
  });
});
