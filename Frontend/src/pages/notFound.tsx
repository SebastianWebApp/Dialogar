import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex h-auto min-h-screen w-full flex-col background-dark text-white">
      <main className="flex-grow flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 max-w-md w-full">
          <div
            className="w-full max-w-xs aspect-square bg-center bg-contain bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBCL5BNspx5KYE2MmFoo0F07DTOjjCPKHHzKiWgCYg3oxloa74jiee3adwsDDFR99tPZyvz10pFNdgb3uSBlvSSdBSPfB8sfPNldz5j1v56D5EF0TuCjfHrPc379ToBQ5AktsAx9eCbTwINS-22Z6tuQvaG4_5qfDxPw4K4Z0Y_om3P2SKYRKBt-G3pO5KXnSo_CKzrxZUovjct5McaNzE9ZZEW3jV6jfEQVvsnMQm3HqV9CBWkla424kHD_Q9_CAiT1B560SbNxVQ")',
            }}
          ></div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-background-dark dark:text-background-light sm:text-4xl">
              Page Not Found
            </h1>
            <p className="text-background-dark/70 dark:text-background-light/70">
              Oops! The page you're looking for doesn't seem to exist. It might
              have been moved or you might have mistyped the URL.
            </p>
          </div>
          <button
            className="text-black inline-flex items-center justify-center rounded-full bg-[#38e07b] px-6 py-3 text-sm font-bold text-background-dark shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark cursor-pointer"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}
export default NotFound;
