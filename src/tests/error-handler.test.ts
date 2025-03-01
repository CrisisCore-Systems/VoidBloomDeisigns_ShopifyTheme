import { ErrorHandler } from '../utils/error-handler';

describe('ErrorHandler', () => {
  test('should retry failed operations', async () => {
    let attempts = 0;
    const operation = async () => {
      attempts++;
      if (attempts < 3) throw new Error('Test error');
      return 'success';
    };

    const result = await ErrorHandler.handleError(
      new Error('Initial error'),
      operation
    );

    expect(result).toBe('success');
    expect(attempts).toBe(3);
  });

  test('should throw after max retries', async () => {
    const operation = async () => {
      throw new Error('Persistent error');
    };

    await expect(
      ErrorHandler.handleError(new Error('Test error'), operation)
    ).rejects.toThrow('Persistent error');
  });
});
