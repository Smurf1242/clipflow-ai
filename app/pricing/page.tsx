{/* Pricing Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
  {plans.map((plan, index) => {
    const styles = {
      emerald: {
        border: "border-emerald-500/60",
        bg: "bg-emerald-500/10",
        text: "text-emerald-300",
        check: "text-emerald-400",
        button: "bg-emerald-500 hover:bg-emerald-400 text-black",
      },
      violet: {
        border: "border-violet-500/70",
        bg: "bg-violet-500/10",
        text: "text-violet-300",
        check: "text-violet-400",
        button: "bg-violet-500 hover:bg-violet-400 text-black",
      },
      amber: {
        border: "border-amber-500/60",
        bg: "bg-amber-500/10",
        text: "text-amber-300",
        check: "text-amber-400",
        button: "bg-amber-500 hover:bg-amber-400 text-black",
      },
    }[plan.color];

    return (
      <div
        key={index}
        className={`
          relative flex min-h-[520px] flex-col rounded-2xl border
          ${styles.border} ${styles.bg}
          p-8 text-center shadow-xl shadow-black/30
          ${plan.popular ? "md:-translate-y-4" : ""}
        `}
      >
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-violet-500 px-5 py-1 text-sm font-bold text-white">
            Most Popular
          </div>
        )}

        <h3 className="mb-2 text-3xl font-bold text-white">{plan.name}</h3>

        <p className="mb-6 text-zinc-400">{plan.desc}</p>

        <div className="mb-8">
          <span className="text-6xl font-black text-white">€{plan.price}</span>
          <span className="ml-2 text-zinc-400">{plan.period}</span>
        </div>

        <ul className="mb-10 flex-1 space-y-4 text-left">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className={`text-xl font-bold ${styles.check}`}>✓</span>
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