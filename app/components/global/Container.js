export default function Container({ children, fullWidth = false }) {
  if (fullWidth) {
    return <div>{children}</div>;
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      {children}
    </div>
  );
}
