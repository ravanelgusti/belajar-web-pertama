import { useState } from 'react'
import './Sapaan.css'

function Sapaan(props) {
  const [suka, setSuka] = useState(0)
  const sudahPopuler = suka >= 5

  return (
    <div className="kotak-sapaan">
        <p style={{ color: 'Green', fontWeight: 'bold' }}>
  Selamat datang di React, {props.nama}!
</p>
      <button 
      className="tombol-suka" style={{ backgroundColor: sudahPopuler ? 'red' : '#646cff' }}
        onClick={() => setSuka(suka + 1)}
      >
        👍 Suka ({suka})
      </button>
      {sudahPopuler && <p>🔥 Postingan ini populer!</p>}
    </div>
  )
}

export default Sapaan