import { computed, type MaybeRef, unref, watchEffect } from 'vue';
import { SITE_URL } from '@/config/platform';

export interface SeoOptions {
  title?: MaybeRef<string | undefined>;
  description?: MaybeRef<string | undefined>;
  path?: MaybeRef<string | undefined>;
  image?: MaybeRef<string | undefined>;
}

const updateMetaTag = (selector: string, attribute: 'content' | 'href', value: string): void => {
  if (typeof document === 'undefined') return;

  let element = document.querySelector(selector);
  if (!element) {
    if (selector.startsWith('meta[')) {
      element = document.createElement('meta');
      const attrMatch = selector.match(/meta\[(.*?)="(.*?)"\]/);
      if (attrMatch && attrMatch[1] && attrMatch[2]) {
        element.setAttribute(attrMatch[1], attrMatch[2]);
      }
      document.head.appendChild(element);
    } else if (selector.startsWith('link[')) {
      element = document.createElement('link');
      const attrMatch = selector.match(/link\[(.*?)="(.*?)"\]/);
      if (attrMatch && attrMatch[1] && attrMatch[2]) {
        element.setAttribute(attrMatch[1], attrMatch[2]);
      }
      document.head.appendChild(element);
    }
  }

  if (element) {
    element.setAttribute(attribute, value);
  }
};

export const useSeo = (options: SeoOptions) => {
  const baseTitle = 'Carbon Watchdog';
  const defaultDescription =
    'Carbon Watchdog — Satellite-grade carbon credit integrity, project surveillance, and corporate buyer risk assurance portal.';
  const defaultImage = `${SITE_URL}/og-image.svg`;

  const resolvedTitle = computed(() => {
    const raw = unref(options.title);
    if (!raw || raw.trim() === '') return `${baseTitle} | Satellite Carbon Assurance`;
    return `${baseTitle} | ${raw.trim()}`;
  });

  const resolvedDescription = computed(() => {
    const raw = unref(options.description);
    return raw && raw.trim() !== '' ? raw.trim() : defaultDescription;
  });

  const resolvedCanonicalUrl = computed(() => {
    const rawPath = unref(options.path) || '';
    const cleanPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
    return cleanPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${cleanPath}`;
  });

  const resolvedImage = computed(() => {
    const raw = unref(options.image);
    return raw && raw.trim() !== '' ? raw.trim() : defaultImage;
  });

  watchEffect(() => {
    if (typeof document === 'undefined') return;

    // Document Title
    document.title = resolvedTitle.value;

    // Primary Meta Description
    updateMetaTag('meta[name="description"]', 'content', resolvedDescription.value);

    // Open Graph Tags
    updateMetaTag('meta[property="og:title"]', 'content', resolvedTitle.value);
    updateMetaTag('meta[property="og:description"]', 'content', resolvedDescription.value);
    updateMetaTag('meta[property="og:url"]', 'content', resolvedCanonicalUrl.value);
    updateMetaTag('meta[property="og:image"]', 'content', resolvedImage.value);

    // Twitter Card Tags
    updateMetaTag('meta[name="twitter:title"]', 'content', resolvedTitle.value);
    updateMetaTag('meta[name="twitter:description"]', 'content', resolvedDescription.value);
    updateMetaTag('meta[name="twitter:url"]', 'content', resolvedCanonicalUrl.value);
    updateMetaTag('meta[name="twitter:image"]', 'content', resolvedImage.value);

    // Canonical Link
    updateMetaTag('link[rel="canonical"]', 'href', resolvedCanonicalUrl.value);
  });

  return {
    resolvedTitle,
    resolvedDescription,
    resolvedCanonicalUrl,
    resolvedImage,
  };
};
