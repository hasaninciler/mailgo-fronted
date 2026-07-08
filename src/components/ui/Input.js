export default function Input({ label, id, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-dark">
        {label}
      </label>
      <input
        id={id}
        className="rounded-lg border border-gray-200 px-4 py-2 text-dark outline-none focus:border-primary"
        {...props}
      />
    </div>
  );
}