import type { APIRoute } from "astro";
import { contactRequestSchema } from "@utils/validation/contactSchema";

const recaptchaSecret = import.meta.env.RECAPTCHA_SECRET_KEY;
const recaptchaMinScore = Number(
  import.meta.env.RECAPTCHA_MIN_SCORE ?? "0.5",
);
const recaptchaExpectedAction = "contact_submit";
const recaptchaAllowedHostnames = (import.meta.env.RECAPTCHA_ALLOWED_HOSTNAMES ?? "")
  .split(",")
  .map((hostname) => hostname.trim())
  .filter(Boolean);

const verifyRecaptcha = async (
  token: string,
): Promise<{ ok: boolean }> => {
  if (!recaptchaSecret) return { ok: false };

  const params = new URLSearchParams({
    secret: recaptchaSecret,
    response: token,
  });

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    },
  );

  if (!response.ok) return { ok: false };

  const data = (await response.json()) as {
    success: boolean;
    score?: number;
    action?: string;
    hostname?: string;
  };

  const scoreOk = (data.score ?? 0) >= recaptchaMinScore;
  const actionOk = data.action === recaptchaExpectedAction;
  const hostnameOk =
    recaptchaAllowedHostnames.length === 0 ||
    recaptchaAllowedHostnames.includes(data.hostname ?? "");

  return { ok: Boolean(data.success && scoreOk && actionOk && hostnameOk) };
};

const getPayload = async (request: Request) => {
  const contentType = request.headers.get("content-type") ?? "";

  const asString = (value: unknown) =>
    typeof value === "string" ? value : "";

  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => null);
    return {
      name: asString(body?.name),
      email: asString(body?.email),
      message: asString(body?.message),
      botField: asString(body?.botField ?? body?.company),
      token: asString(body?.token),
    };
  }

  const formData = await request.formData();
  const getValue = (key: string) => asString(formData.get(key));

  return {
    name: getValue("name"),
    email: getValue("email"),
    message: getValue("message"),
    botField: getValue("company"),
    token: getValue("token"),
  };
};

const shouldReturnJson = (request: Request) => {
  const contentType = request.headers.get("content-type") ?? "";
  const acceptHeader = request.headers.get("accept") ?? "";
  return (
    contentType.includes("application/json") ||
    acceptHeader.includes("application/json")
  );
};

const buildRedirectUrl = (request: Request, status: "success" | "error") => {
  const requestUrl = new URL(request.url);
  const referer = request.headers.get("referer");

  if (referer) {
    try {
      const refererUrl = new URL(referer);
      if (refererUrl.origin === requestUrl.origin) {
        refererUrl.searchParams.set("contact", status);
        refererUrl.hash = "";
        return refererUrl.toString();
      }
    } catch (error) {
      // Ignore malformed referer and use fallback.
    }
  }

  const fallbackUrl = new URL("/", requestUrl.origin);
  fallbackUrl.searchParams.set("contact", status);
  return fallbackUrl.toString();
};

export const POST: APIRoute = async ({ request }) => {
  const returnJson = shouldReturnJson(request);
  const payload = await getPayload(request);

  if (payload.botField) {
    if (returnJson) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(null, {
      status: 303,
      headers: { Location: buildRedirectUrl(request, "success") },
    });
  }

  const parsed = contactRequestSchema.safeParse(payload);
  if (!parsed.success) {
    if (returnJson) {
      return new Response(JSON.stringify({ ok: false, error: "invalid" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(null, {
      status: 303,
      headers: { Location: buildRedirectUrl(request, "error") },
    });
  }

  const recaptchaResult = await verifyRecaptcha(parsed.data.token);
  if (!recaptchaResult.ok) {
    if (returnJson) {
      return new Response(JSON.stringify({ ok: false, error: "recaptcha" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(null, {
      status: 303,
      headers: { Location: buildRedirectUrl(request, "error") },
    });
  }

  if (returnJson) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(null, {
    status: 303,
    headers: { Location: buildRedirectUrl(request, "success") },
  });
};
