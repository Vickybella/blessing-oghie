"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, Clock3, Send } from "lucide-react";
import { contactInfo, PENDING } from "@/data/content";
import { cn, whatsappUrl } from "@/lib/utils";

const goals = ["Revenue", "Leads", "Acquisition", "Creative Performance", "Social", "Brand", "Something else"];
const needs = ["Creative Strategy", "Performance Marketing", "Digital Marketing", "Social Media", "Growth Strategy"];

const schema = z.object({
  goal: z.string().min(1, "Pick what you're trying to grow"),
  need: z.string().min(1, "Pick what you need"),
  name: z.string().min(1, "Your name"),
  email: z.string().email("A valid email"),
  message: z.string().min(1, "A line about the situation"),
});

type FormValues = z.infer<typeof schema>;

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.78-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.45-4.44 9.88-9.88 9.88M18.94 3.49A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 00-3.48-8.41" />
    </svg>
  );
}

export function Contact() {
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { goal: "", need: "", name: "", email: "", message: "" },
  });

  const goal = watch("goal");
  const need = watch("need");

  const onSubmit = async (data: FormValues) => {
    setSubmitState("sending");
    try {
      // FormSubmit.co: no account, no API key, nothing to configure.
      // Points straight at the destination inbox — FormSubmit emails one
      // confirmation link there the very first time, and every submission
      // after that just works.
      const res = await fetch(`https://formsubmit.co/ajax/${contactInfo.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          _subject: `${data.goal}, ${data.need}: from ${data.name}`,
          goal: data.goal,
          need: data.need,
          message: data.message,
          _template: "table",
        }),
      });
      setSubmitState(res.ok ? "sent" : "error");
    } catch {
      setSubmitState("error");
    }
  };

  const whatsappHref = contactInfo.phone ? whatsappUrl(contactInfo.phone) : undefined;

  return (
    <section id="contact" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Contact</p>
          <h2 className="mt-3 font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
            Let&apos;s talk about what&apos;s not working.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Tell me what&apos;s not converting. I&apos;ll tell you what I&apos;d do about it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="font-display text-xl text-foreground">Send a Message</h2>

            {submitState === "sent" ? (
              <div className="mt-6 rounded-xl border border-signal/40 bg-signal/10 p-10 text-center">
                <p className="font-display text-xl text-signal">Message sent.</p>
                <p className="mt-2 text-sm text-muted">
                  It&apos;s in my inbox already. I read everything myself, expect a reply soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    What are you trying to grow?
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {goals.map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setValue("goal", g, { shouldValidate: true })}
                        className={cn(
                          "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors",
                          goal === g
                            ? "border-signal bg-signal text-white"
                            : "border-border-strong text-muted hover:text-foreground",
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  {errors.goal && <p className="mt-2 text-xs text-danger">{errors.goal.message}</p>}
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    What do you need?
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {needs.map((n) => (
                      <button
                        type="button"
                        key={n}
                        onClick={() => setValue("need", n, { shouldValidate: true })}
                        className={cn(
                          "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors",
                          need === n
                            ? "border-signal bg-signal text-white"
                            : "border-border-strong text-muted hover:text-foreground",
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  {errors.need && <p className="mt-2 text-xs text-danger">{errors.need.message}</p>}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs text-muted">Your Name</label>
                    <input
                      {...register("name")}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-border-strong bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-2 focus:border-signal"
                    />
                    {errors.name && <p className="mt-2 text-xs text-danger">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-muted">Your Email</label>
                    <input
                      {...register("email")}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-border-strong bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-2 focus:border-signal"
                    />
                    {errors.email && <p className="mt-2 text-xs text-danger">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs text-muted">Message</label>
                  <textarea
                    {...register("message")}
                    placeholder="What's the situation?"
                    rows={5}
                    className="w-full rounded-xl border border-border-strong bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-2 focus:border-signal"
                  />
                  {errors.message && <p className="mt-2 text-xs text-danger">{errors.message.message}</p>}
                </div>

                {submitState === "error" && (
                  <p className="text-xs text-danger">
                    Something went wrong sending that. Try again, or email me directly.
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  type="submit"
                  disabled={submitState === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-signal px-8 py-4 font-mono text-xs font-semibold uppercase tracking-widest text-white disabled:opacity-60"
                >
                  {submitState === "sending" ? "Sending..." : "Send It"}
                  <Send className="h-3.5 w-3.5" />
                </motion.button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h3 className="font-display text-lg text-foreground">Contact Information</h3>
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-signal">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-2">Email</p>
                    {contactInfo.email ? (
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm text-foreground transition-colors hover:text-signal"
                      >
                        {contactInfo.email}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-2">{PENDING}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-signal">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-2">Phone</p>
                    {contactInfo.phone ? (
                      <a
                        href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                        className="text-sm text-foreground transition-colors hover:text-signal"
                      >
                        {contactInfo.phone}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-2">{PENDING}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h3 className="font-display text-lg text-foreground">Connect</h3>
              <div className="mt-5 flex gap-3">
                {contactInfo.linkedin && (
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-signal hover:text-signal"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                  </a>
                )}
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-signal hover:text-signal"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-signal">
                  <Clock3 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-2">Availability</p>
                  <p className="text-sm text-foreground">
                    {contactInfo.availability ?? PENDING}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
