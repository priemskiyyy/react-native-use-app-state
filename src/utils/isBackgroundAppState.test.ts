import { isBackgroundAppState } from './isBackgroundAppState';

describe('isBackgroundAppState', () => {
  it('should return true for background state', () => {
    expect(isBackgroundAppState('background')).toBe(true);
  });

  it('should return true for inactive state', () => {
    expect(isBackgroundAppState('inactive')).toBe(true);
  });

  it('should return false for active state', () => {
    expect(isBackgroundAppState('active')).toBe(false);
  });

  it('should return false for extension state', () => {
    expect(isBackgroundAppState('extension' as any)).toBe(false);
  });

  it('should return false for an unknown state', () => {
    expect(isBackgroundAppState('unknown' as any)).toBe(false);
  });
});
