export function AdSlot() {
  if (process.env.NEXT_PUBLIC_ADS_ENABLED !== "true") return null;
  return <aside aria-label="Advertisement" className="ad-slot" />;
}
