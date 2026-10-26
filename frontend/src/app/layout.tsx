import './globals.css'

export const metadata = {
  title: 'ULTORN | Your sovereign shield for the African security network',
  description: 'West African-owned cybersecurity and digital-trust infrastructure, by Utachi Industries.',
}

// Applied before first paint so a saved dark preference never flashes light.
// Utachi's ink-on-paper system is light by default; dark is the opt-in state.
const THEME_BOOTSTRAP = `(function(){try{var t=localStorage.getItem('ultorn_theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Space+Grotesk:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
