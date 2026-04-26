import crypto from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const API_VERSION = "v19.0";

export interface UserData {
  em?: string[]; // Emails
  ph?: string[]; // Phone numbers
  fn?: string[]; // First name
  ln?: string[]; // Last name
  ct?: string[]; // City
  st?: string[]; // State
  zp?: string[]; // Zip
  client_ip_address?: string;
  client_user_agent?: string;
  fbc?: string;
  fbp?: string;
}

export interface CustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  [key: string]: any;
}

// Helper to hash user data using SHA-256
export const hashData = (data: string): string => {
  if (!data) return "";
  return crypto.createHash("sha256").update(data.trim().toLowerCase()).digest("hex");
};

export const sendServerEvent = async (
  eventName: string,
  eventId: string,
  sourceUrl: string,
  userData: UserData,
  customData?: CustomData
) => {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn("[Meta CAPI] Missing Pixel ID or Access Token. Event skipped:", eventName);
    return;
  }

  // Hash fields that require hashing if they are provided unhashed
  const hashedUserData = { ...userData };
  
  if (hashedUserData.em) hashedUserData.em = hashedUserData.em.map(hashData);
  // Phone numbers should contain only digits and country code (e.g., 919876543210)
  if (hashedUserData.ph) hashedUserData.ph = hashedUserData.ph.map(p => hashData(p.replace(/\D/g, "")));
  if (hashedUserData.fn) hashedUserData.fn = hashedUserData.fn.map(hashData);
  if (hashedUserData.ln) hashedUserData.ln = hashedUserData.ln.map(hashData);
  if (hashedUserData.ct) hashedUserData.ct = hashedUserData.ct.map(hashData);
  if (hashedUserData.st) hashedUserData.st = hashedUserData.st.map(hashData);
  if (hashedUserData.zp) hashedUserData.zp = hashedUserData.zp.map(hashData);

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: sourceUrl,
        action_source: "website",
        user_data: hashedUserData,
        custom_data: customData || {},
      },
    ],
  };

  const testEventCode = process.env.META_TEST_EVENT_CODE;
  if (testEventCode) {
    (payload as any).test_event_code = testEventCode;
  }

  try {
    const response = await fetch(`https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error("[Meta CAPI Error]", result);
    } else {
      console.log(`[Meta CAPI Success] Event ${eventName} sent successfully.`, result);
    }
    
    return result;
  } catch (error) {
    console.error("[Meta CAPI Fetch Error]", error);
  }
};
