
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { data, redirect } from "react-router";
import { Form, useActionData, useNavigation } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { commitSession, getSession } from "~/utils/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  
  if (session.has("userId")) {
    return redirect("/");
  }
  
  return {};
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const intent = formData.get("intent");
  
  if (typeof email !== "string" || typeof password !== "string") {
    return data({ error: "Invalid form data" }, { status: 400 });
  }
  
  // Mock authentication logic
  const mockUsers = [
    { id: '1', name: 'Dr. Sarah Johnson', email: 'sarah@clinic.com', role: 'admin' },
    { id: '2', name: 'Dr. Michael Chen', email: 'michael@clinic.com', role: 'doctor' },
    { id: '3', name: 'Lisa Rodriguez', email: 'lisa@clinic.com', role: 'support' },
  ];
  
  if (intent === "login") {
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') {
      const session = await getSession(request.headers.get("Cookie"));
      session.set("userId", user.id);
      session.set("userName", user.name);
      session.set("userEmail", user.email);
      session.set("userRole", user.role);
      
      return redirect("/", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
    return data({ error: "Invalid credentials" }, { status: 400 });
  }
  
  return data({ error: "Invalid intent" }, { status: 400 });
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H+</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to HealthCRM</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="login">Sign In</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4">
              <Form method="post" className="space-y-4">
                <input type="hidden" name="intent" value="login" />
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {actionData?.error && (
                  <div className="text-red-600 text-sm">{actionData.error}</div>
                )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </Form>
              <div className="text-center text-sm text-slate-600">
                <p>Demo credentials:</p>
                <p>Email: sarah@clinic.com | Password: password</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
