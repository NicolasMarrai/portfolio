import { cva, type VariantProps } from "class-variance-authority";

/**
 * Estilo dos links com cara de botão (CTA do hero, "Ver site", "Baixar" etc.).
 * Uso: <a className={linkButton({ variant: "outline", size: "sm" })}>.
 */
export const linkButton = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
  {
    variants: {
      variant: {
        solid: "bg-cyan text-bg hover:bg-cyan/85",
        outline: "border border-line-strong text-fg hover:border-cyan hover:text-cyan",
        ghost: "font-normal text-fg-muted hover:text-cyan",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: { variant: "solid", size: "sm" },
  },
);

export type LinkButtonProps = VariantProps<typeof linkButton>;
