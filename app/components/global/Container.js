export default function Container({ children, fullWidth = false }) {
  if (fullWidth) {
    return <div>{children}</div>
  }

  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col">
      {children}
    </div>
  )
}
