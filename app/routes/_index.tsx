
import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { useLoaderData } from "react-router";
import { getSession } from "~/utils/session.server";
import { Layout } from "~/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../src/components/ui/card";
import { Users, Calendar, FileText, MessageSquare } from "lucide-react";

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

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();

  const stats = [
    {
      title: "Total Patients",
      value: "1,234",
      description: "+20.1% from last month",
      icon: Users,
    },
    {
      title: "Appointments Today",
      value: "28",
      description: "6 remaining",
      icon: Calendar,
    },
    {
      title: "Documents",
      value: "892",
      description: "+12 new this week",
      icon: FileText,
    },
    {
      title: "Messages",
      value: "45",
      description: "3 unread",
      icon: MessageSquare,
    },
  ];

  return (
    <Layout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent patient interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New patient registered</p>
                    <p className="text-xs text-gray-500">John Doe - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Appointment completed</p>
                    <p className="text-xs text-gray-500">Jane Smith - 3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
