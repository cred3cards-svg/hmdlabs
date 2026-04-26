"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

// Function to track standard events with deduplication ID
export const event = (name: string, options: Record<string, any> = {}, eventId?: string) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", name, options, eventId ? { eventID: eventId } : undefined);
  }
};

// Function to track custom events with deduplication ID
export const customEvent = (name: string, options: Record<string, any> = {}, eventId?: string) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", name, options, eventId ? { eventID: eventId } : undefined);
  }
};

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!FB_PIXEL_ID) return;
    
    // Fire pageview on route change (after initial load)
    if (isLoaded) {
      pageview();
    } else {
      setIsLoaded(true);
    }
  }, [pathname, searchParams, isLoaded]);

  if (!FB_PIXEL_ID) return null;

  return (
    <Script
      id="fb-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `,
      }}
    />
  );
}
