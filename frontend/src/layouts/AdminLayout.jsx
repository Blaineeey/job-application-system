export default function AdminLayout({ children }) {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Admin Panel</h2>
      {children}
    </div>
  );
}