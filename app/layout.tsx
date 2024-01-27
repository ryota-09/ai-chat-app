import { ClientFormProvider } from "@/provider/FormProvider";
import "./globals.css";
import PromptInput from "@/components/PromptInput/PromptInput.presenter";
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
    <html lang="ja">
      <body>
        <ClientFormProvider>
          {children}
          <footer className="flex flex-col justify-end h-screen pb-10">
            <PromptInput />
          </footer>
        </ClientFormProvider>
      </body>
    </html>
  );
}
