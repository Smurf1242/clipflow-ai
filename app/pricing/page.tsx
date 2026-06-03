'use client';
import { useState } from 'react';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Free",
      price: 0,
      period: "",
      desc: "Get started",
      features: ["5 AI clips/month", "Basic captions", "Manual posting", "Community support"],
      btn: "Current Plan",
      popular: false,
      color: "emerald" // Green for Free
    },
    {
      name: "Pro",
      price: billingCycle === 'monthly' ? 19 : 190,
      period: billingCycle === 'monthly' ? '/mo' : '/yr',
      desc: "For serious creators",
      features: ["Unlimited clips", "Auto-post to X", "Desktop App", "Priority support"],
      btn: "Upgrade to Pro",
      popular: true,
      color: "violet" // Purple for Pro
    },
    {
      name: "Creator",
      price: billingCycle === 'monthly' ? 39 : 390,
      period: billingCycle === 'monthly' ? '/mo' : '/yr',
      desc: "For power users",
      features: ["Everything in Pro", "Bulk processing", "Custom AI training", "Dedicated support"],
      btn: "Upgrade to Creator",
      popular: false,
      color: "amber" // Orange/Amber for Creator
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] py-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4">Simple, Powerful Pricing</h1>
          <p className="text-2xl text-zinc-400">Choose the plan that fits your content creation needs</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-zinc-900 rounded-full p-1">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-full transition-all ${billingCycle === 'monthly' ? 'bg-white text-black font-semibold' : 'text-zinc-400'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-3 rounded-full transition-all ${billingCycle === 'yearly' ? 'bg-white text-black font-semibold' : 'text-zinc-400'}`}
            >
              Yearly <span className="text-emerald-400">(Save 20%)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards with Colorful Text */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`glass rounded-3xl p-10 flex flex-col w-full max-w-sm mx-auto md:mx-0 relative text-center ${plan.popular ? 'border-2 border-violet-500 scale-105' : 'border border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 px-6 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}

              <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
              
              <div className="flex justify-center items-baseline mb-8">
                <span className="text-6xl font-bold">€{plan.price}</span>
                <span className="text-zinc-400 ml-2">{plan.period}</span>
              </div>

              <p className="text-zinc-400 mb-8">{plan.desc}</p>

              {/* Colorful Features */}
              <ul className="space-y-4 mb-12 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex justify-center items-center gap-3">
                    <span className={`text-lg ${plan.color === 'emerald' ? 'text-emerald-400' : plan.color === 'violet' ? 'text-violet-400' : 'text-amber-400'}`}>✓</span>
                    <span className={`${plan.color === 'emerald' ? 'text-emerald-300' : plan.color === 'violet' ? 'text-violet-300' : 'text-amber-300'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all mt-auto ${plan.popular 
                ? 'bg-white text-black hover:bg-zinc-100' 
                : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                {plan.btn}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-500 mt-16">
          All plans include access to AI clip generation. Cancel anytime.
        </p>
      </div>
    </div>
  );
}