import { notFound } from "next/navigation";

export default function NotFoundCatchAll() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for does not exist. It might have been moved or
        deleted.
      </p>
    </div>
  );
}
