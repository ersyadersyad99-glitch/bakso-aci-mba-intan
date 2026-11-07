import React, { useEffect } from 'react';
import { SiteConfig, normalizeCanonicalSiteUrl } from '../config/siteConfig';

interface SeoHeadProps {
  config: SiteConfig;
}

/**
 * Dynamically synchronizes SEO metadata, Open Graph, Twitter Card,
 * Google Search Console verification tag, Canonical URL, and strict zero-fabrication
 * JSON-LD (@graph: WebSite, Organization, Restaurant + LocalBusiness + Menu + MenuItem).
 * Keeps openingHoursSpecification out of structured data until operatingDays are confirmed.
 */
export const SeoHead: React.FC<SeoHeadProps> = ({ config }) => {
  const safeCanonical = normalizeCanonicalSiteUrl(config.seo.canonicalUrl);
  const baseDomain = safeCanonical.replace(/\/$/, '');

  // Build strict JSON-LD Schema (@graph) with verified business data only
  const buildStructuredDataGraph = () => {
    const sameAsLinks: string[] = [];
    if (config.socialMedia?.instagramUrl?.trim()) {
      sameAsLinks.push(config.socialMedia.instagramUrl.trim());
    }
    if (config.orderingPlatforms.gofoodUrl.trim()) {
      sameAsLinks.push(config.orderingPlatforms.gofoodUrl.trim());
    }
    if (config.orderingPlatforms.grabfoodUrl.trim()) {
      sameAsLinks.push(config.orderingPlatforms.grabfoodUrl.trim());
    }
    if (config.locationAndContact.googleMapsUrl.trim()) {
      sameAsLinks.push(config.locationAndContact.googleMapsUrl.trim());
    }
    const uniqueSameAs = Array.from(new Set(sameAsLinks));

    // Confirmed telephone
    const cleanPhone = config.orderingPlatforms.whatsappNumber.replace(/[^0-9]/g, '');
    let formattedPhone = '+62 812-9936-6705';
    if (cleanPhone && cleanPhone !== '6281299366705' && cleanPhone !== '081299366705') {
      formattedPhone = cleanPhone.startsWith('0')
        ? `+62${cleanPhone.slice(1)}`
        : cleanPhone.startsWith('62')
          ? `+${cleanPhone}`
          : `+62${cleanPhone}`;
    }

    const menuSections = config.categories
      .filter((c) => c.id !== 'all')
      .map((cat) => {
        const itemsInCat = config.products.filter((p) => p.categoryId === cat.id);
        return {
          '@type': 'MenuSection',
          name: cat.name,
          description: cat.shortDesc,
          hasMenuItem: itemsInCat.map((item) => {
            const menuItemObj: Record<string, unknown> = {
              '@type': 'MenuItem',
              name: item.name,
            };
            if (item.shortDescription) {
              menuItemObj.description = item.shortDescription;
            }
            if (item.imageWebp) {
              menuItemObj.image = item.imageWebp.startsWith('http')
                ? item.imageWebp
                : `${baseDomain}${item.imageWebp.startsWith('/') ? '' : '/'}${item.imageWebp}`;
            }
            if (item.price !== null && item.price > 0) {
              menuItemObj.offers = {
                '@type': 'Offer',
                price: item.price,
                priceCurrency: 'IDR',
                availability:
                  item.availability === 'sold_out'
                    ? 'https://schema.org/OutOfStock'
                    : 'https://schema.org/InStock',
              };
            }
            return menuItemObj;
          }),
        };
      })
      .filter((sec) => sec.hasMenuItem.length > 0);

    const restaurantNode: Record<string, unknown> = {
      '@type': ['Restaurant', 'FoodEstablishment', 'LocalBusiness'],
      '@id': `${safeCanonical}#restaurant`,
      name: config.locationAndContact.businessName,
      alternateName: 'Bakso Aci MBA INTAN Kebalen Babelan',
      slogan: config.brand.primaryTagline,
      description: config.seo.metaDescription,
      url: safeCanonical,
      telephone: formattedPhone,
      image: [
        `${baseDomain}/images/hero/hero-bakso-aci.webp`,
        config.seo.ogImageUrl || `${baseDomain}/images/hero-bakso-aci.jpg`,
      ],
      servesCuisine: [
        'Indonesian',
        'Bakso Aci',
        'Pempek',
        'Dimsum',
        'Dimsum Mentai',
        'Frozen Food',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.locationAndContact.streetAddress,
        addressLocality: `${config.locationAndContact.subdistrict}, ${config.locationAndContact.district}, ${config.locationAndContact.regency}`,
        addressRegion: config.locationAndContact.province,
        postalCode: config.locationAndContact.postalCode,
        addressCountry: 'ID',
      },
      areaServed: [
        {
          '@type': 'AdministrativeArea',
          name: 'Kebalen, Kec. Babelan, Kabupaten Bekasi',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Kabupaten Bekasi, Jawa Barat',
        },
      ],
      hasMap: config.locationAndContact.googleMapsUrl,
      parentOrganization: {
        '@id': `${safeCanonical}#organization`,
      },
      hasMenu: {
        '@type': 'Menu',
        '@id': `${safeCanonical}#menu`,
        name: 'Katalog Menu BAKSO ACI MBA INTAN',
        hasMenuSection: menuSections,
      },
    };

    // Only add GeoCoordinates if verified by owner
    if (
      config.seo.verifiedLatitude !== null &&
      config.seo.verifiedLongitude !== null &&
      !Number.isNaN(config.seo.verifiedLatitude) &&
      !Number.isNaN(config.seo.verifiedLongitude)
    ) {
      restaurantNode.geo = {
        '@type': 'GeoCoordinates',
        latitude: config.seo.verifiedLatitude,
        longitude: config.seo.verifiedLongitude,
      };
    }

    // Keep openingHoursSpecification / openingHours OUT of structured data until operatingDays are confirmed
    if (
      config.locationAndContact.operatingHours &&
      config.locationAndContact.operatingDays &&
      config.locationAndContact.operatingDays.trim() !== ''
    ) {
      restaurantNode.openingHours = `${config.locationAndContact.operatingDays.trim()} ${config.locationAndContact.operatingHours.trim()}`;
    }

    if (uniqueSameAs.length > 0) {
      restaurantNode.sameAs = uniqueSameAs;
    }

    const organizationNode: Record<string, unknown> = {
      '@type': 'Organization',
      '@id': `${safeCanonical}#organization`,
      name: config.locationAndContact.businessName,
      url: safeCanonical,
      telephone: formattedPhone,
      logo: `${baseDomain}/favicon.svg`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.locationAndContact.streetAddress,
        addressLocality: `${config.locationAndContact.subdistrict}, ${config.locationAndContact.district}, ${config.locationAndContact.regency}`,
        addressRegion: config.locationAndContact.province,
        postalCode: config.locationAndContact.postalCode,
        addressCountry: 'ID',
      },
      ...(uniqueSameAs.length > 0 ? { sameAs: uniqueSameAs } : {}),
    };

    const websiteNode: Record<string, unknown> = {
      '@type': 'WebSite',
      '@id': `${safeCanonical}#website`,
      url: safeCanonical,
      name: config.locationAndContact.businessName,
      description: config.seo.metaDescription,
      inLanguage: 'id-ID',
      publisher: {
        '@id': `${safeCanonical}#organization`,
      },
    };

    return {
      '@context': 'https://schema.org',
      '@graph': [websiteNode, organizationNode, restaurantNode],
    };
  };

  useEffect(() => {
    // 1. Page Title
    if (config.seo.metaTitle) {
      document.title = config.seo.metaTitle;
    }

    // 2. Meta Description & Social Metadata
    const setMetaContent = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el && content) {
        el.setAttribute('content', content);
      }
    };

    setMetaContent('meta[name="description"]', config.seo.metaDescription);
    setMetaContent('meta[property="og:title"]', config.seo.metaTitle);
    setMetaContent('meta[property="og:description"]', config.seo.metaDescription);
    setMetaContent('meta[property="og:url"]', safeCanonical);
    setMetaContent('meta[property="og:image"]', config.seo.ogImageUrl);
    setMetaContent('meta[name="twitter:title"]', config.seo.metaTitle);
    setMetaContent('meta[name="twitter:description"]', config.seo.metaDescription);
    setMetaContent('meta[name="twitter:image"]', config.seo.ogImageUrl);

    // 3. Canonical URL (never localhost)
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = safeCanonical;

    // 4. Google Search Console HTML Verification Meta Tag (when configured)
    const token = config.seo.gscVerificationToken.trim();
    let gscMeta = document.querySelector(
      'meta[name="google-site-verification"]'
    ) as HTMLMetaElement | null;
    if (token) {
      if (!gscMeta) {
        gscMeta = document.createElement('meta');
        gscMeta.name = 'google-site-verification';
        document.head.appendChild(gscMeta);
      }
      gscMeta.content = token;
    } else if (gscMeta) {
      gscMeta.remove();
    }

    // 5. Update single JSON-LD script in <head> so there are no duplicate JSON-LD blocks
    const existingScript = document.getElementById('structured-data-jsonld');
    const jsonString = JSON.stringify(buildStructuredDataGraph());
    if (existingScript) {
      existingScript.textContent = jsonString;
    }
  });

  return null;
};
