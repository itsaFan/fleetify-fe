import { QueryProviders } from "@/providers/query-providers";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
      <QueryProviders>
        {children}
      </QueryProviders>
  );
}

