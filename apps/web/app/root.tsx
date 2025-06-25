import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type {Route} from "./+types/root";
import "./app.css";
import {sessionMiddleware} from "@/api/.server/session";
import {fetchAuthDataFromContext} from "@/api/.server/session.utils";
import {getToastDataFromContext} from "@/api/.server/toast.utils";
import {Navbar} from "@/api/components/navbar";
import {Toaster} from "@/api/components/toaster";

export const links: Route.LinksFunction = () => [
  {rel: "preconnect", href: "https://fonts.googleapis.com"},
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const unstable_middleware = [sessionMiddleware];

export async function loader({request, context}: Route.LoaderArgs) {
  // TODO maybe change logged in middleware for this ... hmmm...
  const validatedData = await fetchAuthDataFromContext(context);
  const toastData = getToastDataFromContext(context);

  return {
    toastData: toastData.toast,
    isAuthenticated: validatedData !== null,
    userData: validatedData,
  };
}

export type RootLoaderData = typeof loader;

export default function App({loaderData}: Route.ComponentProps) {
  return (
    <div className="h-screen flex flex-col overflow-y-scroll">
      <Navbar
        username={loaderData.userData?.username}
        isAuthenticated={loaderData.isAuthenticated}
      />
      <Toaster toast={loaderData.toastData} />
      <Outlet />;
    </div>
  );
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
