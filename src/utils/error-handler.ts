interface ErrorLog {
  message: string;
  stack?: string;
  timestamp: string;
  retryCount?: number;
}

export class ErrorHandler {
  private static maxRetries = 3;
  private static retryDelay = 1000;

  static async handleError(error: Error, operation: () => Promise<any>): Promise<any> {
    let retryCount = 0;
    
    const tryOperation = async (): Promise<any> => {
      try {
        return await operation();
      } catch (err) {
        if (retryCount < this.maxRetries) {
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * retryCount));
          return tryOperation();
        }
        throw err;
      }
    };

    return tryOperation();
  }

  static logError(error: Error): void {
    const errorLog: ErrorLog = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    };
    
    console.error('Error logged:', errorLog);
    // Add your error reporting service here
  }
}
