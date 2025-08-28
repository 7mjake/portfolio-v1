export default function Container({ children, fullWidth = false }) {
  if (fullWidth) {
    return <div>{children}</div>;
  }
  
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto">
      {children}
    </div>
  );
}
