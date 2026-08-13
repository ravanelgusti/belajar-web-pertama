import { Link } from 'react-router-dom'
import daftarProduk from './dataProduk'

function Katalog({ keranjang, setKeranjang }) {
  function tambahKeKeranjang(produk) {
    setKeranjang([...keranjang, produk])
  }

  function formatRupiah(angka) {
    return 'Rp' + angka.toLocaleString('id-ID')
  }

  return (
    <div className="max-w-4xl mx-auto my-6 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Katalog Produk</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {daftarProduk.map((produk) => (
          <div key={produk.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Link to={`/produk/${produk.id}`}>
              <img src={produk.gambar} alt={produk.nama} className="w-full h-32 object-cover" />
            </Link>
            <div className="p-3">
              <Link to={`/produk/${produk.id}`}>
                <h3 className="text-sm font-semibold text-gray-800 hover:text-indigo-600">
                  {produk.nama}
                </h3>
              </Link>
              <p className="text-indigo-600 font-bold text-sm mt-1">
                {formatRupiah(produk.harga)}
              </p>
              <button
                className="w-full mt-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-md"
                onClick={() => tambahKeKeranjang(produk)}
              >
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Katalog