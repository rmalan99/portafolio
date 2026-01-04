import type { APIRoute } from "astro";
import { contactRequestSchema } from "@utils/validation/contactSchema";

const recaptchaSecret = import.meta.env.RECAPTCHA_SECRET_KEY;
const recaptchaMinScore = Number(
  import.meta.env.RECAPTCHA_MIN_SCORE ?? "0.5",
);

const verifyRecaptcha = async (token: string): Promise<boolean> => {
  if (!recaptchaSecret) return false;

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

  if (!response.ok) return false;

  const data = (await response.json()) as {
    success: boolean;
    score?: number;
  };

  return Boolean(data.success && (data.score ?? 0) >= recaptchaMinScore);
};

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const getValue = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  const payload = {
    name: getValue("name"),
    email: getValue("email"),
    message: getValue("message"),
    botField: getValue("company"),
    token: getValue("token"),
  };

  if (payload.botField) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parsed = contactRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return new Response(JSON.stringify({ ok: false, error: "invalid" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const recaptchaOk = await verifyRecaptcha(parsed.data.token);
  if (!recaptchaOk) {
    return new Response(JSON.stringify({ ok: false, error: "recaptcha" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
