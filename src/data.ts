export const studio = {
  phone: '(302) 683-9453',
  phoneHref: 'tel:+13026839453',
  address: ['1708 Newport Gap Pike', 'Wilmington, DE 19808'],
  mapHref: 'https://www.google.com/maps/search/?api=1&query=1708+Newport+Gap+Pike+Wilmington+DE+19808',
  hours: 'Monday – Saturday, 12 Noon to 8pm',
  facebook: 'https://www.facebook.com/wildcardstudios.tattooing',
  tattooCare: 'https://www.wildcardtattoos.com/uploads/3/4/3/7/34373451/tattoo_care_sheet.doc',
  piercingCare: 'https://www.wildcardtattoos.com/uploads/3/4/3/7/34373451/piercing_care_sheet.doc',
};

export const tattoos = Array.from({ length: 20 }, (_, i) => `/img/tattoo${i + 1}.jpg`);
export const piercings = Array.from({ length: 8 }, (_, i) => `/img/piercing${i + 1}.jpg`);

export const reasons = [
  { n: '01', t: 'Since 1997', d: 'Terry has been tattooing professionally since 1997, after a three-year apprenticeship that began in 1994.' },
  { n: '02', t: 'Full Service', d: 'Custom tattoos and professional piercings under one roof — pick from the flash walls or bring your own idea.' },
  { n: '03', t: 'Quality Attention', d: 'We take the time to walk you through every procedure and answer every question before we start.' },
  { n: '04', t: 'Walk-ins Welcome', d: 'Stop by Monday to Saturday, 12 Noon to 8pm, or call ahead to make an appointment.' },
];

export const team = [
  {
    name: 'Terry Manning',
    role: 'Owner / Artist',
    img: '/img/9246191.jpg',
    bio: 'I have been tattooing professionally since 1997. Before this I completed a 3 year apprenticeship that started in 1994 under the supervision of Marc Fairchild. Shortly after I finished learning the trade I decided to open Wildcard Studios in Wilmington, DE.',
  },
  {
    name: 'Amie',
    role: 'Piercer',
    img: '/img/8524271.jpg',
    bio: "I started working part-time at Wildcard Studios in 1997 and immediately took an interest in piercings. I've been piercing professionally ever since. I walk every customer through the procedure, go over the aftercare, and I'm always available for questions — stop by or call anytime. Piercings performed are above the waist.",
  },
];

export const steps = [
  { n: '01', t: 'Consultation', d: 'Tell us your idea, or browse the flash on our walls. Walk in or call ahead.' },
  { n: '02', t: 'Design', d: 'We shape the artwork and placement together until it feels right.' },
  { n: '03', t: 'The Session', d: 'Relax — we talk you through every step and answer questions as we go.' },
  { n: '04', t: 'Aftercare', d: 'You leave with clear care instructions and a standing invitation to call us anytime.' },
];
