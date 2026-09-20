"use client";

import { useEffect, useState } from "react";
import { nextVariant } from "@/lib/attempt-storage";

/**
 * Carries "which paper should I get" from the student's browser into the form.
 *
 * Empty on the server render and filled after mount, so the markup the server
 * sent and the first client render agree. A student with site data blocked, or
 * with JavaScript off, simply submits nothing and the server serves variant 0 —
 * a whole check, just not a guaranteed-different one.
 */
export function VariantField() {
  const [variant, setVariant] = useState<number | null>(null);

  useEffect(() => {
    setVariant(nextVariant());
  }, []);

  if (variant === null) return null;
  return <input type="hidden" name="variant" value={variant} />;
}
