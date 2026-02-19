const form = document.getElementById("cc-form");
const submitBtn = document.getElementById("submitBtn");

const cardNumberEl = document.getElementById("cardNumber");
const cardHolderEl = document.getElementById("cardHolder");
const expMonthEl = document.getElementById("expMonth");
const expYearEl = document.getElementById("expYear");
const cvcEl = document.getElementById("cvc");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalTitle = document.getElementById("modalTitle");
const modalClose = document.getElementById("modalClose");

function openModal(title, htmlMessage){
  modalTitle.textContent = title;
  modalBody.innerHTML = htmlMessage;
  modal.setAttribute("aria-hidden", "false");
  modalClose.focus();
}

function closeModal(){
  modal.setAttribute("aria-hidden", "true");
  submitBtn.focus();
}

modalClose.addEventListener("click", closeModal);
modal.querySelector(".modal__backdrop").addEventListener("click", (e) => {
  if (e.target?.dataset?.close) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (modal.getAttribute("aria-hidden") === "false" && e.key === "Escape") closeModal();
});

cardNumberEl.addEventListener("input", () => {
  const digits = cardNumberEl.value.replace(/\D/g, "").slice(0, 19);
  const groups = digits.match(/.{1,4}/g) || [];
  cardNumberEl.value = groups.join(" ");
});

function luhnCheck(digits){
  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--){
    let n = digits.charCodeAt(i) - 48;
    if (shouldDouble){
      n = n * 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function isValidCardNumber(raw){
  const input = raw.trim();

  if (!/^[0-9\s-]+$/.test(input)) {
    return { ok:false, reason:"Card number can only contain digits, spaces, or dashes." };
  }

  const digits = input.replace(/\D/g, "");

  if (!/^\d{13,19}$/.test(digits)) {
    return { ok:false, reason:"Card number must be 13–19 digits." };
  }

  if (/^(\d)\1+$/.test(digits)) {
    return { ok:false, reason:"Card number can't be all the same digit." };
  }

 
  if (!/^\d{15}$|^\d{16}$/.test(digits)) {
    return { ok:false, reason:"Card number should typically be 15 or 16 digits." };
  }

  return { ok:true, digits };
}

function isValidHolderName(name){
  const trimmed = name.trim();
  if (!/^[A-Za-z][A-Za-z .'-]{1,48}[A-Za-z]$/.test(trimmed)) {
    return { ok:false, reason:"Card holder name must be 2–50 characters and use letters/spaces only." };
  }
  if (!/\s/.test(trimmed)) {
    return { ok:false, reason:"Please enter a first and last name." };
  }
  return { ok:true };
}

function isValidExpiry(mmRaw, yyRaw){
  const mm = mmRaw.trim();
  const yy = yyRaw.trim();

  if (!/^(0[1-9]|1[0-2])$/.test(mm)) return { ok:false, reason:"Expiration month must be 01–12." };
  if (!/^\d{2}$/.test(yy)) return { ok:false, reason:"Expiration year must be two digits (YY)." };

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const yyNum = Number(yy);
  const year = 2000 + yyNum;

  if (year < currentYear - 1 || year > currentYear + 25) {
    return { ok:false, reason:"Expiration year looks invalid." };
  }

  const month = Number(mm);

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { ok:false, reason:"Card is expired." };
  }

  return { ok:true, month, year };
}

function isValidCVC(raw){
  const val = raw.trim();
  if (!/^\d{3,4}$/.test(val)) return { ok:false, reason:"CVC/CVV must be 3–4 digits." };
  return { ok:true };
}

function validateAll(){
  const errors = [];

  const cc = isValidCardNumber(cardNumberEl.value);
  if (!cc.ok) errors.push(`• <strong>Card Number:</strong> ${cc.reason}`);

  const holder = isValidHolderName(cardHolderEl.value);
  if (!holder.ok) errors.push(`• <strong>Card Holder:</strong> ${holder.reason}`);

  const exp = isValidExpiry(expMonthEl.value, expYearEl.value);
  if (!exp.ok) errors.push(`• <strong>Expiration:</strong> ${exp.reason}`);

  
  const cvc = isValidCVC(cvcEl.value);
  if (!cvc.ok) errors.push(`• <strong>CVC/CVV:</strong> ${cvc.reason}`);

  return { ok: errors.length === 0, errors };
}

function handleSubmit(){
  const result = validateAll();

  if (!result.ok){
    openModal("Invalid submission", `<p>Please fix the following:</p><div>${result.errors.join("<br>")}</div>`);
    return;
  }

  openModal("Success", "<p>Your credit card has been successfully inputted.</p>");
}

submitBtn.addEventListener("click", handleSubmit);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
});

expMonthEl.addEventListener("input", () => {
  expMonthEl.value = expMonthEl.value.replace(/\D/g, "").slice(0,2);
  if (expMonthEl.value.length === 2) expYearEl.focus();
});

expYearEl.addEventListener("input", () => {
  expYearEl.value = expYearEl.value.replace(/\D/g, "").slice(0,2);
});

cvcEl.addEventListener("input", () => {
  cvcEl.value = cvcEl.value.replace(/\D/g, "").slice(0,4);
});
