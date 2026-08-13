function Keranjang({ keranjang, setKeranjang }) {
  function formatRupiah(angka) {
    return 'Rp' + angka.toLocaleString('id-ID')
  }

  // Gabungkan produk yang sama jadi satu baris dengan jumlah (qty)
  const produkTerkelompok = []
  keranjang.forEach((produk) => {
    const sudahAda = produkTerkelompok.find((item) => item.id === produk.id)
    if (sudahAda) {
      sudahAda.qty += 1
    } else {
      produkTerkelompok.push({ ...produk, qty: 1 })
    }
  })

  function tambahQty(id) {
    const produkAsli = keranjang.find((item) => item.id === id)
    setKeranjang([...keranjang, produkAsli])
  }

  function kurangiQty(id) {
    const indexPertama = keranjang.findIndex((item) => item.id === id)
    if (indexPertama === -1) return
    const keranjangBaru = keranjang.filter((_, index) => index !== indexPertama)
    setKeranjang(keranjangBaru)
  }

  function hapusSemua(id) {
    setKeranjang(keranjang.filter((item) => item.id !== id))
  }

  const totalHarga = keranjang.reduce((total, item) => total + item.harga, 0)

  if (keranjang.length === 0) {
    return (
      <div className="max-w-md mx-auto my-10 p-6 text-center">
        <p className="text-gray-500">Keranjang kamu masih kosong 🛒</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto my-6 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Keranjang Belanja</h1>

      <div className="flex flex-col gap-3">
        {produkTerkelompok.map((item) => (
          <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
            <img src={item.gambar} alt={item.nama} className="w-16 h-16 object-cover rounded-md" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800">{item.nama}</h3>
              <p className="text-indigo-600 font-bold text-sm">{formatRupiah(item.harga)}</p>

              <div className="flex items-center gap-2 mt-1">
                <button
                  className="w-6 h-6 bg-gray-200 rounded text-sm"
                  onClick={() => kurangiQty(item.id)}
                >
                  -
                </button>
                <span className="text-sm">{item.qty}</span>
                <button
                  className="w-6 h-6 bg-gray-200 rounded text-sm"
                  onClick={() => tambahQty(item.id)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="text-red-500 text-xs hover:underline"
              onClick={() => hapusSemua(item.id)}
            >
              Hapus
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
        <span className="font-semibold text-gray-800">Total</span>
        <span className="font-bold text-lg text-indigo-600">{formatRupiah(totalHarga)}</span>
      </div>
    </div>
  )
}

export default Keranjang