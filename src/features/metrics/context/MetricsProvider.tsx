import React, {createContext, useCallback, useContext, useState} from 'react';
import type {PerformanceMetrics} from '../types';

interface MetricsContextType {
  metrics: PerformanceMetrics[];
  setMetrics: React.Dispatch<React.SetStateAction<PerformanceMetrics[]>>;
  trackApiRequest:  <T>(fn: () => Promise<[T, number]>) => Promise<[T, number]>;
}

export const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

export const MetricsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);

  const trackApiRequest = useCallback(async <T, >(fn: () => Promise<[T, number]>): Promise<[T, number]> => {
    const start = performance.now();
    try {
      const [response, rawSize] = await fn();
      const clientReceiptTime = Date.now();

      setMetrics(prev => {
        const newMetric = {
          requestTime: performance.now() - start,
          payloadSize: rawSize,
          timestamp: clientReceiptTime,
        };
        const updated = [...prev, newMetric];
        return updated.length > 20 ? updated.slice(1) : updated;
      });

      return [response, rawSize];
    } catch (error) {
      // Track failed requests too
      setMetrics(prev => {
        const newMetric = {
          requestTime: performance.now() - start,
          payloadSize: 0,
          timestamp: Date.now(),
          error: true,
        };
        const updated = [...prev, newMetric];
        return updated.length > 20 ? updated.slice(1) : updated;
      });
      throw error;
    }
  }, []);

  return (
    <MetricsContext.Provider value={{metrics, trackApiRequest, setMetrics}}>
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => {
  const context = useContext(MetricsContext);
  if (!context) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  return context;
};
