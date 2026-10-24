// Subtle Web Audio Haptic & UI Sound Synthesis (riseof.digital inspired)

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function toggleSound(enabled?: boolean) {
  if (enabled !== undefined) {
    soundEnabled = enabled;
  } else {
    soundEnabled = !soundEnabled;
  }
  if (soundEnabled) {
    playFloorClick();
  }
  return soundEnabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}

function getAudioContext() {
  if (!audioCtx && typeof window !== "undefined") {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playFloorClick() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(920, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.045, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch (e) {
    // Ignore audio context errors if browser blocked autoplay
  }
}

export function playSwoosh() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    // Ignore
  }
}

/**
 * Synthesizes an acoustic test pulse comparing an untreated reverberant space (RT60 1.4s)
 * vs. a DBH acoustic baffle-treated space (NRC 0.88 / RT60 0.32s).
 */
export function playAcousticDemo(mode: "untreated" | "treated") {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (mode === "treated") {
      // Crisp, warm, tightly damped studio tone (0.28s decay, zero slap-back echo)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(528, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.22);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } else {
      // Untreated concrete/glass room: harsher metallic reflections with multi-tap slap-back echoes
      const delays = [0, 0.09, 0.19, 0.31, 0.45, 0.62, 0.82, 1.05];
      delays.forEach((delay, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx % 2 === 0 ? "triangle" : "sine";
        const freq = 528 + (idx % 3) * 18;
        osc.frequency.setValueAtTime(freq, now + delay);

        const amp = 0.11 * Math.pow(0.62, idx);
        gain.gain.setValueAtTime(amp, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + delay + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.24);
      });
    }
  } catch (e) {
    // Ignore
  }
}

/**
 * Synthesizes a subtle electrochromic liquid-crystal switching sound
 */
export function playSmartGlassSwitch(frosted: boolean) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    if (frosted) {
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(290, now + 0.14);
    } else {
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.14);
    }

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  } catch (e) {
    // Ignore
  }
}
