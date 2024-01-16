import React from 'react'
import Link from 'next/link'

const Aside = () => {
  return (
    <aside>
      <section>
        <h2>Comprar Colados</h2>
        <ul>
          <li>
            <Link href="/">Colados Kidz</Link>
          </li>
          <li>
            <Link href="/">Colados 100%</Link>
          </li>
        </ul>
      </section>
      <hr />
      <section>
        <h2>Ud. Seleccionó</h2>
        <ul>
          <li>
            <Link href="/">Marca Heinz</Link>
          </li>
        </ul>
      </section>
      <hr />
      <section>
        <h2>Filtre Resultados por:</h2>
        <ul>
          <li>
            <Link href="/">Bs 0 - Bs 300</Link>
          </li>
          <li>
            <Link href="/">Bs 400 - Bs 600</Link>
          </li>
          <li>
            <Link href="/">Bs 700 - Bs 900</Link>
          </li>
          <li>
            <Link href="/">Bs 1000</Link>
          </li>
        </ul>
      </section>
    </aside>
  )
}

export default Aside