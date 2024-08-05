import { Spinner } from "@material-tailwind/react";

export function DefaultLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  );
}