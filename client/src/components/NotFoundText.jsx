import React from 'react'

export default function NotFoundText({text,visible}) {
    if(!visible) return null;
  return (
    <h1 className="text-2xl font-semibold text-highlight-dark py-5 opacity-50">{text}</h1>
  )
}
