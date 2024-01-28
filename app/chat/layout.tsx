import { ClientFormProvider } from "@/provider/FormProvider";
import PromptInput from "@/components/PromptInput/PromptInput";
import { AppStateProvider } from "@/provider/AppProvider";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientFormProvider>
      <AppStateProvider>
        {children}
        <footer className="flex flex-col justify-end h-screen pb-10">
          <PromptInput />
        </footer>
      </AppStateProvider>
    </ClientFormProvider>
  );
}
