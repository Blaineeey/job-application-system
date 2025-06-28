export default function UserLayout({ children }) {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>User Dashboard</h2>
      {children}
    </div>
  );
}