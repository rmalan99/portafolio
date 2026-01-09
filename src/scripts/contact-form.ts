import { z } from "zod";

const accessKey =
  (import.meta.env.PUBLIC_WEB3FORMS_KEY ??
    import.meta.env.PUBLIC_WEB3FORMS_KEY) as string | undefined;
const getFormElements = (form: HTMLFormElement) => {
  return {
    submitButton: form.querySelector<HTMLButtonElement>(
      'button[type="submit"]'
    ),
    statusDialog: form.querySelector<HTMLDialogElement>("[data-status-modal]"),
    statusMessage: form.querySelector<HTMLElement>("[data-status-message]"),
    statusCloseButton:
      form.querySelector<HTMLButtonElement>("[data-status-close]"),
    nameInput: form.querySelector<HTMLInputElement>('[name="name"]'),
    emailInput: form.querySelector<HTMLInputElement>('[name="email"]'),
    messageInput: form.querySelector<HTMLTextAreaElement>('[name="message"]'),
    botInput: form.querySelector<HTMLInputElement>('[name="company"]'),
    errorElements: {
      name: form.querySelector<HTMLElement>('[data-error-for="name"]'),
      email: form.querySelector<HTMLElement>('[data-error-for="email"]'),
      message: form.querySelector<HTMLElement>('[data-error-for="message"]'),
    },
  };
};

const getMessages = (form: HTMLFormElement) => {
  return {
    name: form.dataset.errorName ?? "Please enter a valid name.",
    email: form.dataset.errorEmail ?? "Please enter a valid email.",
    message: form.dataset.errorMessage ?? "Please enter a valid message.",
    invalid: form.dataset.statusInvalid ?? "Check the highlighted fields.",
    success: form.dataset.statusSuccess ?? "Message sent successfully.",
    error: form.dataset.statusError ?? "Something went wrong. Try again.",
  };
};

const buildSchema = (messages: ReturnType<typeof getMessages>) => {
  return z.object({
    name: z
      .string({ required_error: messages.name })
      .trim()
      .min(2, messages.name)
      .max(80, messages.name),
    email: z
      .string({ required_error: messages.email })
      .trim()
      .email(messages.email)
      .max(120, messages.email),
    message: z
      .string({ required_error: messages.message })
      .trim()
      .min(10, messages.message)
      .max(1000, messages.message),
  });
};

const setStatus = (
  statusDialog: HTMLDialogElement | null,
  statusMessage: HTMLElement | null,
  text: string | null,
  tone: "success" | "error" | null
) => {
  if (!statusDialog || !statusMessage) return;
  const toggleBodyLock = (lock: boolean) => {
    document.body.classList.toggle("dialog-open", lock);
  };
  statusMessage.textContent = text ?? "";
  statusMessage.classList.remove("text-green-600", "text-red-600");
  if (tone === "success") statusMessage.classList.add("text-green-600");
  if (tone === "error") statusMessage.classList.add("text-red-600");

  const shouldShow = Boolean(text) && (tone === "success" || tone === "error");
  if (!shouldShow) {
    if (statusDialog.open) statusDialog.close();
    toggleBodyLock(false);
    return;
  }
  toggleBodyLock(true);
  if (!statusDialog.open) statusDialog.showModal();
};

const setFieldError = (
  input: HTMLInputElement | HTMLTextAreaElement | null,
  errorEl: HTMLElement | null,
  message: string | null
) => {
  if (errorEl) errorEl.textContent = message ?? "";
  if (input) {
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }
};

const clearErrors = (elements: ReturnType<typeof getFormElements>) => {
  setFieldError(elements.nameInput, elements.errorElements.name, "");
  setFieldError(elements.emailInput, elements.errorElements.email, "");
  setFieldError(elements.messageInput, elements.errorElements.message, "");
};

const applyValidationErrors = (
  elements: ReturnType<typeof getFormElements>,
  messages: ReturnType<typeof getMessages>,
  result: ReturnType<ReturnType<typeof buildSchema>["safeParse"]>
) => {
  clearErrors(elements);

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path?.[0];
      if (!field) continue;
      const message =
        (messages as Record<string, string>)[field] ?? issue.message;
      if (field === "name") {
        setFieldError(elements.nameInput, elements.errorElements.name, message);
      }
      if (field === "email") {
        setFieldError(
          elements.emailInput,
          elements.errorElements.email,
          message
        );
      }
      if (field === "message") {
        setFieldError(
          elements.messageInput,
          elements.errorElements.message,
          message
        );
      }
    }
  }
};

const validateForm = (
  elements: ReturnType<typeof getFormElements>,
  schema: ReturnType<typeof buildSchema>,
  messages: ReturnType<typeof getMessages>
) => {
  const nameValue = elements.nameInput?.value ?? "";
  const emailValue = elements.emailInput?.value ?? "";
  const messageValue = elements.messageInput?.value ?? "";
  const botValue = elements.botInput?.value ?? "";

  if (botValue.trim().length > 0) {
    clearErrors(elements);
    return { valid: false, data: null };
  }

  const result = schema.safeParse({
    name: nameValue,
    email: emailValue,
    message: messageValue,
  });

  applyValidationErrors(elements, messages, result);

  return {
    valid: result.success,
    data: result.success ? result.data : null,
  };
};

const setSubmitting = (
  button: HTMLButtonElement | null,
  isSubmitting: boolean
) => {
  if (!button) return;
  if (isSubmitting) {
    button.dataset.originalText = button.textContent ?? "";
    button.textContent = "Sending...";
    button.disabled = true;
    return;
  }
  button.textContent = button.dataset.originalText ?? button.textContent ?? "";
  button.disabled = false;
};

const submitForm = async (payload: {
  name: string;
  email: string;
  message: string;
}) => {
  console.log("Submitting form with payload:", accessKey);
  if (!accessKey) {
    return { ok: false, message: "Missing Web3Forms access key." };
  }
  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("message", payload.message);

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => null);

  return { ok: response.ok, message: data?.message as string | undefined };
};

const initContactForm = () => {
  const form = document.getElementById(
    "contact-form"
  ) as HTMLFormElement | null;
  if (!form) return;

  const elements = getFormElements(form);
  const messages = getMessages(form);
  const schema = buildSchema(messages);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setStatus(elements.statusDialog, elements.statusMessage, "", null);

    const validation = validateForm(elements, schema, messages);
    if (!validation.valid || !validation.data) {
      setStatus(elements.statusDialog, elements.statusMessage, "", null);
      return;
    }

    try {
      setSubmitting(elements.submitButton, true);
      const result = await submitForm(validation.data);

      if (result.ok) {
        setStatus(
          elements.statusDialog,
          elements.statusMessage,
          messages.success,
          "success"
        );
        form.reset();
      } else {
        setStatus(
          elements.statusDialog,
          elements.statusMessage,
          result.message ?? messages.error,
          "error"
        );
      }
    } catch {
      setStatus(
        elements.statusDialog,
        elements.statusMessage,
        messages.error,
        "error"
      );
    } finally {
      setSubmitting(elements.submitButton, false);
    }
  };

  const handleInput = () => {
    validateForm(elements, schema, messages);
    setStatus(elements.statusDialog, elements.statusMessage, "", null);
  };

  form.addEventListener("submit", handleSubmit);
  form.addEventListener("input", handleInput);
  elements.statusCloseButton?.addEventListener("click", () => {
    setStatus(elements.statusDialog, elements.statusMessage, "", null);
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContactForm, {
    once: true,
  });
} else {
  initContactForm();
}
