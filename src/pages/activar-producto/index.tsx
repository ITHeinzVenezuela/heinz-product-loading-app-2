import Header from '@/components/widgets/Header/Header'
import useAuth from '@/hooks/useAuth'
import React from 'react'

const ActivateProduct = () => {
  
  const [renderPage, credentials] = useAuth({})
  
  return (
    renderPage &&
    <div className="SelectEmployees Layout">
      <Header />
      <main className="pt-10 xl:px-80">
        <section className="">
          <label htmlFor="" className="Input">
            <h1 className="pb-4 text-xl sm:text-3xl font-bold">Activar Producto</h1>
            <div className="grid" style={{ gridTemplateColumns: "1fr auto" }}>
              <input type="text" />
              <button className="bg-secondary p-5 rounded-r-xl hover:bg-blue-800 transition-all  items-center">
                {/* <img width={20} src="https://cdn-icons-png.flaticon.com/512/1/1228.png" alt="" /> */}
                <span className="text-white font-bold text-base sm:text-lg">Activar</span>
              </button>
            </div>
          </label>
        </section>
      </main>
    </div>
  )
}

export default ActivateProduct