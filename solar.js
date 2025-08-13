import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Leaf, Bolt, Factory, ShieldCheck, Wind, Sun, Waves, Flame, BatteryCharging } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ---------------------------------------------
// Data
// ---------------------------------------------
const nonRenewables = [
  {
    name: "Coal-fired Power",
    icon: <Factory className="w-6 h-6" aria-hidden />,
    whyCommon: "Large existing plants supply many cities.",
    issues: ["High CO₂", "Air pollution", "Slow to restart"],
    examples: ["NTPC Dadri → Delhi NCR (India)", "Kendal → Johannesburg (South Africa)", "Yuhuan → urban Zhejiang (China)", "Sual → Metro Manila (Philippines)"]
  },
  {
    name: "Oil/Diesel Generators (Backup)",
    icon: <Bolt className="w-6 h-6" aria-hidden />,
    whyCommon: "Used during outages for shops, schools, homes.",
    issues: ["Expensive fuel", "Noise", "Local air pollution"],
    examples: ["Karachi (Pakistan)", "Lagos (Nigeria)", "Manila (Philippines)", "Dhaka (Bangladesh)", "Jakarta (Indonesia)"]
  },
  {
    name: "Oil-based Grid Plants",
    icon: <Flame className="w-6 h-6" aria-hidden />,
    whyCommon: "Cities with limited gas/coal rely on heavy fuel oil/diesel plants.",
    issues: ["High cost/kWh", "CO₂ & SOx/NOx", "Price volatility"],
    examples: ["Port Louis (Mauritius)", "Suva (Fiji)", "Honiara (Solomon Islands)", "Malé (Maldives)", "Jazan/Hail (Saudi Arabia)"]
  },
  {
    name: "Natural Gas Plants",
    icon: <BatteryCharging className="w-6 h-6" aria-hidden />,
    whyCommon: "Often used for baseload/peaking.",
    issues: ["Still fossil fuel", "Methane leakage", "Fuel price swings"],
    examples: ["Common in many urban grids worldwide"]
  }
];

const solutions = [
  {
    name: "Rooftop & Community Solar",
    icon: <Sun className="w-6 h-6" aria-hidden />,
    bullets: ["Cuts daytime outages", "Scales from homes to schools", "Pair with batteries for evenings"],
  },
  {
    name: "Wind (Onshore/Small Urban)",
    icon: <Wind className="w-6 h-6" aria-hidden />,
    bullets: ["Cheaper generation in windy regions", "Complements solar at night"],
  },
  {
    name: "Battery Storage & Hybrids",
    icon: <ShieldCheck className="w-6 h-6" aria-hidden />,
    bullets: ["Instant backup, no fumes", "Microgrids for schools & clinics", "Smart switching to reduce diesel use"],
  },
  {
    name: "Demand Response & Smart Meters",
    icon: <Leaf className="w-6 h-6" aria-hidden />,
    bullets: ["Shifts non‑critical loads", "Prevents grid stress", "Rewards users for saving power"],
  },
  {
    name: "Waste-to-Energy / Biogas (Local)",
    icon: <Waves className="w-6 h-6" aria-hidden />,
    bullets: ["Use city organic waste", "Clean cooking + electricity", "Reduces landfill methane"],
  }
];

const impacts = [
  { title: "Economic Loss", detail: "Shops and SMEs lose revenue during outages." },
  { title: "Interrupted Learning", detail: "Schools cannot run labs, lights, or computers." },
  { title: "Health & Air Quality", detail: "Diesel fumes worsen asthma and urban smog." },
  { title: "Carbon Emissions", detail: "Coal and oil raise CO₂, driving climate change." },
];

// ---------------------------------------------
// Small Components
// ---------------------------------------------
const Section = ({ id, title, children, blurb }) => (
  <section id={id} className="py-14" aria-labelledby={`${id}-title`}>
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <h2 id={`${id}-title`} className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
        {blurb && <p className="mt-2 text-muted-foreground max-w-3xl">{blurb}</p>}
      </div>
      {children}
    </div>
  </section>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm mr-2 mb-2">{children}</span>
);

// ---------------------------------------------
// Main App
// ---------------------------------------------
export default function App() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return nonRenewables;
    const q = query.toLowerCase();
    return nonRenewables
      .map((n) => ({
        ...n,
        examples: n.examples.filter((e) => e.toLowerCase().includes(q)),
      }))
      .filter((n) => n.name.toLowerCase().includes(q) || n.whyCommon.toLowerCase().includes(q) || n.issues.some(i => i.toLowerCase().includes(q)) || n.examples.length);
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bolt className="w-6 h-6" aria-hidden />
            <span className="font-semibold">Reliable Power Alternatives</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#problem" className="hover:underline">Problem</a>
            <a href="#nonrenewables" className="hover:underline">Non‑Renewables</a>
            <a href="#cities" className="hover:underline">City Examples</a>
            <a href="#impacts" className="hover:underline">Impacts</a>
            <a href="#solutions" className="hover:underline">Solutions</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight"
            >
              Keep Cities Powered — Cleanly and Affordably
            </motion.h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Urban areas in developing countries face frequent power cuts due to heavy dependence on fossil fuels and inefficient grids. This site explains the problem and showcases cleaner, scalable alternatives.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#solutions">
                <Button className="rounded-2xl px-6">Explore Solutions</Button>
              </a>
              <a href="#nonrenewables">
                <Button variant="secondary" className="rounded-2xl px-6">See Current Dependencies</Button>
              </a>
            </div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="md:justify-self-end">
            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="w-5 h-5" aria-hidden />
                  <span className="text-sm">Quick Filter</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search examples, e.g., Lagos, coal, diesel…"
                    className="w-full rounded-xl border px-4 py-2 pr-10"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search examples"
                  />
                  <Search className="w-5 h-5 absolute right-3 top-2.5 pointer-events-none" aria-hidden />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Tip: Try typing a city name or energy type.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <Section
        id="problem"
        title="The Problem in Simple Words"
        blurb="Power cuts happen often because cities rely on coal and oil, and grids aren’t managed efficiently. Backups like diesel generators are costly and polluting."
      >
        <div className="grid md:grid-cols-2 gap-6">
          {impacts.map((item) => (
            <Card key={item.title} className="rounded-2xl">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-muted-foreground mt-1">{item.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Non-Renewables */}
      <Section
        id="nonrenewables"
        title="Current Non‑Renewable Dependencies"
        blurb="These are the common fossil‑fuel options many cities use today — and why they cause issues. Use the search above to filter by city or keyword."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((n) => (
            <Card key={n.name} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  {n.icon}
                  <h3 className="font-semibold text-lg">{n.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{n.whyCommon}</p>
                <div className="mt-3 flex flex-wrap">
                  {n.issues.map((i) => (
                    <Pill key={i}>{i}</Pill>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">Where you’ll often see this:</p>
                  <ul className="list-disc pl-5 mt-1 text-sm text-muted-foreground space-y-1">
                    {n.examples.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* City Examples */}
      <Section
        id="cities"
        title="City Examples"
        blurb="A quick look at coal plants powering cities and oil-based power usage in urban areas."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg flex items-center gap-2"><Factory className="w-5 h-5" aria-hidden /> Coal Plants → Cities</h3>
              <ul className="mt-3 text-sm list-disc pl-5 text-muted-foreground space-y-1">
                <li>NTPC Dadri → Delhi NCR (India)</li>
                <li>Kendal → Johannesburg (South Africa)</li>
                <li>Huaneng Yuhuan → Zhejiang urban areas (China)</li>
                <li>Sual → Metro Manila (Philippines)</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg flex items-center gap-2"><Flame className="w-5 h-5" aria-hidden /> Oil-Based Electricity in Cities</h3>
              <ul className="mt-3 text-sm list-disc pl-5 text-muted-foreground space-y-1">
                <li>Port Louis (Mauritius) — heavy fuel oil plants</li>
                <li>Suva (Fiji) — diesel/oil backup to hydro</li>
                <li>Honiara (Solomon Islands) — diesel grid power</li>
                <li>Malé (Maldives) — oil‑fueled city grid</li>
                <li>Jazan & Hail (Saudi Arabia) — HFO generation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Solutions */}
      <Section
        id="solutions"
        title="Cleaner, Affordable Alternatives"
        blurb="These options can cut outages, reduce costs over time, and clean the air — especially when combined into microgrids for schools, clinics, and small businesses."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s) => (
            <Card key={s.name} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  {s.icon}
                  <h3 className="font-semibold text-lg">{s.name}</h3>
                </div>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Card className="rounded-2xl border-dashed">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg">Starter Blueprint for a School or Small Business</h3>
              <ol className="mt-2 list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                <li>Size critical loads (lights, fans, computers, internet, lab gear).</li>
                <li>Install rooftop solar sized for daytime needs + 20% headroom.</li>
                <li>Add a lithium battery bank for 4–6 hours of backup at night.</li>
                <li>Use a smart controller to switch automatically during outages.</li>
                <li>Keep a small, rarely used diesel genset only as a last resort.</li>
              </ol>
              <p className="mt-3 text-sm">Result: Fewer outages, lower fuel bills, and cleaner air.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t py-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6 items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Reliable Power Alternatives. Built for explaining the problem and showcasing solutions in simple words.</p>
          <div className="md:justify-self-end flex gap-3">
            <a href="#problem"><Button variant="secondary" className="rounded-2xl">Review Problem</Button></a>
            <a href="#solutions"><Button className="rounded-2xl">See Solutions</Button></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
