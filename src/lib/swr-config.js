'use client';

import { SWRConfig } from 'swr';
import { getLang } from './i18n';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export const swrFetcher = async (url) => {
  const lang = getLang();
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      'Accept-Language': lang,
    },
  });
  if (!res.ok) {
    const error = new Error('Gagal memuat data');
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const defaultConfig = {
  fetcher: swrFetcher,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  dedupingInterval: 5000,
  errorRetryCount: 2,
  errorRetryInterval: 3000,
};

export function SWRProvider({ children }) {
  return (
    <SWRConfig value={defaultConfig}>
      {children}
    </SWRConfig>
  );
}
