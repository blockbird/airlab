document.querySelectorAll("[data-contact-form]").forEach((form) => {
  const wrapper = form.closest(".w-form");
  const success = wrapper ? wrapper.querySelector(".w-form-done") : null;
  const failure = wrapper ? wrapper.querySelector(".w-form-fail") : null;
  const submit = form.querySelector('input[type="submit"]');
  const defaultLabel = submit ? submit.value : "Submit";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!wrapper || !success || !failure || !submit) {
      return;
    }

    success.style.display = "none";
    failure.style.display = "none";
    submit.disabled = true;
    submit.value = submit.getAttribute("data-wait") || "Sending...";

    const formData = new FormData(form);
    formData.set("_subject", "AIRLAB website enquiry");
    formData.set("_template", "table");
    formData.set("_captcha", "false");
    formData.set("_replyto", String(formData.get("email") || ""));
    formData.append("page", window.location.href);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      form.style.display = "none";
      success.style.display = "block";
    } catch (error) {
      failure.style.display = "block";
    } finally {
      submit.disabled = false;
      submit.value = defaultLabel;
    }
  });
});
