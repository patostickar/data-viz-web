import React, {createContext, useCallback, useContext, useState} from 'react';
import type {PerformanceMetrics} from '../types';

interface MetricsContextType {
  metrics: PerformanceMetrics[];
  setMetrics: React.Dispatch<React.SetStateAction<PerformanceMetrics[]>>;
  trackApiRequest:  <T>(fn: () => Promise<[T, number]>) => Promise<T>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

export const MetricsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);

  const trackApiRequest = useCallback(async <T, >(fn: () => Promise<[T, number]>): Promise<T> => {
    const start = Date.now();
    try {
      const [response, rawSize] = await fn();
      const end = Date.now();

      setMetrics(prev => {
        const newMetric = {
          requestTime: end - start,
          payloadSize: rawSize,
          timestamp: end,
        };
        const updated = [...prev, newMetric];
        return updated.length > 6 ? updated.slice(1) : updated;
      });

      return response;
    } catch (error) {
      const end = Date.now();
      // Track failed requests too
      setMetrics(prev => {
        const newMetric = {
          requestTime: end - start,
          payloadSize: 0,
          timestamp: end,
        };
        const updated = [...prev, newMetric];
        return updated.length > 6 ? updated.slice(1) : updated;
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

// eslint-disable-next-line react-refresh/only-export-components
export const useMetrics = () => {
  const context = useContext(MetricsContext);
  if (!context) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  return context;
};
