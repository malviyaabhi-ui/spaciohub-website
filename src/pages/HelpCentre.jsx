import { useEffect } from 'react'

export default function HelpCentre() {
  useEffect(() => {
    window.location.replace('https://go.spaciohub.com/Help')
  }, [])
  return null
}
