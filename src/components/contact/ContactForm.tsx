"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Copy, Info, MessageCircle } from "lucide-react";
import { adventures } from "@/data/adventures";
import { siteConfig, whatsappLink } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";

interface FormValues {
  adventure: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  groupSize: string;
  message: string;
  consent: boolean;
}
type Errors = Partial<Record<keyof FormValues, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: FormValues): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!emailRe.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.phone.trim() && !/^[+\d][\d\s()-]{6,}$/.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (v.groupSize.trim() && (!/^\d+$/.test(v.groupSize.trim()) || Number(v.groupSize) < 1 || Number(v.groupSize) > 500))
    e.groupSize = "Enter a group size between 1 and 500.";
  if (v.message.trim().length < 10) e.message = "Please write a short message (at least 10 characters).";
  if (!v.consent) e.consent = "Please confirm you agree to be contacted.";
  return e;
}

const field = "mt-1.5 min-h-12 w-full rounded-lg border bg-white px-3.5 text-base placeholder:text-grey focus:border-forest";

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-forest">
        {label} {optional && <span className="font-normal text-grey">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-700">
          <AlertCircle aria-hidden className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const params = useSearchParams();
  const requested = params.get("adventure") ?? "";
  const initialAdventure = adventures.some((a) => a.slug === requested) ? requested : "";

  const [values, setValues] = useState<FormValues>({
    adventure: initialAdventure,
    name: "",
    email: "",
    phone: "",
    date: "",
    groupSize: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState<"ok" | "fail" | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((s) => ({ ...s, [key]: value }));
    if (errors[key]) setErrors((s) => ({ ...s, [key]: undefined }));
  };

  const inputProps = (key: keyof FormValues) => ({
    id: key,
    "aria-invalid": errors[key] ? (true as const) : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    className: cn(field, errors[key] ? "border-red-600" : "border-forest/25"),
  });

  const adventureTitle = adventures.find((a) => a.slug === values.adventure)?.title ?? "General inquiry";
  const summary = [
    ...[
      `Inquiry: ${adventureTitle}`,
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.phone && `Phone: ${values.phone}`,
      values.date && `Preferred date: ${values.date}`,
      values.groupSize && `Group size: ${values.groupSize}`,
    ].filter(Boolean),
    "",
    values.message,
  ].join("\n");

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setSubmitted(false);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    // Frontend-only demo: nothing is sent anywhere.
    setSubmitted(true);
    requestAnimationFrame(() => summaryRef.current?.focus());
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
  };

  const errorList = Object.entries(errors).filter(([, m]) => m) as [keyof FormValues, string][];
  const wa = whatsappLink(summary);
  const email = siteConfig.contact.email;

  return (
    <div>
      {submitted && (
        <div ref={summaryRef} tabIndex={-1} role="status" className="rounded-[var(--radius-card)] border border-forest/20 bg-sage p-6 sm:p-8">
          <CheckCircle2 aria-hidden className="h-8 w-8 text-forest" />
          <h2 className="mt-3 text-2xl text-forest">Your inquiry is ready — but it has not been sent</h2>
          <p className="mt-3 text-muted">
            This website is a frontend-only demo with no backend connected, so <strong className="text-charcoal">no message was sent</strong> and
            nothing has been booked. Your details below were only checked in your browser.
          </p>
          <pre className="mt-5 overflow-x-auto whitespace-pre-wrap rounded-lg bg-white p-4 text-sm text-charcoal">{summary}</pre>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="secondary" onClick={copy}>
              <Copy aria-hidden className="h-4 w-4" /> Copy inquiry text
            </Button>
            {wa && (
              <ButtonLink href={wa} external variant="outline">
                <MessageCircle aria-hidden className="h-4 w-4" /> Send via WhatsApp
              </ButtonLink>
            )}
            {email && (
              <ButtonLink
                href={`mailto:${email}?subject=${encodeURIComponent(`Inquiry: ${adventureTitle}`)}&body=${encodeURIComponent(summary)}`}
                external
                variant="outline"
              >
                Open in email app
              </ButtonLink>
            )}
            <Button variant="outline" onClick={() => setSubmitted(false)}>Edit inquiry</Button>
          </div>
          {copied && (
            <p role="status" className="mt-3 text-sm font-medium text-forest">
              {copied === "ok" ? "Copied to clipboard." : "Couldn't copy automatically — please select and copy the text above."}
            </p>
          )}
          {!wa && !email && (
            <p className="mt-4 flex items-start gap-2 text-sm text-muted">
              <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
              Contact details haven&rsquo;t been configured yet (see <code>src/lib/config.ts</code>), so there is no direct link to send this.
            </p>
          )}
        </div>
      )}

      {!submitted && (
        <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Inquiry form" className="space-y-5">
          {errorList.length > 0 && (
            <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800">
              <p className="font-bold">Please fix the following before continuing:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {errorList.map(([k, m]) => (
                  <li key={k}><a href={`#${k}`} className="underline">{m}</a></li>
                ))}
              </ul>
            </div>
          )}

          <Field id="adventure" label="Adventure" optional>
            <select {...inputProps("adventure")} value={values.adventure} onChange={(e) => set("adventure", e.target.value)}>
              <option value="">General inquiry</option>
              {adventures.map((a) => (
                <option key={a.slug} value={a.slug}>{a.title}</option>
              ))}
            </select>
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Full name" error={errors.name}>
              <input {...inputProps("name")} type="text" autoComplete="name" required value={values.name} onChange={(e) => set("name", e.target.value)} />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input {...inputProps("email")} type="email" autoComplete="email" required value={values.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <Field id="phone" label="Phone" optional error={errors.phone}>
              <input {...inputProps("phone")} type="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} />
            </Field>
            <Field id="groupSize" label="Group size" optional error={errors.groupSize}>
              <input {...inputProps("groupSize")} type="text" inputMode="numeric" placeholder="e.g. 4" value={values.groupSize} onChange={(e) => set("groupSize", e.target.value)} />
            </Field>
          </div>

          <Field id="date" label="Preferred trip date" optional>
            <input {...inputProps("date")} type="date" value={values.date} onChange={(e) => set("date", e.target.value)} />
          </Field>

          <Field id="message" label="Message" error={errors.message}>
            <textarea
              {...inputProps("message")}
              rows={5}
              required
              placeholder="Tell us what you have in mind…"
              className={cn(field, "min-h-32 py-3", errors.message ? "border-red-600" : "border-forest/25")}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
            />
          </Field>

          <div>
            <div className="flex items-start gap-3">
              <input
                id="consent"
                type="checkbox"
                checked={values.consent}
                onChange={(e) => set("consent", e.target.checked)}
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                className="mt-1 h-5 w-5 shrink-0 accent-forest"
              />
              <label htmlFor="consent" className="text-sm text-muted">
                I agree to be contacted about this inquiry.
              </label>
            </div>
            {errors.consent && (
              <p id="consent-error" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-700">
                <AlertCircle aria-hidden className="h-4 w-4 shrink-0" />
                {errors.consent}
              </p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto">Prepare Inquiry</Button>
          <p className="flex items-start gap-2 text-xs text-grey">
            <Info aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Demo form: no backend is connected. Submitting only validates your details — nothing is sent.
          </p>
        </form>
      )}
    </div>
  );
}
