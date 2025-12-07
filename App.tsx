import React, { useState } from 'react';
import { 
  MapPin, 
  AlertTriangle, 
  Droplets, 
  Bike, 
  Ban, 
  Coins, 
  Flame, 
  Info, 
  VolumeX, 
  Trash2, 
  PawPrint,
  Search,
  Beer,
  Footprints,
  Users,
  ArrowRight
} from 'lucide-react';
import AIChat from './components/AIChat';

interface InfractionItem {
  type: 'fine' | 'warning' | 'info';
  title: string;
  fineAmount?: string;
  content: React.ReactNode;
  searchText: string;
  ref?: string;
}

// Infractions Data Structure
const infractionData: { id: string; title: string; items: InfractionItem[] }[] = [
  {
    id: '2.1',
    title: "2.1 Public Order and Quiet",
    items: [
      {
        type: 'fine',
        title: "Night Quiet",
        fineAmount: "10,000 CZK",
        content: <>Strict quiet hours are enforced between <strong>22:00 and 06:00</strong>. Loud noise, music, or shouting in residential areas is prohibited.</>,
        searchText: "Strict quiet hours are enforced between 22:00 and 06:00. Loud noise, music, or shouting in residential areas is prohibited.",
        ref: "Law No. 251/2016 Sb."
      },
      {
        type: 'warning',
        title: "Public Indecency",
        content: "Inappropriate behavior, public nudity, or urination in public spaces is strictly penalized.",
        searchText: "Inappropriate behavior, public nudity, or urination in public spaces is strictly penalized.",
        ref: "Law No. 251/2016 Sb."
      }
    ]
  },
  {
    id: '2.2',
    title: "2.2 Protecting City Cleanliness",
    items: [
      {
        type: 'fine',
        title: "Property Damage",
        fineAmount: "50,000 CZK",
        content: <>Damaging public property, monuments, or green spaces is a serious offense. <strong>Graffiti</strong> is only allowed in specific designated legal zones.</>,
        searchText: "Damaging public property, monuments, or green spaces is a serious offense. Graffiti is only allowed in specific designated legal zones."
      },
      {
        type: 'fine',
        title: "Littering",
        fineAmount: "20,000 CZK",
        content: <>Includes throwing cigarette butts, gum, or waste on the ground. <strong>Throwing objects from vehicles</strong> is also strictly prohibited.</>,
        searchText: "Includes throwing cigarette butts, gum, or waste on the ground. Throwing objects from vehicles is also strictly prohibited."
      },
      {
        type: 'fine',
        title: "Feeding Animals",
        fineAmount: "1,000 CZK",
        content: "Do not feed pigeons, swans, or nutria (river rats). It harms the ecosystem and attracts pests.",
        searchText: "Do not feed pigeons, swans, or nutria (river rats). It harms the ecosystem and attracts pests."
      }
    ]
  }
];

// Hero Section Component
const Hero = () => (
  <header className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-slate-900">
    <img 
      src="https://cdn.pixabay.com/photo/2020/01/22/19/08/prague-4786139_1280.jpg" 
      alt="Prague Charles Bridge Towers" 
      className="absolute inset-0 w-full h-full object-cover"
    />
    {/* Dark Overlay for Text Readability */}
    <div className="absolute inset-0 bg-slate-900/60"></div>
    
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
        Prague Visitors Guide
      </h1>
      <p className="text-xl md:text-2xl text-slate-200 font-light drop-shadow-sm">
        Essential Information & Regulations for a Safe Stay
      </p>
      <div className="mt-8 inline-block px-6 py-2 border border-white/30 rounded-full backdrop-blur-md bg-white/10 text-white text-sm uppercase tracking-wider">
        Official Guidelines Summary
      </div>
    </div>
  </header>
);

// Section Wrapper
const Section: React.FC<{ 
  number: number; 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode; 
  className?: string;
}> = ({ number, title, icon, children, className = "" }) => (
  <section className={`py-12 border-b border-slate-200 last:border-0 ${className}`}>
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-prague-red text-white font-bold text-xl shadow-md shrink-0">
        {number}
      </div>
      <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
        {title}
        <span className="text-slate-400">{icon}</span>
      </h2>
    </div>
    <div className="pl-0 md:pl-16">
      {children}
    </div>
  </section>
);

// Subsection Wrapper
const Subsection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8 last:mb-0">
    <h3 className="text-xl font-semibold text-slate-700 mb-4 border-l-4 border-prague-gold pl-3">
      {title}
    </h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

// Warning/Info Card
const InfoCard: React.FC<{ 
  type: 'warning' | 'info' | 'fine'; 
  title: string; 
  children: React.ReactNode;
  fineAmount?: string;
}> = ({ type, title, children, fineAmount }) => {
  const styles = {
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    fine: "bg-red-50 border-red-200 text-red-900",
    info: "bg-blue-50 border-blue-200 text-blue-900"
  };

  const icons = {
    warning: <AlertTriangle className="w-5 h-5 text-amber-600" />,
    fine: <Ban className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />
  };

  return (
    <div className={`p-5 rounded-lg border ${styles[type]} shadow-sm transition-all hover:shadow-md`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 font-bold">
          {icons[type]}
          {title}
        </div>
        {fineAmount && (
          <span className="bg-white/80 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide border border-current whitespace-nowrap ml-2">
            Fine up to {fineAmount}
          </span>
        )}
      </div>
      <div className="text-sm leading-relaxed opacity-90">
        {children}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInfractions = infractionData.map(section => ({
    ...section,
    items: section.items.filter(item => {
      const term = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(term) ||
        item.searchText.toLowerCase().includes(term) ||
        (item.ref && item.ref.toLowerCase().includes(term)) ||
        (item.fineAmount && item.fineAmount.toLowerCase().includes(term))
      );
    })
  })).filter(section => section.items.length > 0);

  return (
    <div className="min-h-screen font-sans selection:bg-prague-red/20">
      <Hero />

      <main className="max-w-5xl mx-auto px-6 py-8 bg-white shadow-xl -mt-20 relative rounded-t-3xl z-20">
        
        {/* SECTION 1: Map */}
        <Section number={1} title="Alcohol Consumption Restriction Zones" icon={<MapPin />}>
          <Subsection title="Interactive Map of Restricted Zones">
             {/* 
                ================================================================
                PLACEHOLDER FOR INTERACTIVE MAP CODE
                Integration Point: Insert Google Maps / Mapy.cz iframe or API code here.
                The map should highlight areas where public drinking is prohibited by local ordinance.
                ================================================================
             */}
             <div className="w-full h-[400px] bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 p-8 text-center group hover:border-prague-blue transition-colors cursor-pointer">
                <MapPin size={48} className="mb-4 group-hover:text-prague-blue transition-colors" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">Interactive Map Area</h3>
                <p className="max-w-md text-sm">
                  This area is reserved for the Alcohol Restriction Zone map. 
                  (See HTML comment in source code for integration point).
                </p>
             </div>
          </Subsection>
        </Section>

        {/* SECTION 2: Penalties (With Search) */}
        <Section number={2} title="Infractions and Penalties (Avoid Fines!)" icon={<AlertTriangle />}>
          <div className="mb-8">
            <div className="relative max-w-xl">
              <input 
                type="text" 
                placeholder="Search regulations (e.g. 'noise', 'alcohol', '251/2016')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-prague-blue focus:border-transparent outline-none transition-shadow shadow-sm bg-slate-50 focus:bg-white"
              />
              <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredInfractions.length > 0 ? (
              filteredInfractions.map((section) => (
                <div key={section.id}>
                  <Subsection title={section.title}>
                    {section.items.map((item, idx) => (
                      <InfoCard 
                        key={`${section.id}-${idx}`}
                        type={item.type} 
                        title={item.title} 
                        fineAmount={item.fineAmount}
                      >
                        {item.content}
                        {item.ref && <em className="text-xs mt-1 block opacity-75">Ref: {item.ref}</em>}
                      </InfoCard>
                    ))}
                  </Subsection>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 bg-slate-50 rounded-xl border border-slate-100">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 font-medium">No regulations found matching "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="mt-2 text-prague-blue hover:text-blue-700 text-sm font-medium underline underline-offset-4"
                >
                  Clear search filters
                </button>
              </div>
            )}
          </div>
        </Section>

        {/* SECTION 3: Water */}
        <Section number={3} title="Drinking Water" icon={<Droplets />}>
          <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1">
                  <Droplets size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Public Drinking Fountains</h4>
                  <p className="text-slate-600">Available mostly from <strong>April 1st to October 31st</strong>. Look for fountains marked with the "Pitná voda" (Drinking Water) pictogram.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-full text-red-600 mt-1">
                  <Ban size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Do Not Drink from Decorative Fountains</h4>
                  <p className="text-slate-600">Water in ornamental fountains, cascades, and mists is generally <strong>not potable</strong> and is treated chemically.</p>
                </div>
              </li>
            </ul>
          </div>
        </Section>

        {/* SECTION 4: Traffic */}
        <Section number={4} title="Traffic Rules" icon={<Bike />}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
             <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center h-full">
                <div className="mx-auto w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">
                  <Beer size={20} />
                </div>
                <h4 className="font-bold mb-2">Zero Tolerance</h4>
                <p className="text-sm text-slate-600">0.0% Blood Alcohol Content limit for cyclists and scooter riders.</p>
             </div>
             
             <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center h-full">
                <div className="mx-auto w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-3">
                  <Footprints size={20} />
                </div>
                <h4 className="font-bold mb-2">Sidewalks</h4>
                <p className="text-sm text-slate-600">Riding bikes or electric scooters on sidewalks is <strong>prohibited</strong>.</p>
             </div>

             <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center h-full">
                <div className="mx-auto w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                  <ArrowRight size={20} />
                </div>
                <h4 className="font-bold mb-2">Single File</h4>
                <p className="text-sm text-slate-600">Cyclists must ride one behind another, not side-by-side.</p>
             </div>

             <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center h-full">
                <div className="mx-auto w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                  <Users size={20} />
                </div>
                <h4 className="font-bold mb-2">Yielding</h4>
                <p className="text-sm text-slate-600">Riders must always yield to pedestrians, especially on shared paths.</p>
             </div>
          </div>
        </Section>

        {/* SECTION 5: Controlled Substances and Gambling */}
        <Section number={5} title="Controlled Substances and Gambling" icon={<AlertTriangle />}>
          <div className="space-y-6">
            <Subsection title="5.1 Controlled Substances">
               <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Cannabis is Illegal</h4>
                  <p className="text-slate-600 mb-4">
                    Possession and distribution of recreational cannabis containing THC (>1%) is illegal in the Czech Republic.
                  </p>
                  <div className="border-t border-slate-200 pt-4">
                    <h5 className="font-semibold text-slate-700">Psycho-modulating Substances (e.g., HHC, Kratom)</h5>
                    <ul className="list-disc ml-5 mt-2 text-sm text-slate-600 space-y-1">
                      <li>Sale strictly prohibited to persons under <strong>18 years of age</strong>.</li>
                      <li>Products must carry mandatory labeling.</li>
                      <li>Regulations change frequently; caution is advised.</li>
                    </ul>
                  </div>
               </div>
            </Subsection>

            <Subsection title="5.2 Gambling">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 rounded text-slate-500">
                  <Coins />
                </div>
                <div>
                  <p className="text-slate-700">
                    Gambling is strictly regulated. Entry to casinos and gaming halls is allowed only for persons <strong>18+</strong>. 
                    Many districts in Prague have banned slot machines and technical games entirely to reduce nuisance.
                  </p>
                </div>
              </div>
            </Subsection>
          </div>
        </Section>

        {/* SECTION 6: Fees */}
        <Section number={6} title="Fees (City Tax)" icon={<Coins />}>
          <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
               <h3 className="font-bold text-lg text-slate-700">Local Stay Fee (Tourist Tax)</h3>
               <span className="bg-prague-blue text-white px-3 py-1 rounded-full font-bold">50 CZK / day</span>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                   <h4 className="font-semibold mb-2 text-slate-800">Purpose</h4>
                   <p className="text-sm text-slate-600 mb-4">
                     Collected by accommodation providers (hotels, hostels, AirBnb). The revenue supports city infrastructure, waste management, and tourism services.
                   </p>
                   <p className="text-sm font-medium text-slate-800">
                     <span className="text-red-600">*</span> Payment is mandatory for every day of stay (max 60 days).
                   </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-slate-800">Exemptions</h4>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Persons under 18 years of age.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Holders of ZTP/P cards (severe disability) and their guides.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* SECTION 7: Fireworks */}
        <Section number={7} title="Fireworks and Pyrotechnics" icon={<Flame />}>
          <div className="bg-red-50 border border-red-100 p-6 rounded-xl">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-800 mb-2">Strictly Regulated</h3>
                <p className="text-red-900/80 mb-4">
                  Amateur use of pyrotechnics is banned throughout most of the year to protect historical buildings and wildlife (especially swans).
                </p>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
                  <h4 className="font-bold text-slate-800 mb-2">When is it allowed?</h4>
                  <p className="text-sm text-slate-600">
                    Only on <strong>January 1st</strong> and <strong>December 31st</strong>.
                  </p>
                  <p className="text-xs text-slate-500 mt-1">(Exceptions apply for official public holidays or permitted events).</p>
                  
                  <div className="mt-3 pt-3 border-t border-slate-100">
                     <h4 className="font-bold text-slate-800 mb-1">Time Restriction</h4>
                     <p className="text-sm text-slate-600">10:00 – 22:00</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 w-full">
                 <h4 className="font-bold text-slate-800 mb-3">Permanent Prohibited Zones</h4>
                 <ul className="space-y-2 text-sm text-slate-700">
                   <li className="flex items-start gap-2">
                     <Ban size={16} className="text-red-500 mt-0.5 shrink-0" />
                     Historical City Core (Heritage conservation areas).
                   </li>
                   <li className="flex items-start gap-2">
                     <Ban size={16} className="text-red-500 mt-0.5 shrink-0" />
                     Within 250 meters of hospitals, nursing homes, and veterinary clinics.
                   </li>
                   <li className="flex items-start gap-2">
                     <Ban size={16} className="text-red-500 mt-0.5 shrink-0" />
                     Parks, nature reserves, and near waterways (rivers/dams).
                   </li>
                 </ul>
              </div>
            </div>
          </div>
        </Section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} Prague Visitor Information. 
            Information is based on local ordinances including Law No. 251/2016 Sb.
          </p>
          <p className="text-sm text-slate-500">
            Emergency Numbers: 112 (General), 158 (Police), 155 (Ambulance), 150 (Fire).
          </p>
        </div>
      </footer>
      
      {/* AI Chatbot Overlay */}
      <AIChat />
    </div>
  );
};

export default App;