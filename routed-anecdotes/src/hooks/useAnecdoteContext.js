import { useContext } from "react"
import AnecdoteContext from "../AnecdoteContext"

export const useAnecdoteContext = () => useContext(AnecdoteContext)
