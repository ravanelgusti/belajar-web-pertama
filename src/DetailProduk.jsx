import { useParams, Link } from 'react-router-dom'
import daftarProduk from './dataProduk'

function DetailProduk({ keranjang, setKeranjang }) {
  const { id } = useParams()
  const produk = daftarProduk.find((item) => item.id === Number(id))

  function formatRupiah(angka) {
    return 'Rp' + angka.toLocaleString('id-ID')
  }

  function tambahKeKeranjang() {
    setKeranjang([...keranjang, produk])
  }

  if (!produk) {
    return (
      <div className="max-w-md mx-auto my-10 p-6 text-center">
        <p className="text-gray-500">Produk tidak ditemukan.</p>
        <Link to="/katalog" className="text-indigo-600 hover:underline mt-2 inline-block">
          Kembali ke Katalog
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto my-6 p-6">
      <Link to="/katalog" className="text-indigo-600 text-sm hover:underline">
        ← Kembali ke Katalog
      </Link>

      <img
        src={produk.gambar}
        alt={produk.nama}
        className="w-full h-64 object-cover rounded-lg mt-3"
      />

      <h1 className="text-xl font-bold text-gray-800 mt-4">{produk.nama}</h1>
      <p className="text-indigo-600 font-bold text-lg mt-1">{formatRupiah(produk.harga)}</p>
      <p className="text-gray-600 text-sm mt-3">{produk.deskripsi}</p>

      <button
        className="w-full mt-5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md"
        onClick={tambahKeKeranjang}
      >
        Tambah ke Keranjang
      </button>
    </div>
  )
}

export default DetailProduk