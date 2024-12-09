'use client';

import { Check } from 'lucide-react';

export const DefinitionOfDone = () => {
  const criteria = [
    {
      category: "Code Quality",
      items: [
        "Code is properly commented and documented",
        "All debug logs and testing code removed",
        "No compiler warnings or errors",
        "Code follows project style guidelines"
      ]
    },
    {
      category: "Testing",
      items: [
        "Core gameplay mechanics tested",
        "No known bugs or crashes",
        "Performance meets target FPS",
        "Saved game functionality verified"
      ]
    },
    {
      category: "Assets",
      items: [
        "All placeholder assets replaced",
        "Assets optimized for target platform",
        "Audio levels properly balanced",
        "UI elements properly scaled"
      ]
    },
    {
      category: "Player Experience",
      items: [
        "Core loop is engaging and fun",
        "Tutorial/onboarding is clear",
        "Controls feel responsive",
        "Difficulty properly balanced"
      ]
    }
  ];

  return (
    <div className="bg-stats-background border border-stats-border rounded-lg overflow-hidden transition-all duration-300 mb-6 pb-2">
        <div className="flex items-center gap-2 px-4 pt-4">
          <h3 className="font-medium">Definition of Done</h3>
        </div>
        <div className="px-4 grid grid-cols-4 gap-4 py-2">
            {criteria.map((category) => (
            <div key={category.category} className="space-y-2">
                <h4 className="font-medium text-sm text-accent-purple mb-2">{category.category}</h4>
                <ul className="space-y-1">
                {category.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check size={14} className="mt-1 text-accent-success/60" />
                    <span>{item}</span>
                    </li>
                ))}
                </ul>
            </div>
            ))}
        </div>
    </div>
  );
};

export default DefinitionOfDone;