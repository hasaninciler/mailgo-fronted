export default function Button({ children, type = 'button', ...props }) {
  return (
    <button
      type={type}
      className="mt-2 w-full rounded-lg bg-primary py-2.5 font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
}