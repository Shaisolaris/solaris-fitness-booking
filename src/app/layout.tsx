import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solaris Fit — Class Booking",
  description:
    "Book yoga, HIIT, spin, and more. Weekly schedule, instructor profiles, member dashboard.",
  openGraph: {
    title: "Solaris Fit — Class Booking",
    description: "Modern fitness class booking for studios.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 font-sans text-slate-900 antialiased transition-colors dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
