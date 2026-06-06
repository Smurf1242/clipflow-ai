import Link from 'next/link';

const screenshots = [
  {
    title: 'Clips mode overview',
    image: '/guides/alpha/clips-overview.png',
    alt: 'ClipFlow-AI Desktop clips mode overview',
    description:
      'This is the main clipping workspace. On the left is the live preview area for your video and caption placement. On the right is the VELA AI panel, where you save your OpenAI key, choose the stream type preset, and ask VELA to analyse the video for strong moments.',
    bullets: [
      'Choose a local video file to load it into the preview player.',
      'Drag the caption directly over the preview to position it visually before export.',
      'Use the VELA AI panel to analyse roleplay-focused footage and suggest clip-worthy timestamps.',
      'Keep FFmpeg checked and ready before rendering your final clip.',
    ],
  },
  {
    title: 'Clip timing and export format',
    image: '/guides/alpha/clip-settings.png',
    alt: 'Clip settings panel showing export format, timestamp, duration, and caption text',
    description:
      'The clip settings panel controls what part of the source video is exported. This is where you choose whether you want the original full-size output or another output format, then define the exact clip range.',
    bullets: [
      'Set the start timestamp for the moment you want the clip to begin.',
      'Choose the clip duration in seconds.',
      'Edit the caption text that will be burned into the export.',
      'Use the export format selector to keep the original size or match the content format you need.',
    ],
  },
  {
    title: 'Caption styling',
    image: '/guides/alpha/caption-style.png',
    alt: 'Caption style controls for font, color, size, alignment, and position',
    description:
      'This section lets you style the caption so it fits your content and the platform you are posting to. You can make quick changes without needing a separate editor.',
    bullets: [
      'Pick a font and text color.',
      'Adjust caption size with the slider.',
      'Choose left, centre, or right alignment.',
      'Use quick position buttons or fine-tune horizontal and vertical placement with sliders.',
    ],
  },
  {
    title: 'Final export',
    image: '/guides/alpha/export-step.png',
    alt: 'Export step panel with choose output folder and render clip button',
    description:
      'When everything looks right, choose the export folder and render the finished MP4. ClipFlow-AI uses FFmpeg to create the final file locally on your machine.',
    bullets: [
      'Choose where the finished clip will be saved.',
      'Press Render Clip to create the MP4.',
      'Check the render log if you need troubleshooting information.',
    ],
  },
  {
    title: 'Livestream Studio overview',
    image: '/guides/alpha/livestream-overview.png',
    alt: 'Livestream Studio overview showing preview canvas, scenes, and capture controls',
    description:
      'Livestream Studio is the recording and streaming section of the app. The large canvas is your scene preview. From here you can switch scenes, choose the active capture target, and start recording or go live.',
    bullets: [
      'Use the scene list to switch between layouts like Starting Soon, Gameplay, and BRB.',
      'The preview canvas shows how your scene will be recorded or streamed.',
      'Use Start Recording for local recordings and Go Live when you are ready to stream.',
      'The capture target selector lets you choose the monitor or source you want to work with.',
    ],
  },
  {
    title: 'Livestream controls, sources, and audio',
    image: '/guides/alpha/livestream-controls.png',
    alt: 'Livestream Studio controls showing audio mixer, sources, chat and alerts, and encoder settings',
    description:
      'Below the canvas are the main configuration panels for building and controlling your stream layout. This is where you add sources, tune audio, choose canvas resolution, and manage hardware encoding.',
    bullets: [
      'Audio Mixer controls microphone and desktop/game audio selection and volume.',
      'Sources for this scene lets you add screen capture, window capture, game capture, and webcam layers.',
      'Capture & Output includes recording folder, canvas resolution, FPS, encoder, and bitrate settings.',
      'Selected Source Transform lets you adjust source position, width, height, and layer order precisely.',
    ],
  },
];

export const dynamic = 'force-static';

export default function AlphaGuidePage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/alpha"
            className="inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-bold transition hover:bg-white/10"
          >
            ← Back to Alpha
          </Link>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/download"
              className="inline-flex rounded-xl border border-violet-400/50 bg-violet-500/10 px-5 py-3 font-bold text-violet-100 transition hover:bg-violet-500 hover:text-white"
            >
              Alpha Download
            </Link>
            <Link
              href="/alpha"
              className="inline-flex rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 font-bold text-cyan-100 transition hover:bg-cyan-400 hover:text-black"
            >
              Apply for Access
            </Link>
          </div>
        </div>

        <section className="mb-10 overflow-hidden rounded-[2rem] border border-violet-500/30 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-cyan-500/10 p-8 shadow-2xl shadow-violet-950/30 md:p-12">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex rounded-full border border-violet-400/40 bg-black/30 px-4 py-2 text-sm font-bold text-violet-200">
              ClipFlow-AI alpha guide
            </div>
            <h1 className="mb-5 text-5xl font-black leading-tight md:text-6xl">
              Learn the app quickly with a visual walkthrough.
            </h1>
            <p className="text-lg leading-8 text-zinc-300">
              This guide shows the current alpha workflow for both the Clips tab and the Livestream Studio. Use it as a quick-start reference when testing VELA, clipping local videos, and building recording or streaming scenes.
            </p>
          </div>
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: '1. Clips workflow',
              text: 'Load a video, let VELA analyse it, style captions, and render the final clip locally.',
            },
            {
              title: '2. Livestream Studio',
              text: 'Build scenes, add sources, choose a canvas resolution, then record or go live.',
            },
            {
              title: '3. Alpha testing focus',
              text: 'Pay attention to video analysis, caption quality, source setup, audio capture, and export stability.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
              <h2 className="mb-3 text-2xl font-black">{item.title}</h2>
              <p className="leading-7 text-zinc-300">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="mb-10 rounded-[2rem] border border-cyan-400/20 bg-cyan-400/5 p-6 md:p-8">
          <h2 className="mb-4 text-3xl font-black">Quick start</h2>
          <ol className="grid gap-4 md:grid-cols-2">
            {[
              'Open the Clips tab if you want to clip a local video with captions.',
              'Open the Livestream tab if you want to record, build scenes, or test streaming layouts.',
              'In Clips mode, save your OpenAI key in the VELA panel and choose the correct AI preset for your content.',
              'In Livestream Studio, choose your capture target, audio devices, canvas resolution, and encoder before recording.',
            ].map((step, index) => (
              <li key={step} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-zinc-300">
                <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 font-black text-white">
                  {index + 1}
                </span>
                <p className="mt-3 leading-7">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="space-y-10">
          {screenshots.map((shot, index) => (
            <section
              key={shot.title}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20"
            >
              <div className="border-b border-white/10 p-6 md:p-8">
                <div className="mb-3 inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-200">
                  Step {index + 1}
                </div>
                <h2 className="text-3xl font-black md:text-4xl">{shot.title}</h2>
              </div>

              <div className="grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-3">
                  <img
                    src={shot.image}
                    alt={shot.alt}
                    className="w-full rounded-2xl"
                  />
                </div>

                <div>
                  <p className="mb-6 text-lg leading-8 text-zinc-300">{shot.description}</p>
                  <div className="space-y-3">
                    {shot.bullets.map((bullet) => (
                      <div key={bullet} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-zinc-300">
                        <span className="mr-2 text-violet-300">✓</span>
                        {bullet}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-[2rem] border border-violet-500/30 bg-gradient-to-br from-violet-500/15 via-black to-cyan-500/10 p-8 md:p-10">
          <h2 className="mb-4 text-3xl font-black">Testing notes for alpha users</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'If VELA misses a good moment, note the timestamp and content type so the tuning can be improved.',
              'If game or desktop audio does not match the correct output device, copy the recording debug log when reporting the issue.',
              'If a source, scene, or encoder behaves unexpectedly, capture a screenshot and include the exact settings used.',
              'If clip exports look right, pay special attention to caption readability, timing, and whether the output format suits the platform.',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-zinc-300">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
