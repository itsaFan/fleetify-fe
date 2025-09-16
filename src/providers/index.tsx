import { Toaster } from "@/components/ui/sonner";
import { QueryProviders } from "@/providers/query-providers";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProviders>
      <Toaster />
      {children}
    </QueryProviders>
  );
}
