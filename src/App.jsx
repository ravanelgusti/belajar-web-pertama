import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'
import TodoList from './TodoList'
import Katalog from './Katalog'
import Keranjang from './Keranjang'
import DetailProduk from './DetailProduk'

function App() {
  const [keranjang, setKeranjang] = useState([])

  return (
    <BrowserRouter>
      <nav className="flex gap-4 justify-center items-center py-4 bg-gray-100">
        <Link to="/" className="text-indigo-600 font-semibold hover:underline">
          Home
        </Link>
        <Link to="/about" className="text-indigo-600 font-semibold hover:underline">
          About
        </Link>
        <Link to="/todo" className="text-indigo-600 font-semibold hover:underline">
          Todo List
        </Link>
        <Link to="/katalog" className="text-indigo-600 font-semibold hover:underline">
  Katalog
</Link>
<Link to="/keranjang" className="text-indigo-600 font-semibold hover:underline">
  Keranjang 🛒 ({keranjang.length})
</Link>
      </nav>

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/todo" element={<TodoList />} />
  <Route
    path="/katalog"
    element={<Katalog keranjang={keranjang} setKeranjang={setKeranjang} />}
  />
  <Route
    path="/keranjang"
    element={<Keranjang keranjang={keranjang} setKeranjang={setKeranjang} />}
  />
  <Route
  path="/produk/:id"
  element={<DetailProduk keranjang={keranjang} setKeranjang={setKeranjang} />}
/>
</Routes>
    </BrowserRouter>
  )
}

export default App