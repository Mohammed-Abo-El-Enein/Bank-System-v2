import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-dark dark:text-white">
          Sign in to continue
        </h2>
        <p className="mt-2 text-sm text-dark-5 dark:text-dark-6">
          Enter your email and password. Unused template actions were removed
          until they are actually implemented.
        </p>
      </div>

      <SigninWithPassword />
    </div>
  );
}