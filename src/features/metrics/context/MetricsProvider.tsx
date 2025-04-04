import React, {createContext, useCallback, useContext, useState} from 'react';
import type {PerformanceMetrics} from '../types';

interface MetricsContextType {
  metrics: PerformanceMetrics[];
  setMetrics: React.Dispatch<React.SetStateAction<PerformanceMetrics[]>>;
  trackApiRequest: <T>(fn: () => Promise<T>) => Promise<T>;
}

export const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

export const MetricsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);

  const trackApiRequest = useCallback(async <T, >(fn: () => Promise<T>) => {
    const start = performance.now();
    try {
      const response = await fn();
      const clientReceiptTime = Date.now();
      const payloadSize = JSON.stringify(response).length;

      setMetrics(prev => {
        const newMetric = {
          requestTime: performance.now() - start,
          payloadSize,
          timestamp: clientReceiptTime,
        };
        const updated = [...prev, newMetric];
        return updated.length > 20 ? updated.slice(1) : updated;
      });

      return response;
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
