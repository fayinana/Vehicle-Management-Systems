export default function Spinner() {
  return (
    <div className="flex justify-center h-screen w-full items-center">
      <div
        data-test-id="spinner"
        className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
      ></div>
    </div>
  );
}
