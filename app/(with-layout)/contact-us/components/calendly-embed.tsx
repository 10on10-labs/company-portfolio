'use client';

export function CalendlyEmbed() {
  return (
    <div className="bg-card border border-border p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Schedule a Meeting</h2>
      <div
        className="calendly-inline-widget"
        data-url="YOUR_CALENDLY_URL"
        style={{ minWidth: '320px', height: '600px' }}
      />
      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      ></script>
    </div>
  );
}
