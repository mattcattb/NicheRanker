import type {loader} from "@/root";
import {useRouteLoaderData} from "react-router";

export function useRootLoader() {
  const rootLoaderData = useRouteLoaderData<typeof loader>("root");
  if (!rootLoaderData) {
    throw new Error("No root loader data!!!");
  }
  return rootLoaderData;
}
