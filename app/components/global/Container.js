export default function Container({ children, fullWidth = false }) {
  if (fullWidth) {
    return <div>{children}</div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4">
      {children}
    </div>
  );
}
