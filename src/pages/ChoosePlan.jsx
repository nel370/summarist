import React, { useState } from 'react';
import { FileText, Users, BarChart3, ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const plans = [
  {
    id: 'yearly',
    name: 'Premium Plus Yearly',
    price: '$99.99/year',
    sub: '7-day free trial included',
  },
  {
    id: 'monthly',
    name: 'Premium Monthly',
    price: '$9.99/month',
    sub: 'No trial included',
  },
];

const features = [
  { icon: FileText, title: 'Key ideas in few min', desc: 'with many books to read' },
  { icon: Users, title: '3 million', desc: 'people growing with Summarist everyday' },
  { icon: BarChart3, title: 'Precise recommendations', desc: 'collections curated by experts' },
];

const faqItems = [
  {
    q: 'How does the free 7-day trial work?',
    a: 'Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can browse through numerous book summaries to your preference during the trial.',
  },
  {
    q: 'Can I switch subscriptions from monthly to yearly or yearly to monthly?',
    a: 'While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current plan has expired after 12 months, transitioning to a monthly plan is an option.',
  },
  {
    q: "What's included in the Premium plan?",
    a: 'Premium membership provides you with the key ideas from 12,000+ titles in audio, text, and video format. You can download unlimited titles for offline viewing and also access personalized reading lists based on your preferences.',
  },
  {
    q: 'Can I cancel during my trial or subscription?',
    a: 'You will not be charged if you cancel your trial before its conclusion. While subscriptions for the annual plan are non-refundable, you can easily cancel the subscription.',
  },
];

export default function ChoosePlan() {
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#032b41] text-white py-12 md:py-16">
        <div className="max-w-[1070px] mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Get unlimited access to many amazing books to read
          </h1>
          <p className="text-base md:text-lg font-light opacity-80">
            Turn ordinary moments into amazing learning opportunities
          </p>
        </div>
      </div>

      {/* Illustration arc */}
      <div className="bg-[#032b41]">
        <div className="bg-white rounded-t-[50%] pt-8 flex justify-center">
          <img
            src="https://summarist.vercel.app/_next/static/media/pricing-top.4e0c01b4.png"
            alt="Pricing"
            className="max-w-[300px] w-full"
          />
        </div>
      </div>

      {/* Features */}
      <div className="max-w-[1070px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center">
              <f.icon className="w-14 h-14 text-[#032b41] mb-3" strokeWidth={1} />
              <p className="text-base text-[#394547]">
                <span className="font-semibold">{f.title}</span> {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Plan selection */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#032b41] text-center mb-8">
          Choose the plan that fits you
        </h2>

        <div className="max-w-[640px] mx-auto space-y-4 mb-8">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`w-full text-left p-5 rounded-lg border-2 transition-all flex items-center gap-4
                ${selectedPlan === plan.id
                  ? 'border-[#2bd97c] bg-[#f1f6f4]'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                ${selectedPlan === plan.id ? 'border-[#2bd97c]' : 'border-gray-300'}`}
              >
                {selectedPlan === plan.id && (
                  <div className="w-3 h-3 rounded-full bg-[#2bd97c]" />
                )}
              </div>
              <div>
                <p className="font-bold text-[#032b41] text-base">{plan.name}</p>
                <p className="text-lg font-bold text-[#032b41]">{plan.price}</p>
                <p className="text-xs text-gray-500">{plan.sub}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="max-w-[640px] mx-auto flex flex-col items-center gap-4 mb-12">
          <div className="flex items-center gap-3 w-full">
            <div className="border-t border-gray-200 flex-1" />
            <span className="text-sm text-gray-400">or</span>
            <div className="border-t border-gray-200 flex-1" />
          </div>
        </div>

        <div className="max-w-[640px] mx-auto mb-16">
          <button className="bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] w-full h-12 rounded font-bold text-base transition-colors">
            {selectedPlan === 'yearly' ? 'Start your free 7-day trial' : 'Start your first month'}
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            {selectedPlan === 'yearly'
              ? "Cancel your trial at any time before it ends, and you won't be charged."
              : 'Monthly subscription renews automatically. Cancel anytime.'}
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-[640px] mx-auto mb-16">
          <Accordion type="single" collapsible>
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-[#032b41] font-bold text-base py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#394547] font-light leading-relaxed pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#f1f6f4] py-8">
        <div className="max-w-[1070px] mx-auto px-6 text-center">
          <p className="text-[#032b41] font-medium text-sm">Copyright &copy; 2023 Summarist.</p>
        </div>
      </footer>
    </div>
  );
}