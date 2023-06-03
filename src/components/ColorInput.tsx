export function ColorInput(
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) {
  return (
    <input
      type="color"
      className="w-32 py-0.5 px-0.5 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
      {...props}
    />
  )
}
