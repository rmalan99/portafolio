const form = document.querySelector<HTMLFormElement>("#contact-form");

if (form) {
  const statusModal = document.querySelector<HTMLDialogElement>("[data-status-modal]");
  const statusMessage = statusModal?.querySelector<HTMLElement>("[data-status-message]");
  const closeButton = statusModal?.querySelector<HTMLButtonElement>("[data-status-close]");
  const emailLink = document.querySelector<HTMLAnchorElement>('a[href^="mailto:"]');

  const fields = {
    name: form.querySelector<HTMLInputElement>('#contact-name'),
    email: form.querySelector<HTMLInputElement>('#contact-email'),
    message: form.querySelector<HTMLTextAreaElement>('#contact-message'),
  };

  const messages = {
    invalid: form.dataset.statusInvalid ?? 'Check the highlighted fields.',
    success: form.dataset.statusSuccess ?? 'Message sent successfully.',
    error: form.dataset.statusError ?? 'Message could not be sent. Try again.',
    name: form.dataset.errorName ?? 'Please enter a valid name.',
    email: form.dataset.errorEmail ?? 'Please enter a valid email.',
    message: form.dataset.errorMessage ?? 'Please write at least 10 characters.',
  };

  const setFieldError = (fieldName: keyof typeof fields, message: string) => {
    const field = fields[fieldName];
    const errorNode = form.querySelector<HTMLElement>(`[data-error-for="${fieldName}"]`);

    if (!field || !errorNode) return;

    field.setAttribute('aria-invalid', 'true');
    errorNode.textContent = message;
  };

  const clearFieldError = (fieldName: keyof typeof fields) => {
    const field = fields[fieldName];
    const errorNode = form.querySelector<HTMLElement>(`[data-error-for="${fieldName}"]`);

    if (!field || !errorNode) return;

    field.removeAttribute('aria-invalid');
    errorNode.textContent = '';
  };

  const openStatus = (message: string) => {
    if (!statusModal || !statusMessage) return;

    statusMessage.textContent = message;
    document.body.classList.add('dialog-open');

    if (!statusModal.open) {
      statusModal.showModal();
    }
  };

  const closeStatus = () => {
    if (!statusModal?.open) return;
    statusModal.close();
    document.body.classList.remove('dialog-open');
  };

  closeButton?.addEventListener('click', closeStatus);
  statusModal?.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
  });
  statusModal?.addEventListener('click', (event) => {
    if (event.target === statusModal) {
      closeStatus();
    }
  });

  Object.entries(fields).forEach(([fieldName, field]) => {
    field?.addEventListener('input', () => clearFieldError(fieldName as keyof typeof fields));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const honeypot = form.querySelector<HTMLInputElement>('input[name="company"]');
    if (honeypot?.value) return;

    const name = fields.name?.value.trim() ?? '';
    const email = fields.email?.value.trim() ?? '';
    const message = fields.message?.value.trim() ?? '';

    let isValid = true;

    if (name.length < 2) {
      setFieldError('name', messages.name);
      isValid = false;
    } else {
      clearFieldError('name');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setFieldError('email', messages.email);
      isValid = false;
    } else {
      clearFieldError('email');
    }

    if (message.length < 10) {
      setFieldError('message', messages.message);
      isValid = false;
    } else {
      clearFieldError('message');
    }

    if (!isValid) {
      openStatus(messages.invalid);
      return;
    }

    const emailHref = emailLink?.getAttribute('href');
    if (!emailHref) {
      openStatus(messages.error);
      return;
    }

    const [mailtoBase, queryString = ''] = emailHref.split('?');
    const params = new URLSearchParams(queryString);
    const existingSubject = params.get('subject') ?? '';
    const subject = existingSubject || 'Portfolio contact';
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message,
    ].join('\n');

    const nextParams = new URLSearchParams({
      subject,
      body,
    });

    window.location.href = `${mailtoBase}?${nextParams.toString()}`;
    openStatus(messages.success);
    form.reset();
  });
}
