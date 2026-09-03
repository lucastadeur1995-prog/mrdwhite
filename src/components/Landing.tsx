import { useEffect } from 'react';
import { storage } from '../utils/storage';
import { ga4Tracking } from '../utils/ga4Tracking';

interface LandingProps {
    onNavigate: (page: string) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
    // ========================================
    // ✅ SISTEMA DE CAPTURA DE UTMs (PRESERVADO)
    // ========================================
    const captureUTMs = () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const utms: Record<string, string> = {};

            const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
            utmParams.forEach(param => {
                const value = urlParams.get(param);
                if (value) utms[param] = value;
            });

            const clickIds = ['fbclid', 'gclid', 'ttclid'];
            clickIds.forEach(param => {
                const value = urlParams.get(param);
                if (value) utms[param] = value;
            });

            if (Object.keys(utms).length > 0) {
                localStorage.setItem('quiz_utms', JSON.stringify(utms));
                console.log('✅ UTMs capturadas:', utms);
            } else {
                console.log('ℹ️ Nenhuma UTM encontrada na URL');
            }
        } catch (error) {
            console.error('❌ Erro ao capturar UTMs:', error);
        }
    };

    useEffect(() => {
        // ✅ CAPTURA UTMs ASSIM QUE A PÁGINA CARREGA
        captureUTMs();

        // Removido: tracking.pageView (gerenciado pelo Utmify)
        ga4Tracking.landingPageView();

        // Removido: scrollObserver (não necessário)
    }, []);

    const handleCTAClick = () => {
        // Removido: tracking.ctaClicked (gerenciado pelo Utmify)
        ga4Tracking.landingCTAClick();
        onNavigate('chat');
    };

    return (
        <div className="landing-container">
            <div className="matrix-bg"></div>
            <div className="scanlines"></div>

            <div className="content-wrapper">
                <main className="landing-main-simple">

                    <img
                        className="hero-whatsapp-image"
                        src="https://i.ibb.co/tMqxS6SX/wpp-dobra1.png"
                        alt="Conversación de WhatsApp"
                    />

                    <h1 className="headline-simple">
                        <span className="headline-text">Ella todavía te extraña.</span>
                    </h1>

                    <div className="hero-copy">
                        <span>Hay un momento exacto para reaparecer.</span>
                        <span>El quiz te muestra cuándo.</span>
                    </div>

                    <p className="hero-coverage">No importa si hay silencio o si hay otra persona.</p>

                    <div className="cta-section-simple">
                        <button className="cta-button-simple" onClick={handleCTAClick}>
                            <span className="cta-glow"></span>
                            <span className="cta-text">QUIERO RECUPERARLA</span>
                        </button>
                    </div>

                </main>

                {/* FOOTER MINIMALISTA */}
                <footer className="landing-footer-simple">
                    <p className="disclaimer-simple">
                        Anónimo · 2 minutos · Sin email
                    </p>
                </footer>
            </div>

            {/* CSS INLINE */}
            <style jsx="true">{`
                .landing-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    background: #ffffff;
                    overflow: hidden;
                }

                .matrix-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                }

                .scanlines {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    pointer-events: none;
                }

                .content-wrapper {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    max-width: 800px;
                    padding: 2rem;
                }

                .landing-main-simple {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1.25rem;
                    min-height: 70vh;
                    text-align: center;
                }

                .hero-whatsapp-image {
                    display: block;
                    width: min(100%, 400px);
                    height: auto;
                    max-height: 38vh;
                    object-fit: contain;
                    margin: 0 auto 0.5rem;
                    border-radius: 18px;
                }

                .hero-copy {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.15rem;
                    max-width: 90%;
                    color: #334155;
                    font-size: clamp(1.05rem, 2.5vw, 1.3rem);
                    line-height: 1.45;
                }

                .hero-coverage {
                    max-width: 90%;
                    margin: 0;
                    color: #64748b;
                    font-size: clamp(0.95rem, 2.2vw, 1.1rem);
                    line-height: 1.45;
                }

                /* ========================================
                   HEADLINE COM DESTAQUES LARANJA/AMARELO
                   ======================================== */
                .headline-simple {
                    text-align: center;
                    font-size: 2.5rem;
                    line-height: 1.3;
                    color: #fff;
                    font-weight: 700;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .alert-emoji {
                    font-size: 4rem;
                    animation: pulse 2s infinite;
                }

                .headline-text {
                    font-size: 2.2rem;
                    font-weight: 700;
                    line-height: 1.3;
                }

                .phrase-primary {
                    font-weight: 800;
                    font-size: 1.05em;
                }

                .phrase-secondary {
                    font-weight: 600;
                    font-size: 0.95em;
                    opacity: 0.9;
                }

                .highlight-orange {
                    background: linear-gradient(135deg, #FFB800 0%, #FF8C00 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-weight: 800;
                }

                .highlight-orange-italic {
                    background: linear-gradient(135deg, #FFB800 0%, #FF8C00 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-weight: 800;
                    font-style: italic;
                }

                /* ✅ NOVO - SUBTITLE */
                .subtitle-simple {
                    text-align: center;
                    font-size: 1.25rem;
                    color: rgba(255, 255, 255, 0.85);
                    line-height: 1.6;
                    margin: 0;
                    max-width: 580px;
                }

                .subtitle-simple strong {
                    color: #fff;
                    font-weight: 700;
                }

                @keyframes pulse {
                    0%, 100% { 
                        opacity: 1; 
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.7; 
                        transform: scale(1.1);
                    }
                }

                /* ========================================
                   CTA COM ANIMAÇÃO DE PULSAÇÃO
                   ======================================== */
                .cta-section-simple {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                .cta-button-simple {
                    background: #16a34a;
                    color: #ffffff;
                    border: none;
                    border-radius: 16px;
                    padding: 2rem 3rem;
                    font-size: 1.5rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 8px 24px rgba(255, 59, 59, 0.4);
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    min-width: 90%;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    animation: pulse-cta 2s ease-in-out infinite;
                }

                @keyframes pulse-cta {
                    0%, 100% { 
                        transform: scale(1);
                        box-shadow: 0 8px 24px rgba(255, 59, 59, 0.4);
                    }
                    50% { 
                        transform: scale(1.05);
                        box-shadow: 0 12px 32px rgba(255, 59, 59, 0.7);
                    }
                }

                .cta-button-simple:hover {
                    transform: translateY(-4px) scale(1.05);
                    box-shadow: 0 12px 32px rgba(255, 59, 59, 0.6);
                    animation: none;
                }

                .cta-button-simple:active {
                    transform: translateY(-2px) scale(1.02);
                }

                .cta-icon {
                    font-size: 2rem;
                }

                .cta-text {
                    position: relative;
                    z-index: 2;
                }

                .cta-glow {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    animation: glow-slide 3s infinite;
                    z-index: 1;
                }

                @keyframes glow-slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                /* FOOTER MINIMALISTA */
                .landing-footer-simple {
                    text-align: center;
                    padding: 2rem 0;
                    margin-top: 4rem;
                }

                .disclaimer-simple {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.5);
                    margin: 0;
                }

                /* RESPONSIVO */
                @media (max-width: 768px) {
                    .headline-simple {
                        font-size: 1.8rem;
                    }

                    .alert-emoji {
                        font-size: 3rem;
                    }

                    .headline-text {
                        font-size: 1.6rem;
                    }

                    .subtitle-simple {
                        font-size: 1.1rem;
                    }

                    .cta-button-simple {
                        padding: 1.5rem 2rem;
                        font-size: 1.2rem;
                        min-width: 100%;
                    }

                    .cta-icon {
                        font-size: 1.5rem;
                    }
                }

                /* Paleta oficial: mantém toda a interação e navegação intactas. */
                .landing-container { background: #ffffff; }
                .headline-simple { color: #0f172a; }
                .phrase-secondary, .subtitle-simple { color: #334155; }
                .subtitle-simple strong { color: #16a34a; }
                .highlight-orange, .highlight-orange-italic { background: none; color: #16a34a; -webkit-text-fill-color: currentColor; }
                .cta-button-simple { background: #16a34a; color: #ffffff; box-shadow: 0 8px 24px rgba(22, 163, 74, 0.25); animation: pulse-cta-clean 2s ease-in-out infinite; }
                .cta-button-simple:hover { background: #15803d; box-shadow: 0 12px 32px rgba(21, 128, 61, 0.3); animation: none; }
                @keyframes pulse-cta-clean {
                    0%, 100% { transform: scale(1); box-shadow: 0 8px 24px rgba(22, 163, 74, 0.25); }
                    50% { transform: scale(1.05); box-shadow: 0 12px 32px rgba(21, 128, 61, 0.35); }
                }
                .cta-glow { background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.18), transparent); }
                .disclaimer-simple { color: #64748b; }

                @media (max-width: 480px) {
                    .headline-text {
                        font-size: 1.4rem;
                    }

                    .subtitle-simple {
                        font-size: 1rem;
                    }

                    .hero-whatsapp-image {
                        width: min(100%, 400px);
                        max-height: 34vh;
                    }

                    .cta-button-simple {
                        width: min(90%, 360px);
                        min-width: 0;
                        padding: 1rem 2.5rem;
                        font-size: 1.1rem;
                        line-height: 1.25;
                        text-align: center;
                        flex-direction: row;
                    }
                }
            `}</style>
        </div>
    );
}
