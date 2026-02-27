interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export const Button = ({ loading, children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
        loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
      } text-white`}
    >
      {loading ? 'Please wait...' : children}
    </button>
  )
}