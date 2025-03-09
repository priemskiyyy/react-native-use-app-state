import { isForegroundAppState } from './isForegroundAppState';

describe('isForegroundAppState', () => {
  it('should return true when app state is active', () => {
    expect(isForegroundAppState('active')).toBe(true);
  });

  it('should return false when app state is background', () => {
    expect(isForegroundAppState('background')).toBe(false);
  });

  it('should return false when app state is inactive', () => {
    expect(isForegroundAppState('inactive')).toBe(false);
  });

  it('should return false when app state is extension and handleExtensionState is false', () => {
    expect(isForegroundAppState('extension', false)).toBe(false);
  });

  it('should return true when app state is extension and handleExtensionState is true', () => {
    expect(isForegroundAppState('extension', true)).toBe(true);
  });

  it('should return false for an unknown app state', () => {
    expect(isForegroundAppState('unknown' as any)).toBe(false);
  });
});
