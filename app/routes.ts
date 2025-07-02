import {
  type RouteConfig,
  route,
  layout,
  index,
} from "@remix-run/route-config";

export default [
  index("home/route.tsx"),
  route("about", "about/route.tsx"),
  layout("concerts/layout.tsx", [
    route("trending", "concerts/trending.tsx"),
    route(":city", "concerts/city.tsx"),
  ]),
] satisfies RouteConfig;
