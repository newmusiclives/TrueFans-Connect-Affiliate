import { QRCodeSVG } from 'qrcode.react'
import { Download, Share2, DollarSign } from 'lucide-react'
import { format } from 'date-fns'

interface ShowQRCodeProps {
  show: {
    id: string
    venue_name: string
    datetime: string
    qr_code: string
    venue_location: {
      city: string
      region: string
    }
  }
  musicianName: string
}

export function ShowQRCode({ show, musicianName }: ShowQRCodeProps) {
  const qrUrl = `${window.location.origin}/tip/show/${show.qr_code}`

  const downloadQR = () => {
    const svg = document.getElementById(`qr-${show.id}`)
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      
      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = `${musicianName}-${show.venue_name}-QR.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  const shareShow = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tip ${musicianName} at ${show.venue_name}`,
          text: `Support ${musicianName} live! Scan the QR code or visit:`,
          url: qrUrl
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(qrUrl)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{show.venue_name}</h3>
        <p className="text-gray-600">
          {format(new Date(show.datetime), 'EEEE, MMMM d @ h:mm a')}
        </p>
        <p className="text-gray-500 text-sm">
          {show.venue_location.city}, {show.venue_location.region}
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-inner mb-4">
        <QRCodeSVG
          id={`qr-${show.id}`}
          value={qrUrl}
          size={256}
          level="H"
          includeMargin={false}
          className="mx-auto"
          imageSettings={{
            src: '/logo.png',
            x: undefined,
            y: undefined,
            height: 40,
            width: 40,
            excavate: true,
          }}
        />
      </div>

      <div className="bg-purple-100 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center text-purple-800">
          <DollarSign className="w-5 h-5 mr-2" />
          <span className="font-semibold">Fans scan to tip instantly!</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={downloadQR}
          className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </button>
        <button
          onClick={shareShow}
          className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        Project this QR code during your performance
      </p>
    </div>
  )
}
