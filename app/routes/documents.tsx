
import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { useLoaderData } from "react-router";
import { getSession } from "~/utils/session.server";
import { Layout } from "~/components/Layout";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  
  if (!session.has("userId")) {
    return redirect("/login");
  }
  
  const user = {
    id: session.get("userId"),
    name: session.get("userName"),
    email: session.get("userEmail"),
    role: session.get("userRole"),
  };
  
  return { user };
}

export default function Documents() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <Layout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage patient documents and files</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow">
          <p className="text-gray-500">Document management features coming soon...</p>
        </div>
      </div>
    </Layout>
  );
}
