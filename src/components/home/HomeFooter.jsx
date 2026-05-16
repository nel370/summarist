import React from 'react';

const footerCols = [
  {
    title: 'Actions',
    links: ['Summarist Magazine', 'Cancel Subscription', 'Help', 'Contact us'],
  },
  {
    title: 'Useful Links',
    links: ['Pricing', 'Summarist Business', 'Gift Cards', 'Authors & Publishers'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Partners', 'Code of Conduct'],
  },
  {
    title: 'Other',
    links: ['Sitemap', 'Legal Notice', 'Terms of Service', 'Privacy Policies'],
  },
];

export default function HomeFooter() {
  return (
    <footer className="bg-[#f1f6f4] py-10">
      <div className="max-w-[1070px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {footerCols.map((col) => (
            <div key={col.title}>
              <h4 className="text-lg font-semibold text-[#032b41] mb-4">{col.title}</h4>
              {col.links.map((link) => (
                <div key={link} className="mb-3">
                  <span className="text-sm text-[#394547] cursor-not-allowed">{link}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-[#032b41] font-medium text-sm">
            Copyright &copy; 2023 Summarist.
          </p>
        </div>
      </div>
    </footer>
  );
}