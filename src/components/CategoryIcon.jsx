import { Cpu, Gem, Shirt, Sparkles, Package } from "lucide-react";

const ICONS = { Cpu, Gem, Shirt, Sparkles, Package };

export default function CategoryIcon({ name, ...props }) {
  const Icon = ICONS[name] || Package;
  return <Icon {...props} />;
}
