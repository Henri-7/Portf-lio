export function Arrow({ direction = 'diagonal', className = '' }: { direction?: 'diagonal' | 'right' | 'down' | 'left'; className?: string }) {
  const paths = {
    diagonal: 'M5 19 19 5M5 5h14v14',
    right: 'M4 12h16m-7-7 7 7-7 7',
    down: 'M12 4v16m-7-7 7 7 7-7',
    left: 'M20 12H4m7-7-7 7 7 7',
  }
  return <svg className={`arrow ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[direction]} /></svg>
}

export function GithubIcon() {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7m12 5v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.5 6a4.3 4.3 0 0 0-.1-3.5S17.4 2.2 15 3.8a12 12 0 0 0-6 0C6.6 2.2 5.6 2.5 5.6 2.5A4.3 4.3 0 0 0 5.5 6a4.7 4.7 0 0 0-1.2 3.6c0 4.7 2.8 5.7 5.5 6A3 3 0 0 0 9 18v3.3" /></svg>
}
