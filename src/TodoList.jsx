import { useState, useEffect } from 'react'

function TodoList() {
  const [tugas, setTugas] = useState(() => {
    const dataTersimpan = localStorage.getItem('daftarTugas')
    return dataTersimpan ? JSON.parse(dataTersimpan) : []
  })
  const [inputTeks, setInputTeks] = useState('')
  const [indexSedangEdit, setIndexSedangEdit] = useState(null)
  const [teksEdit, setTeksEdit] = useState('')

  useEffect(() => {
    localStorage.setItem('daftarTugas', JSON.stringify(tugas))
  }, [tugas])

  function tambahTugas() {
  if (inputTeks.trim() === '') return
  setTugas([...tugas, { teks: inputTeks, selesai: false }])
  setInputTeks('')
}

  function hapusTugas(indexYangDihapus) {
    const tugasBaru = tugas.filter((item, index) => index !== indexYangDihapus)
    setTugas(tugasBaru)
  }
   function toggleSelesai(indexYangDiklik) {
    const tugasBaru = tugas.map((item, index) =>
      index === indexYangDiklik ? { ...item, selesai: !item.selesai } : item
    )
    setTugas(tugasBaru)
  }
  function mulaiEdit(index) {
    setIndexSedangEdit(index)
    setTeksEdit(tugas[index].teks)
  }
  function simpanEdit(index) {
    const tugasBaru = tugas.map((item, i) =>
      i === index ? { ...item, teks: teksEdit } : item
    )
    setTugas(tugasBaru)
    setIndexSedangEdit(null)
  }

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

      <ul className="list-none p-0 m-0">
        {tugas.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0"
          >
            <input
              type="checkbox"
              checked={item.selesai}
              onChange={() => toggleSelesai(index)}
            />

            {indexSedangEdit === index ? (
              <>
                <input
                  className="flex-1 px-2 py-1 border border-gray-300 rounded-md text-sm"
                  type="text"
                  value={teksEdit}
                  onChange={(e) => setTeksEdit(e.target.value)}
                />
                <button
                  className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md"
                  onClick={() => simpanEdit(index)}
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
              onClick={() => mulaiEdit(index)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md"
              onClick={() => hapusTugas(index)}
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