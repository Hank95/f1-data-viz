import { useCallback } from 'react';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

interface EventParams {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: string | number | undefined;
}

export const useAnalytics = () => {
  const trackEvent = useCallback((
    action: string,
    params?: EventParams
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: params?.category || 'engagement',
        event_label: params?.label,
        value: params?.value,
        ...params,
      });
    }
  }, []);

  const trackPageView = useCallback((path: string, title?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-C5GGDSVDN5', {
        page_path: path,
        page_title: title,
      });
    }
  }, []);

  return {
    trackEvent,
    trackPageView,
  };
};