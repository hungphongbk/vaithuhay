import { Event } from "@/components";

export const ensureResponsiveAvailable = new Promise(resolve => {
  Event.$once("ensureResponsiveAvailable", resolve);
});
ensureResponsiveAvailable.mark = () => Event.$emit("ensureResponsiveAvailable");
