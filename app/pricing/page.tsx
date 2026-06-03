'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const supabase = createClient();

  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Get started",
      features: [
        "5 AI clip generations per month",
        "Basic captions",
        "Post to X manually",
        "Community support"
      ],
      buttonText: "Current Plan",
      popular: false
    },
    {
      name: "Pro",
      price: billingCycle === 'monthly' ? 19 : 190,
      description: "For serious creators",
      features: [
        "Unlimited AI clip generations",
        "Advanced viral captions",
        "Auto-post to X",
        "Priority support",
        "Desktop App access"
      ],
      buttonText: "Upgrade to Pro",
      popular: true
    },
    {
      name: "Creator",
      price: billingCycle === 'monthly' ? 39 : 390,
      description: "For power users",
      features: [
        "Everything in Pro",
        "Bulk processing",
        "Custom AI style training",
        "Priority video rendering",
        "Dedicated support"
      ],
      buttonText: "Upgrade to Creator",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold mb-4">Simple, Powerful Pricing</h1>
        <p className="text-2xl text-zinc-400 mb-12">Choose the plan that fits your content creation needs</p>

        {/* Billing Toggle */}
        <div className="inline-flex bg-zinc-900 rounded-full p-1 mb-12">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2.5 rounded-full transition ${billingCycle === 'monthly' ? 'bg-white text-black' : 'text-zinc-400'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2.5 rounded-full transition ${billingCycle === 'yearly' ? 'bg-white text-black' : 'text-zinc-400'}`}
          >
            Yearly <span className="text-emerald-400 text-sm">(Save 20%)</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass rounded-3xl p-8 relative ${plan.popular ? 'border-violet-500 scale-105' : 'border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-sm px-6 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-bold">€{plan.price}</span>
                <span className="text-zinc-400 ml-2">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>

              <p className="text-zinc-400 mb-8">{plan.description}</p>

              <ul className="space-y-4 mb-10 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${plan.popular 
                ? 'bg-white text-black hover:bg-zinc-200' 
                : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <p className="text-zinc-500 mt-12 text-sm">
          All plans include access to AI clip generation. Cancel anytime.
        </p>
      </div>
    </div>
  );
}