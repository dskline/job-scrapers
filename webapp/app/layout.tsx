import "@/app/global.css";

export const metadata = {
  title: "Job Dashboard",
}

const BaseLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      {/* radial bg gradient */}
      <div className="flex min-h-screen flex-col bg-cyan-950 text-cyan-50">
        <main className="grow">{children}</main>
      </div>
    </body>
  </html>
);

export default BaseLayout;
