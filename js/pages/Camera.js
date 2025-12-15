import { h } from 'https://unpkg.com/preact@latest?module';
import { useState, useRef, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';
import { usePhotos } from '../store/PhotoStore.js';
const html = htm.bind(h);

const CameraPage = ({ onNavigate }) => {
    const { addPhoto } = usePhotos();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [facingMode, setFacingMode] = useState('user'); // 'user' or 'environment'
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);
    const [countdown, setCountdown] = useState(null);
    const [timerDuration, setTimerDuration] = useState(5);
    const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [showProposal, setShowProposal] = useState(false);
    const [isFreeMode, setIsFreeMode] = useState(false);
    const [isReviewing, setIsReviewing] = useState(false);
    const [userNote, setUserNote] = useState('');
    const [showModeSelection, setShowModeSelection] = useState(true);

    const guides = [
        { src: './assets/guide.png', name: 'Face' },
        { src: './assets/guide_profil.png', name: 'Profil' },
        { src: './assets/guide_portrait.png', name: 'Portrait' }
    ];

    const handleStart = (e) => {
        e.stopPropagation();
        setIsOverlayVisible(false);
    };

    const timerOptions = [3, 5, 10];

    const startCamera = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setError("Votre navigateur ne supporte pas l'accès à la caméra.");
            return;
        }

        try {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            const newStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: facingMode },
                audio: false
            });
            setStream(newStream);
            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
            }
            setError(null);
        } catch (err) {
            console.error("Error accessing camera:", err);
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                setError("L'accès à la caméra a été refusé. Veuillez l'autoriser dans les paramètres de votre navigateur.");
            } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                setError("Aucune caméra n'a été détectée.");
            } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
                setError("La caméra est utilisée par une autre application.");
            } else {
                setError("Erreur d'accès à la caméra : " + err.message);
            }
        }
    };

    useEffect(() => {
        startCamera();
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [facingMode]);

    // Re-attach stream when returning to camera mode (after taking a photo)
    useEffect(() => {
        if (!capturedImage && videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [capturedImage, stream]);

    const takePhoto = () => {
        // Start countdown
        setCountdown(timerDuration);
    };

    // Handle countdown logic
    useEffect(() => {
        let timer;
        if (countdown !== null && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            // Take photo when countdown reaches 0
            if (videoRef.current && canvasRef.current) {
                const video = videoRef.current;
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
    
                // Set canvas size to match video dimensions
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
    
                // Draw video frame to canvas
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
                // Get data URL
                const dataUrl = canvas.toDataURL('image/jpeg');
                setCapturedImage(dataUrl);
            }
            setCountdown(null);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const retakePhoto = () => {
        setCapturedImage(null);
    };

    const switchCamera = () => {
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    };

    const savePhoto = () => {
        // Save current photo to the list
        const newPhotos = [...photos, capturedImage];
        setPhotos(newPhotos);
        // Photos are only added to global store on final validation
        
        if (isFreeMode) {
            // In free mode, just save and continue
            setCapturedImage(null);
        } else {
            // Guided mode logic
            if (currentGuideIndex < guides.length - 1) {
                // Move to next guide
                setCurrentGuideIndex(prev => prev + 1);
                setCapturedImage(null);
            } else {
                // Finished guides, show proposal
                setCapturedImage(null);
                setShowProposal(true);
            }
        }
    };

    const handleEnterFreeMode = () => {
        setShowProposal(false);
        setIsReviewing(false);
        setIsFreeMode(true);
        startCamera(); // Restart camera stream
    };

    const handleFinishSession = () => {
        // Stop camera stream
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsReviewing(true);
    };
    
    const handleSendToAgency = async () => {
        // Save all photos to global store with category 'pola'
        for (const photo of photos) {
            await addPhoto(photo, 'pola');
        }
        alert(`Photos envoyées à l'agence avec la note : "${userNote}"`);
        onNavigate('polas');
    };

    const handleOverlayClick = () => {
        // Disabled global click to force use of the "Start" button
        // if (isOverlayVisible) {
        //     setIsOverlayVisible(false);
        // }
    };

    const handleModeSelect = (mode) => {
        if (mode === 'free') {
            setIsFreeMode(true);
        } else {
            setIsFreeMode(false);
        }
        setShowModeSelection(false);
    };

    const deletePhoto = (indexToDelete) => {
        if (confirm("Voulez-vous supprimer cette photo ?")) {
            setPhotos(prevPhotos => prevPhotos.filter((_, index) => index !== indexToDelete));
            
            // If in guided mode, we might need to adjust currentGuideIndex logic, 
            // but for simplicity in review mode, we just remove it.
            // If all photos are deleted, we could go back to camera or stay in review.
        }
    };

    return html`
        <div class="h-full bg-black relative flex flex-col animate-fade-in">
            <!-- Header Controls -->
            <div class="absolute top-0 w-full p-4 z-[60] flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                <!-- Quit Button (Global) -->
                ${countdown === null && html`
                    <button 
                        onClick=${() => {
                            if (confirm("Voulez-vous vraiment quitter ? Toutes les photos non envoyées seront perdues.")) {
                                onNavigate('polas');
                            }
                        }} 
                        class="text-white p-2 rounded-full bg-black/20 backdrop-blur-md pointer-events-auto hover:bg-black/40 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                `}
            </div>

            <!-- Main Content -->
            <div class="flex-1 relative bg-black flex items-center justify-center overflow-hidden" onClick=${handleOverlayClick}>
                
                ${showModeSelection && !capturedImage && !error && html`
                    <div class="absolute inset-0 z-40 flex flex-col items-center justify-center animate-fade-in">
                        <h2 class="text-white text-sm font-medium tracking-widest uppercase mb-12 text-white/80 drop-shadow-md">Mode de prise de vue</h2>
                        
                        <div class="flex flex-col space-y-6 w-72">
                            <button 
                                onClick=${(e) => { e.stopPropagation(); handleModeSelect('guided'); }}
                                class="bg-white text-black px-8 py-5 rounded-2xl font-bold tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] uppercase"
                            >
                                Guidé (Avec Calques)
                            </button>
                            
                            <button 
                                onClick=${(e) => { e.stopPropagation(); handleModeSelect('free'); }}
                                class="border border-white/50 text-white px-8 py-5 rounded-2xl font-bold tracking-widest hover:bg-white/10 active:scale-95 transition-transform uppercase"
                            >
                                Libre
                            </button>
                        </div>
                    </div>
                `}

                ${!showModeSelection && isOverlayVisible && !capturedImage && !error && html`
                    <div class="absolute inset-0 z-30 flex flex-col items-center justify-center">
                        <h2 class="text-white text-sm font-medium tracking-widest uppercase mb-8 text-white/80 drop-shadow-md">Retardateur</h2>
                        
                        <!-- Simple Selection Row -->
                        <div class="flex items-center space-x-8 mb-12">
                            ${timerOptions.map(opt => html`
                                <div 
                                    class="cursor-pointer transition-all duration-300 ${timerDuration === opt ? 'text-white text-5xl font-bold scale-110 drop-shadow-lg' : 'text-white/40 text-3xl font-medium hover:text-white/70'}"
                                    onClick=${(e) => { e.stopPropagation(); setTimerDuration(opt); }}
                                >
                                    ${opt}s
                                </div>
                            `)}
                        </div>

                        <button 
                            onClick=${handleStart}
                            class="bg-white text-black px-12 py-5 rounded-2xl font-bold tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            COMMENCER
                        </button>
                    </div>
                `}

                ${isReviewing && html`
                    <div class="absolute inset-0 z-50 bg-black flex flex-col overflow-y-auto animate-fade-in">
                        <div class="p-6 pb-24 pt-20">
                            
                            <!-- Photos Grid -->
                            <div class="grid grid-cols-2 gap-4 mb-8">
                                ${photos.map((photo, index) => html`
                                    <div class="aspect-[3/4] rounded-lg overflow-hidden relative border border-white/20 group">
                                        <img src="${photo}" class="w-full h-full object-cover" />
                                        
                                        <!-- Delete Button -->
                                        <button 
                                            onClick=${(e) => { e.stopPropagation(); deletePhoto(index); }}
                                            class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Supprimer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>

                                        <div class="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm p-1 text-center">
                                            <span class="text-white text-xs font-medium uppercase tracking-wider">
                                                ${index < guides.length ? guides[index].name : `Libre ${index - guides.length + 1}`}
                                            </span>
                                        </div>
                                    </div>
                                `)}
                                
                                <!-- Add Photo Card -->
                                <button 
                                    onClick=${() => { setIsReviewing(false); handleEnterFreeMode(); }}
                                    class="aspect-[3/4] rounded-lg border-2 border-dashed border-white/30 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 active:scale-95 transition group"
                                >
                                    <div class="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center group-hover:border-white group-hover:scale-110 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white/50 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </button>
                            </div>

                            <!-- Note Input -->
                            <div class="mb-8">
                                <label class="block text-white/60 text-sm font-medium mb-2 uppercase tracking-wide">Ajouter une note (optionnel)</label>
                                <textarea 
                                    class="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition resize-none h-32"
                                    placeholder="Un commentaire pour l'agence..."
                                    onInput=${(e) => setUserNote(e.target.value)}
                                    value=${userNote}
                                ></textarea>
                            </div>

                            <!-- Send Button -->
                            <button 
                                onClick=${handleSendToAgency}
                                class="w-full bg-white text-black py-5 rounded-2xl font-bold tracking-widest text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)] mb-4"
                            >
                                ENVOYER À L'AGENCE
                            </button>
                        </div>
                    </div>
                `}

                ${showProposal && !capturedImage && !isReviewing && html`
                    <div class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
                        <h2 class="text-white text-xl font-bold tracking-widest uppercase mb-12 text-center px-6 leading-relaxed">
                            Voulez-vous ajouter d'autres polas<br/>sans calque ?
                        </h2>
                        
                        <button 
                            onClick=${handleEnterFreeMode}
                            class="bg-white text-black px-8 py-5 rounded-2xl font-bold tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-6 w-72"
                        >
                            AJOUTER (MODE LIBRE)
                        </button>

                        <button 
                            onClick=${handleFinishSession}
                            class="text-white border border-white/30 px-8 py-5 rounded-2xl font-medium tracking-widest hover:bg-white/10 active:scale-95 transition w-72"
                        >
                            TERMINER LA SESSION
                        </button>
                    </div>
                `}

                ${!isOverlayVisible && !capturedImage && !error && !showProposal && !isFreeMode && !showModeSelection && html`
                    <div class="absolute inset-0 z-10 flex items-end justify-center pointer-events-none opacity-50 overflow-hidden">
                        <img src="${guides[currentGuideIndex].src}" class="h-[110%] w-[110%] max-w-none object-contain object-bottom mb-[-5%]" />
                    </div>
                `}
                
                ${isFreeMode && !capturedImage && !error && countdown === null && html`
                     <div class="absolute top-20 w-full text-center z-20 pointer-events-none">
                        <span class="bg-primary/80 text-white px-4 py-1 rounded-full text-sm font-bold backdrop-blur-sm uppercase tracking-widest shadow-lg">
                            MODE LIBRE
                        </span>
                    </div>
                    <div class="absolute top-4 right-4 z-30">
                         <button onClick=${handleFinishSession} class="text-white text-xs font-bold border border-white/50 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md">
                            TERMINER
                        </button>
                    </div>
                `}

                ${countdown !== null && html`
                    <div class="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                        <div class="text-white text-[10rem] font-bold font-mono tracking-tighter animate-pulse drop-shadow-2xl">${countdown > 0 ? countdown : ''}</div>
                    </div>
                `}
                
                ${error 
                    ? html`
                        <div class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black p-6 text-center animate-fade-in">
                            <div class="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                            </div>
                            <h3 class="text-white text-xl font-bold mb-3">Accès Caméra Requis</h3>
                            <p class="text-white/60 mb-8 max-w-xs leading-relaxed">${error}</p>
                            
                            <button 
                                onClick=${startCamera}
                                class="bg-white text-black px-8 py-4 rounded-2xl font-bold tracking-widest hover:scale-105 active:scale-95 transition shadow-[0_0_20px_rgba(255,255,255,0.2)] mb-4 w-full max-w-xs"
                            >
                                RÉESSAYER
                            </button>
                            
                            <button 
                                onClick=${() => onNavigate('polas')}
                                class="text-white/40 hover:text-white text-sm font-medium tracking-wide uppercase transition py-2"
                            >
                                Retour
                            </button>
                        </div>
                    `
                    : capturedImage 
                        ? html`<img src="${capturedImage}" class="w-full h-full object-cover" />`
                        : html`<video ref=${videoRef} autoPlay playsInline muted class="w-full h-full object-cover transform ${facingMode === 'user' ? '-scale-x-100' : ''} transition-all duration-500 ${isOverlayVisible ? 'blur-lg' : ''}"></video>`
                }
                <canvas ref=${canvasRef} class="hidden"></canvas>
            </div>

            <!-- Footer Controls -->
            ${!isReviewing && !showProposal && !isOverlayVisible && !showModeSelection && html`
                <div class="bg-black p-8 pb-10 flex justify-center items-center space-x-12 relative z-20 ${countdown !== null ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300">
                    ${capturedImage 
                        ? html`
                            <button onClick=${savePhoto} class="text-white font-bold px-8 py-3 rounded-full bg-primary hover:bg-primary/90 shadow-lg transform active:scale-95 transition flex items-center space-x-2">
                                <span>${isFreeMode ? 'Photo suivante' : (currentGuideIndex < guides.length - 1 ? 'Photo suivante' : 'Terminer')}</span>
                                ${isFreeMode || (currentGuideIndex < guides.length - 1) 
                                    ? html`
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    `
                                    : html`
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    `
                                }
                            </button>
                        `
                        : html`
                            <div class="w-12"></div> <!-- Spacer -->
                            <button onClick=${takePhoto} class="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1 cursor-pointer active:scale-95 transition">
                                <div class="w-full h-full bg-white rounded-full"></div>
                            </button>
                            <div class="w-12"></div> <!-- Spacer to balance layout since we removed the thumbnail -->
                        `
                    }
                </div>
            `}
        </div>
    `;
};

export default CameraPage;