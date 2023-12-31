import { useEffect, useState } from 'react'

export const useCart = () => {
  const [count, setCount] = useState(0)
  const [cart, setCart] = useState(() => {
    const storedCart = window.localStorage.getItem('cart')
    if (storedCart) return JSON.parse(storedCart)
    return []
  })

  useEffect(() => {
    if (cart) setCount(() => (
      cart.reduce((sum, item) => sum + item.count, 0)
    ))
  }, [cart])

  const add = item => {
    let updatedCart = []
    const foundIndex = cart.findIndex(p => p.name === item.name)

    if (foundIndex !== -1) {
      updatedCart = cart.map((p, i) => i === foundIndex ? { ...p, count: p.count + 1 } : p)
    } else updatedCart = [...cart, { ...item, count: 1 }]

    window.localStorage.setItem('cart', JSON.stringify(updatedCart))
    return setCart([...updatedCart])
  }

  const remove = item => {
    let updatedCart = []
    const foundIndex = cart.findIndex(p => p.name === item.name)

    if (cart[foundIndex].count === 1) updatedCart = cart.filter(p => p.name !== item.name)
    else if (foundIndex !== -1) updatedCart = cart.map((p, i) => i === foundIndex ? { ...p, count: p.count - 1 } : p)

    window.localStorage.setItem('cart', JSON.stringify(updatedCart))
    return setCart([...updatedCart])
  }

  return { cart, count, add, remove }
}
