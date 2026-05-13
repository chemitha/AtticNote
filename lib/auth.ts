export async function getUser() {
  // In a real app, this would check cookies/sessions
  // For now, let's return a dummy user or logic as expected by the prisma schema
  return {
    id: "1",
    name: "Demo User",
    email: "demo@example.com"
  };
}
