'use client';

import { useState } from 'react';

type BillingCycle = 'monthly' | 'yearly';
type PlanColor = 'emerald' | 'violet' | 'amber';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  const plans: {
    name: string;
    price: number;
    period: string;
    desc: string;
    features: string[];
    btn: string;
    popular: boolean;
    color: PlanColor;
  }[] = [
    {
      name: 'Free',
      price: 0,
      period: '',
      desc: 'Get started',
      features: ['5 AI clips/month', 'Basic captions', 'Manual posting', 'Community support'],
      btn: 'Current Plan',
      popular: false,
      color: 'emerald',
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? 19 : 190,
      period: billingCycle === 'monthly' ? '/mo' : '/yr',
      desc: 'For serious creators',
      features: ['Unlimited clips', 'Auto-post to X', 'Desktop App', 'Priority support'],
      btn: 'Upgrade to Pro',
      popular: true,
      color: 'violet',
    },
    {
      name: 'Creator',
      price: billingCycle === 'monthly' ? 39 : 390,
      period: billingCycle === 'monthly' ? '/mo' : '/yr',
      desc: 'For power users',
      features: ['Everything in Pro', 'Bulk processing', 'Custom AI training', 'Dedicated support'],
      btn: 'Upgrade to Creator',
      popular: false,
      color: 'amber',
    },
  ];

  const colorStyles = {
    emerald: {
      border: 'border-emerald-500/60',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-300',
      check: 'text-emerald-400',
      button: 'bg-emerald-500 hover:bg-emerald-400 text-black',
    },
    violet: {
      border: 'border-violet-500/70',
      bg: 'bg-violet-500/10',
      text: 'text-violet-300',
      check: 'text-violet-400',
      button: 'bg-violet-500 hover:bg-violet-400 text-black',
    },
    amber: {
      border: 'border-amber-500/60',
      bg: 'bg-amber-500/10',
      text: 'text-amber-300',
      check: 'text-amber-400',
      button: 'bg-amber-500 hover:bg-amber-400 text-black',
    },
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold md:text-6xl">
            Simple, Powerful Pricing
          </h1>
          <p className="text-xl text-zinc-400 md:text-2xl">
            Choose the plan that fits your content creation needs
          </p>
        </div>

        <div className="mb-14 flex justify-center">
          <div className="inline-flex rounded-full bg-zinc-900 p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`rounded-full px-8 py-3 transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white font-semibold text-black'
                  : 'text-zinc-400'
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBillingCycle('yearly')}
              className={`rounded-full px-8 py-3 transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-white font-semibold text-black'
                  : 'text-zinc-400'
              }`}
            >
              Yearly <span className="text-emerald-400">(Save 20%)</span>
            </button>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const styles = colorStyles[plan.color];

            return (
              <div
                key={plan.name}
                className={`relative flex min-h-[520px] flex-col rounded-2xl border p-8 text-center shadow-xl shadow-black/30 ${styles.border} ${styles.bg} ${
                  plan.popular ? 'md:-translate-y-4' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-violet-500 px-5 py-1 text-sm font-bold text-white">
                    Most Popular
                  </div>
                )}

                <h3 className="mb-2 text-3xl font-bold text-white">
                  {plan.name}
                </h3>

                <p className="mb-6 text-zinc-400">{plan.desc}</p>

                <div className="mb-8">
                  <span className="text-6xl font-black text-white">
                    €{plan.price}
                  </span>
                  <span className="ml-2 text-zinc-400">{plan.period}</span>
                </div>

                <ul className="mb-10 flex-1 space-y-4 text-left">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className={`text-xl font-bold ${styles.check}`}>
                        ✓
                      </span>
                      <span className={styles.text}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-auto w-full rounded-xl py-4 text-lg font-bold transition ${styles.button}`}
                >
                  {plan.btn}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-16 text-center text-zinc-500">
          All plans include access to AI clip generation. Cancel anytime.
        </p>
      </div>
    </main>
  );
}