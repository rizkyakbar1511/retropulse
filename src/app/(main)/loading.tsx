import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center py-10 gap-2">
      <Spinner />
      <h6>Loading...please wait</h6>
    </div>
  );
}
