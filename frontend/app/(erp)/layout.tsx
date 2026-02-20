// Minimal wrapper — auth protection is handled in the (protected) sub-layout
export default function ErpRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
