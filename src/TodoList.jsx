import { useState, useEffect } from 'react'

function TodoList() {
  const [tugas, setTugas] = useState(() => {
    const dataTersimpan = localStorage.getItem('daftarTugas')
    return dataTersimpan ? JSON.parse(dataTersimpan) : []
  })
  const [inputTeks, setInputTeks] = useState('')
  const [idSedangEdit, setIdSedangEdit] = useState(null)
  const [teksEdit, setTeksEdit] = useState('')
  const [filterAktif, setFilterAktif] = useState('semua')

  useEffect(() => {
    localStorage.setItem('daftarTugas', JSON.stringify(tugas))
  }, [tugas])

  function tambahTugas() {
    if (inputTeks.trim() === '') return
    const tugasBaru = {
      id: Date.now(), // ID unik, dibuat dari waktu saat ini
      teks: inputTeks,
      selesai: false,
    }
    setTugas([...tugas, tugasBaru])
    setInputTeks('')
  }

  function hapusTugas(idYangDihapus) {
    const tugasBaru = tugas.filter((item) => item.id !== idYangDihapus)
    setTugas(tugasBaru)
  }

  function toggleSelesai(idYangDiklik) {
    const tugasBaru = tugas.map((item) =>
      item.id === idYangDiklik ? { ...item, selesai: !item.selesai } : item
    )
    setTugas(tugasBaru)
  }

  function mulaiEdit(id, teksSekarang) {
    setIdSedangEdit(id)
    setTeksEdit(teksSekarang)
  }

  function simpanEdit(id) {
    const tugasBaru = tugas.map((item) =>
      item.id === id ? { ...item, teks: teksEdit } : item
    )
    setTugas(tugasBaru)
    setIdSedangEdit(null)
  }

  const tugasTampil = tugas.filter((item) => {
    if (filterAktif === 'selesai') return item.selesai === true
    if (filterAktif === 'belum') return item.selesai === false
    return true
  })

  return (
    <div className="max-w-md mx-auto my-6 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Tugas</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          type="text"
          value={inputTeks}
          onChange={(e) => setInputTeks(e.target.value)}
          placeholder="Tulis tugas baru..."
        />
        <button
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md"
          onClick={tambahTugas}
        >
          Tambah
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 text-sm rounded-md ${
            filterAktif === 'semua' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setFilterAktif('semua')}
        >
          Semua
        </button>
        <button
          className={`px-3 py-1 text-sm rounded-md ${
            filterAktif === 'belum' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setFilterAktif('belum')}
        >
          Belum Selesai
        </button>
        <button
          className={`px-3 py-1 text-sm rounded-md ${
            filterAktif === 'selesai' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setFilterAktif('selesai')}
        >
          Selesai
        </button>
      </div>

      <ul className="list-none p-0 m-0">
        {tugasTampil.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0"
          >
            <input
              type="checkbox"
              checked={item.selesai}
              onChange={() => toggleSelesai(item.id)}
            />

            {idSedangEdit === item.id ? (
              <>
                <input
                  className="flex-1 px-2 py-1 border border-gray-300 rounded-md text-sm"
                  type="text"
                  value={teksEdit}
                  onChange={(e) => setTeksEdit(e.target.value)}
                />
                <button
                  className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md"
                  onClick={() => simpanEdit(item.id)}
                >
                  Simpan
                </button>
              </>
            ) : (
              <span
                className={`flex-1 text-sm ${
                  item.selesai ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {item.teks}
              </span>
            )}

            <button
              className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 text-sm rounded-md"
              onClick={() => mulaiEdit(item.id, item.teks)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md"
              onClick={() => hapusTugas(item.id)}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList