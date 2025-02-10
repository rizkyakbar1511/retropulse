import { XCircleIcon } from "@heroicons/react/24/outline";

export default function Alert({ message }: { message: string }) {
  return (
    <div className="bg-red-100 p-4 flex items-center gap-4 rounded-md relative">
      <XCircleIcon className="size-7 text-red-700" />
      <h6 className="text-red-700">{message}</h6>
    </div>
  );
}
