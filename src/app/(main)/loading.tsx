import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center py-10 gap-4">
      <Spinner />
      <h6 className="font-display">Loading...please wait</h6>
    </div>
  );
}
