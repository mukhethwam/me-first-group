
import { useTheme } from "@/providers/ThemeProvider";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();
  
  // Use a safe approach to determine theme for Sonner
  let sonnerTheme: ToasterProps["theme"] = "light";
  
  try {
    if (theme === 'system' && typeof window !== 'undefined') {
      sonnerTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      sonnerTheme = theme as ToasterProps["theme"];
    }
  } catch (e) {
    console.error("Theme detection error:", e);
    // Fallback to light theme if there's an error
    sonnerTheme = "light";
  }

  return (
    <Sonner
      theme={sonnerTheme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
