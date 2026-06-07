'use client';

import { useState } from 'react';
import HomeButton from '@/components/HomeButton';

type BillingCycle = 'monthly' | 'yearly';
type Currency = 'GBP' | 'USD' | 'EUR';

type Price = {
  monthly: string;
  yearly: string;
};

type Plan = {
  name: string;
  subtitle: string;
  tag?: string;
  color: 'emerald' | 'violet' | 'amber';
  prices: Record<Currency, Price>;
  features: string[];
  button: string;
};

const currencyLabels: Record<Currency, string> = {
  GBP: 'GBP £',
  USD: 'USD $',
  EUR: 'EUR €',
};

const plans: Plan[] = [
  {
    name: 'Free',
    subtitle: 'Try ClipFlow-AI',
    color: 'emerald',
    prices: {
      GBP: { monthly: '£0', yearly: '£0' },
      USD: { monthly: '$0', yearly: '$0' },
      EUR: { monthly: '€0', yearly: '€0' },
    },
    features: [
      '5 VELA scans per month',
      'Basic VOD highlight suggestions',
      'Basic captions',
      'Manual exports',
      'Community support',
    ],
    button: 'Current Plan',
  },
  {
    name: 'Pro',
    subtitle: 'For regular creators',
    tag: 'Most Popular',
    color: 'violet',
    prices: {
      GBP: { monthly: '£24.99', yearly: '£249' },
      USD: { monthly: '$29.99', yearly: '$299' },
      EUR: { monthly: '€27.99', yearly: '€279' },
    },
    features: [
      '50 VELA scans per month',
      'Up to 30 VELA analysis hours/month',
      'Twitch VOD highlight suggestions',
      'Desktop app access',
      'Caption styling and exports',
      'Livestream Studio alpha access',
      'Extra VELA packs available later',
    ],
    button: 'Upgrade to Pro',
  },
  {
    name: 'Creator',
    subtitle: 'For high-volume streamers',
    color: 'amber',
    prices: {
      GBP: { monthly: '£59.99', yearly: '£599' },
      USD: { monthly: '$74.99', yearly: '$749' },
      EUR: { monthly: '€69.99', yearly: '€699' },
    },
    features: [
      '250 VELA scans per month',
      'Up to 150 VELA analysis hours/month',
      'Priority VELA processing',
      'Advanced RP-aware clip detection',
      'Desktop app and Livestream Studio',
      'Priority support',
      'Early access to new AI features',
    ],
    button: 'Upgrade to Creator',
  },
];

const colorClasses = {
  emerald: {
    article: 'border-emerald-400/70 bg-emerald-500/10 shadow-emerald-950/30',
    title: 'text-emerald-300',
    subtitle: 'text-emerald-100/80',
    list: 'text-emerald-50',
    button: 'bg-emerald-400 text-black hover:bg-emerald-300',
    tick: 'text-emerald-300',
  },
  violet: {
    article: 'border-violet-400 bg-violet-500/15 shadow-violet-900/40 md:-translate-y-3 border-2',
    title: 'text-violet-300',
    subtitle: 'text-violet-100/80',
    list: 'text-violet-50',
    button: 'bg-violet-500 text-white hover:bg-violet-400',
    tick: 'text-violet-300',
  },
  amber: {
    article: 'border-amber-400/70 bg-amber-500/10 shadow-amber-950/30',
    title: 'text-amber-300',
    subtitle: 'text-amber-100/80',
    list: 'text-amber-50',
    button: 'bg-amber-400 text-black hover:bg-amber-300',
    tick: 'text-amber-300',
  },
};

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [currency, setCurrency] = useState<Currency>('GBP');

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <HomeButton />
        </div>

        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-200">
            VELA usage-based plans
          </div>
          <h1 className="mb-4 text-4xl font-black tracking-tight md:text-6xl">
            Pricing built around real creator usage
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-zinc-400 md:text-xl">
            VELA analysis is limited by scan and analysis-hour allowance so long-stream creators can scale fairly while casual creators still get strong value.
          </p>
        </div>

        <div className="mb-12 flex flex-col items-center justify-center gap-4 lg:flex-row">
          <div className="flex rounded-full border border-white/10 bg-zinc-950 p-1 shadow-lg shadow-black/40">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`rounded-full px-6 py-3 text-sm font-bold transition md:px-8 ${
                billingCycle === 'monthly'
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`rounded-full px-6 py-3 text-sm font-bold transition md:px-8 ${
                billingCycle === 'yearly'
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Yearly <span className="text-emerald-400">Save around 17%</span>
            </button>
          </div>

          <div className="flex rounded-full border border-white/10 bg-zinc-950 p-1 shadow-lg shadow-black/40">
            {(Object.keys(currencyLabels) as Currency[]).map((currencyOption) => (
              <button
                key={currencyOption}
                type="button"
                onClick={() => setCurrency(currencyOption)}
                className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                  currency === currencyOption
                    ? 'bg-cyan-400 text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {currencyLabels[currencyOption]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const colors = colorClasses[plan.color];
            return (
              <article
                key={plan.name}
                className={`relative flex min-h-[520px] flex-col rounded-3xl border p-7 shadow-2xl ${colors.article}`}
              >
                {plan.tag ? (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-violet-500 px-5 py-1 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-violet-900/40">
                    {plan.tag}
                  </div>
                ) : null}

                <h2 className={`text-3xl font-black ${colors.title}`}>{plan.name}</h2>
                <p className={`mt-2 text-sm font-medium ${colors.subtitle}`}>{plan.subtitle}</p>

                <div className="mt-6">
                  <span className="text-5xl font-black">
                    {plan.prices[currency][billingCycle]}
                  </span>
                  {plan.name !== 'Free' ? (
                    <span className="ml-2 text-zinc-300">
                      {billingCycle === 'monthly' ? '/mo' : '/yr'}
                    </span>
                  ) : null}
                </div>

                <ul className={`mt-7 flex-1 space-y-3 text-sm ${colors.list}`}>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span className={`mr-2 ${colors.tick}`}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`mt-6 rounded-2xl px-5 py-3 font-black transition ${colors.button}`}>
                  {plan.button}
                </button>
              </article>
            );
          })}
        </div>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 text-zinc-300 shadow-xl shadow-black/20">
          <h2 className="mb-4 text-2xl font-black text-white">How VELA usage works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <strong className="text-white">VELA scans</strong>
              <p className="mt-2 leading-7">A scan is an AI highlight request where VELA reviews stream/VOD context and suggests clip moments.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <strong className="text-white">Analysis hours</strong>
              <p className="mt-2 leading-7">Longer VODs use more AI processing, so plans include a monthly analysis-hour allowance.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <strong className="text-white">Manual editing</strong>
              <p className="mt-2 leading-7">Local editing, caption styling, layout work, and rendering do not count against VELA AI usage.</p>
            </div>
          </div>
        </section>

        <p className="mt-10 text-center text-zinc-500">
          Prices may vary by region and payment provider. VELA usage limits apply to AI analysis, not manual editing or local rendering.
        </p>
      </section>
    </main>
  );
}
