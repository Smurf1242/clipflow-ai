'use client';
import { useState } from 'react';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    { name: "Free", price: 0, period: "", desc: "Get started", features: ["5 AI clips/month", "Basic captions", "Manual posting"], btn: "Current Plan", popular: false },
    { name: "Pro", price: billingCycle === 'monthly' ? 19 : 190, period: billingCycle === 'monthly' ? '/mo' : '/yr', desc: "For serious creators", features: ["Unlimited clips", "Auto-post to X", "Desktop App", "Priority support"], btn: "Upgrade to Pro", popular: true },
    { name: "Creator", price: billingCycle === 'monthly' ? 39 : 390, period: billingCycle === 'monthly' ? '/mo' : '/yr', desc: "For power users", features: ["Everything in Pro", "Bulk processing", "Custom AI training", "Dedicated support"], btn: "Upgrade to Creator", popular: false }
  ];

  return (
    <div className="min-h-screen bg-[#050505] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">Simple, Powerful Pricing</h1>
          <p className="text-2xl text-zinc-400">Choose the plan that fits your content creation needs</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-zinc-900 rounded-full p-1">
            <button onClick={() => setBillingCycle('monthly')} className={`px-8 py-3 rounded-full ${billingCycle === 'monthly' ? 'bg-white text-black' : 'text-zinc-400'}`}>Monthly</button>
            <button onClick={() => setBillingCycle('yearly')} className={`px-8 py-3 rounded-full ${billingCycle === 'yearly' ? 'bg-white text-black' : 'text-zinc-400'}`}>Yearly (Save 20%)</button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`glass rounded-3xl p-8 flex flex-col h-full relative ${plan.popular ? 'border-2 border-violet-500 scale-105' : ''}`}>
              {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 px-5 py-1 rounded-full text-sm">Most Popular</div>}
              
              <h3 className="text-3xl font-bold">{plan.name}</h3>
              <div className="flex items-baseline my-6">
                <span className="text-6xl font-bold">€{plan.price}</span>
                <span className="text-zinc-400 ml-2">{plan.period}</span>
              </div>

              <p className="text-zinc-400 mb-8">{plan.desc}</p>

              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((f, j) => <li key={j} className="flex gap-2"><span>✓</span> {f}</li>)}
              </ul>

              <button className={`w-full py-4 rounded-2xl font-semibold ${plan.popular ? 'bg-white text-black' : 'bg-zinc-800'}`}>
                {plan.btn}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}