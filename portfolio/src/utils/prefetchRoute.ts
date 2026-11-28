const routeImports: Record<string, () => Promise<unknown>> = {
  "/work": () => import("../pages/Work"),
  "/services": () => import("../pages/ServicesIndex"),
  "/services/ai": () => import("../pages/ServiceAI"),
  "/services/web": () => import("../pages/ServiceWeb"),
  "/services/infrastructure": () => import("../pages/ServiceInfrastructure"),
  "/about": () => import("../pages/About"),
  "/contact": () => import("../pages/Contact"),
  "/mentions-legales": () => import("../pages/LegalNotice"),
};

const pending = new Map<string, Promise<unknown>>();

export function prefetchRoute(path: string) {
  const load = routeImports[path];
  if (!load || pending.has(path)) return;
  const request = load().catch(() => {
    pending.delete(path);
  });
  pending.set(path, request);
}
