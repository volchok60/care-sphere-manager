
import { redirect } from "react-router";

export async function action() {
  // Redirect to login page since logout is handled on the client side with Supabase
  return redirect("/login");
}

export async function loader() {
  return redirect("/login");
}
