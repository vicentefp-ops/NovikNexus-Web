import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('novik-cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      try {
        setPreferences(JSON.parse(consent));
      } catch (e) {}
    }
  }, []);

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem('novik-cookie-consent', JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowPreferences(false);
    // Here you would typically trigger gtag or other scripts based on prefs
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true, functional: true });
  };

  const handleRejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false, functional: false });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showBanner && !showPreferences) return null;

  return (
    <AnimatePresence>
      {showBanner && !showPreferences && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto bg-[#121212] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl pointer-events-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-2">We value your privacy</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-[#901A1E] hover:underline">Read our Privacy Policy</a>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button onClick={() => setShowPreferences(true)} className="px-5 py-2.5 text-sm font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors whitespace-nowrap">
                Manage Preferences
              </button>
              <button onClick={handleRejectAll} className="px-5 py-2.5 text-sm font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors whitespace-nowrap">
                Reject All
              </button>
              <button onClick={handleAcceptAll} className="px-5 py-2.5 text-sm font-semibold text-black bg-white hover:bg-gray-200 rounded-full transition-colors whitespace-nowrap">
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {showPreferences && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Cookie Preferences</h2>
              <button onClick={() => setShowPreferences(false)} className="text-white/50 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-white font-semibold mb-1">Strictly Necessary</h4>
                    <p className="text-white/50 text-sm">These cookies are essential for the website to function properly and cannot be disabled.</p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#901A1E] opacity-50 cursor-not-allowed">
                    <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition" />
                  </div>
                </div>
                
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-white font-semibold mb-1">Analytics</h4>
                    <p className="text-white/50 text-sm">Help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                  </div>
                  <button 
                    onClick={() => togglePreference('analytics')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.analytics ? 'bg-[#901A1E]' : 'bg-white/20'}`}
                  >
                    <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${preferences.analytics ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-white font-semibold mb-1">Marketing</h4>
                    <p className="text-white/50 text-sm">Used to track visitors across websites to display relevant advertisements.</p>
                  </div>
                  <button 
                    onClick={() => togglePreference('marketing')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.marketing ? 'bg-[#901A1E]' : 'bg-white/20'}`}
                  >
                    <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${preferences.marketing ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-white font-semibold mb-1">Functional</h4>
                    <p className="text-white/50 text-sm">Enable the website to provide enhanced functionality and personalization.</p>
                  </div>
                  <button 
                    onClick={() => togglePreference('functional')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.functional ? 'bg-[#901A1E]' : 'bg-white/20'}`}
                  >
                    <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${preferences.functional ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-white/5 flex flex-col sm:flex-row justify-end gap-3">
              <button onClick={handleRejectAll} className="px-6 py-2.5 text-sm font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                Reject All
              </button>
              <button onClick={handleSavePreferences} className="px-6 py-2.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                Save Preferences
              </button>
              <button onClick={handleAcceptAll} className="px-6 py-2.5 text-sm font-semibold text-black bg-white hover:bg-gray-200 rounded-full transition-colors">
                Accept All
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
