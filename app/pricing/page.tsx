'use client';

import { useState } from 'react';
import HomeButton from '@/components/HomeButton';

type BillingCycle = 'monthly' | 'yearly';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <HomeButton />
        </div>
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-black tracking-tight md:text-6xl">
            Simple, Powerful Pricing
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400 md:text-xl">
            Choose the plan that fits your content creation needs
          </p>
        </div>

        <div className="mb-12 flex justify-center">
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
              Yearly <span className="text-emerald-400">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="flex aspect-square min-h-[360px] flex-col rounded-3xl border border-emerald-400/70 bg-emerald-500/10 p-7 shadow-2xl shadow-emerald-950/30">
            <h2 className="text-3xl font-black text-emerald-300">Free</h2>
            <p className="mt-2 text-sm font-medium text-emerald-100/80">Get started</p>

            <div className="mt-6">
              <span className="text-5xl font-black">€0</span>
            </div>

            <ul className="mt-7 flex-1 space-y-3 text-sm text-emerald-50">
              <li>✓ 5 AI clips/month</li>
              <li>✓ Basic captions</li>
              <li>✓ Manual posting</li>
              <li>✓ Community support</li>
            </ul>

            <button className="mt-6 rounded-2xl bg-emerald-400 px-5 py-3 font-black text-black transition hover:bg-emerald-300">
              Current Plan
            </button>
          </article>

          <article className="relative flex aspect-square min-h-[360px] flex-col rounded-3xl border-2 border-violet-400 bg-violet-500/15 p-7 shadow-2xl shadow-violet-900/40 md:-translate-y-3">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-violet-500 px-5 py-1 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-violet-900/40">
              Most Popular
            </div>

            <h2 className="text-3xl font-black text-violet-300">Pro</h2>
            <p className="mt-2 text-sm font-medium text-violet-100/80">For serious creators</p>

            <div className="mt-6">
              <span className="text-5xl font-black">
                €{billingCycle === 'monthly' ? 19 : 190}
              </span>
              <span className="ml-2 text-zinc-300">
                {billingCycle === 'monthly' ? '/mo' : '/yr'}
              </span>
            </div>

            <ul className="mt-7 flex-1 space-y-3 text-sm text-violet-50">
              <li>✓ Unlimited clips</li>
              <li>✓ Auto-post to X</li>
              <li>✓ Desktop App</li>
              <li>✓ Priority support</li>
            </ul>

            <button className="mt-6 rounded-2xl bg-violet-500 px-5 py-3 font-black text-white transition hover:bg-violet-400">
              Upgrade to Pro
            </button>
          </article>

          <article className="flex aspect-square min-h-[360px] flex-col rounded-3xl border border-amber-400/70 bg-amber-500/10 p-7 shadow-2xl shadow-amber-950/30">
            <h2 className="text-3xl font-black text-amber-300">Creator</h2>
            <p className="mt-2 text-sm font-medium text-amber-100/80">For power users</p>

            <div className="mt-6">
              <span className="text-5xl font-black">
                €{billingCycle === 'monthly' ? 39 : 390}
              </span>
              <span className="ml-2 text-zinc-300">
                {billingCycle === 'monthly' ? '/mo' : '/yr'}
              </span>
            </div>

            <ul className="mt-7 flex-1 space-y-3 text-sm text-amber-50">
              <li>✓ Everything in Pro</li>
              <li>✓ Bulk processing</li>
              <li>✓ Custom AI training</li>
              <li>✓ Dedicated support</li>
            </ul>

            <button className="mt-6 rounded-2xl bg-amber-400 px-5 py-3 font-black text-black transition hover:bg-amber-300">
              Upgrade to Creator
            </button>
          </article>
        </div>

        <p className="mt-14 text-center text-zinc-500">
          All plans include access to AI clip generation. Cancel anytime.
        </p>
      </section>
    </main>
  );
}
