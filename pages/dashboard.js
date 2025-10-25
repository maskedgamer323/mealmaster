import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [recipes, setRecipes] = useState([])
  useEffect(() => {
    const prefs = JSON.parse(localStorage.getItem('prefs') || '{}')
    const pantry = localStorage.getItem('pantry')
    // fake recipe list – swap with Spoonacular call
    const fake = [
      { id: 1, title: 'Thai Green Curry', time: 45, rating: 4.9, image: 'https://source.unsplash.com/400x300/?curry' },
