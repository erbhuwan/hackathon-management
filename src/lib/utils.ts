import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const titleCase = (str: string): string => {
  if (!str) return "";
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
};

export function formatDate(
  date: Date | string | number | undefined,
  showTime: boolean = false,
  opts: Intl.DateTimeFormatOptions = {}
) {
  if (!date) return "";

  try {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      month: opts.month ?? "long",
      day: opts.day ?? "numeric",
      year: opts.year ?? "numeric",
      ...opts,
    };

    if (showTime) {
      defaultOptions.hour = opts.hour ?? "2-digit";
      defaultOptions.minute = opts.minute ?? "2-digit";
      defaultOptions.hour12 = opts.hour12 ?? true;
    }

    return new Intl.DateTimeFormat("en-US", defaultOptions).format(
      new Date(date)
    );
  } catch {
    return "";
  }
}

export function toSentenceCase(str: string) {
  return str
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}

export const getInitials = (name: string) => {
  if (!name) return "UN";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function trimString(str: string, maxLength: number = 20): string {
  if (str.length <= maxLength) return str;
  if (maxLength <= 3) return ".".repeat(maxLength);
  return str.slice(0, maxLength - 3) + "...";
}

/**
 * @see https://github.com/radix-ui/primitives/blob/main/packages/core/primitive/src/primitive.tsx
 */
export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (
      checkForDefaultPrevented === false ||
      !(event as unknown as Event).defaultPrevented
    ) {
      return ourEventHandler?.(event);
    }
  };
}
