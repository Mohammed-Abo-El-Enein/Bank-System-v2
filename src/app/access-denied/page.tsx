export default function AccessDeniedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-dark-2 p-8 rounded-xl shadow-card text-center">
        <h1 className="text-2xl font-bold text-red mb-4">
          Access Denied
        </h1>
        <p className="text-dark-6">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
}