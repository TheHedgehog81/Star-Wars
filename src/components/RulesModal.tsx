import React, { useState } from 'react';
import { ResourceSquareIcon, BlasterAttackIcon, StarshipFleetIcon, ForceStarWarsIcon } from './GameIcons';
import { X, BookOpen, Shield, Target } from 'lucide-react';

interface RulesModalProps {
  language: 'it' | 'en';
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ language, onClose }) => {
  const [lang, setLang] = useState<'it' | 'en'>(language);

  return (
    <div
      id="rules-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="rules-modal-content"
        className="relative w-full max-w-2xl max-h-[88vh] bg-slate-950 border border-slate-700 rounded-2xl p-6 shadow-2xl text-white flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-slate-100">
              {lang === 'it' ? 'Regolamento Ufficiale Aggiornato' : 'Official Rules Guide'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono border border-slate-700 transition"
            >
              {lang === 'it' ? 'Switch to English' : 'Passa all\'Italiano'}
            </button>
            <button
              id="btn-close-rules"
              onClick={onClose}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Rules Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pr-1.5">
          {lang === 'it' ? (
            <>
              {/* Obiettivo */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                  <Target className="w-4 h-4" /> 1. Obiettivo del Gioco
                </h3>
                <p>
                  In <strong>Star Wars: The Deckbuilding Game</strong>, l’Alleanza Ribelle e l’Impero Galattico si affrontano in un duello strategico. Il primo giocatore che distrugge <strong>4 basi nemiche</strong> (o 3 in una partita rapida) vince immediatamente la partita!
                </p>
              </div>

              {/* Risorse e Valute */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                  <ResourceSquareIcon className="w-4 h-4" glow /> 2. Le Risorse di Gioco
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <ResourceSquareIcon className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" glow />
                    <div>
                      <strong className="text-amber-300">Risorse (Stemma Quadrato Giallo):</strong> Si usano per acquistare carte alleate o neutrali dalla Fila della Galassia oppure i Piloti dell’Orlo Esterno.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BlasterAttackIcon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" glow />
                    <div>
                      <strong className="text-red-400">Attacco (Pistola Laser):</strong> Si usa per danneggiare Navi Ammiraglie nemiche, la Base attiva nemica o per <em>Sabotare</em> le carte nemiche nella Galassia.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ForceStarWarsIcon className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" glow />
                    <div>
                      <strong className="text-cyan-400">La Forza (Tracciatore):</strong> Muove il segnalino verso il tuo lato (Lato Chiaro per i Ribelli, Lato Oscuro per l’Impero).
                    </div>
                  </div>
                </div>
              </div>

              {/* Tracciatore della Forza */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                  <ForceStarWarsIcon className="w-4 h-4" glow /> 3. Tracciatore dell’Equilibrio della Forza
                </h3>
                <p>
                  La Forza è con te ogni volta che il segnalino si trova dalla tua parte (valori negativi per i Ribelli, positivi per l’Impero). Molte carte (es. <em>Luke Skywalker, Caccia TIE Interceptor</em>) hanno abilità aggiuntive potentissime <strong>"Se la Forza è con te"</strong>!
                </p>
                <p className="mt-2 text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-xs">
                  ★ <strong>Bonus Spazio 6:</strong> Se inizi il tuo turno con la Forza al massimo dalla tua parte (spazio 6), ricevi subito <strong>+1 Risorsa bonus</strong> per quel turno!
                </p>
              </div>

              {/* Fila della Galassia e Sabotaggio */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                  <Target className="w-4 h-4" /> 4. Fila della Galassia e Sabotaggio (Bounty)
                </h3>
                <p>
                  Al centro del tavolo ci sono 6 carte galattiche:
                </p>
                <ul className="list-disc list-inside mt-1 space-y-1 text-slate-300">
                  <li><strong>Carte Alleate & Neutrali:</strong> Puoi comprarle pagando il loro costo in Risorse. Vanno nella tua pila degli scarti.</li>
                  <li><strong>Carte Nemiche (Sabotaggio):</strong> Non puoi comprarle, ma puoi <em>attaccarle</em> spendendo Attacco pari al loro <strong>Valore Bersaglio</strong>. Se le sconfiggi, le scarti e riscuoti subito la loro <strong>Ricompensa</strong> (+Risorse, +Attacco, +Forza o pesca carte)!</li>
                </ul>
              </div>

              {/* Navi Ammiraglie */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-blue-400 mb-1 flex items-center gap-1.5">
                  <StarshipFleetIcon className="w-4 h-4" /> 5. Navi Ammiraglie (Capital Ships)
                </h3>
                <p>
                  A differenza delle Unità (che vengono scartate a fine turno), le <strong>Navi Ammiraglie</strong> rimangono nella tua Flotta turno dopo turno finché non vengono distrutte:
                </p>
                <ul className="list-disc list-inside mt-1 space-y-1 text-slate-300">
                  <li>Forniscono Risorse o Attacco ogni turno.</li>
                  <li><strong>Scudo Protettivo:</strong> Finché il giocatore ha almeno una Nave Ammiraglia nella flotta, l’avversario <strong>DEVE attaccare prima la Nave Ammiraglia</strong> e non può colpire la Base attiva (a meno di carte speciali come Han Solo).</li>
                </ul>
              </div>

              {/* Basi e Distruzione */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-red-400 mb-1 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> 6. Distruzione delle Basi
                </h3>
                <p>
                  Ogni giocatore inizia con una Base iniziale da 8 PF (Dantooine o Lothal). Quando i PF di una base scendono a 0, la base viene <strong>distrutta</strong>!
                </p>
                <p className="mt-1">
                  Il giocatore che ha perso la base sceglie immediatamente una nuova Base Galattica dal proprio mazzo basi (ognuna con abilità uniche e 10-16 PF). I danni in eccesso dell’attacco distruttivo <strong>non vengono trasferiti</strong> alla nuova base.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* English Version */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                  <Target className="w-4 h-4" /> 1. Goal of the Game
                </h3>
                <p>
                  In <strong>Star Wars: The Deckbuilding Game</strong>, the Rebel Alliance and Galactic Empire clash in head-to-head galactic warfare. The first player to destroy <strong>4 enemy bases</strong> (or 3 in a quick game) wins the game!
                </p>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                  <ResourceSquareIcon className="w-4 h-4" glow /> 2. Resources & Combat
                </h3>
                <p>
                  Players manage <strong>Resources (Yellow Square Icon)</strong> to purchase units, <strong>Attack (Blaster Pistols)</strong> to defeat capital ships, bases, or sabotage enemy cards in the Galaxy Row, and <strong>The Force</strong> to shift the Force balance in their favor.
                </p>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-blue-400 mb-1 flex items-center gap-1.5">
                  <StarshipFleetIcon className="w-4 h-4" /> 3. Capital Ships Guarding the Base
                </h3>
                <p>
                  Capital Ships stay in your fleet across turns until destroyed. While you control any Capital Ship, your active base cannot be targeted directly—opponents must eliminate your Capital Ships first!
                </p>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-red-400 mb-1 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> 4. Sabotaging Galaxy Row & Rewards
                </h3>
                <p>
                  Opposing faction cards in the Galaxy Row can be attacked (sabotaged) by spending attack equal to their Target value. Defeating them grants their listed Bounty Reward immediately.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            id="btn-confirm-rules"
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition"
          >
            {lang === 'it' ? 'Ho Capito, Andiamo alla Battaglia!' : 'Got it, let\'s battle!'}
          </button>
        </div>
      </div>
    </div>
  );
};
