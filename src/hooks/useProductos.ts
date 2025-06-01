import { useEffect, useState } from "react";
import { Producto } from "@/types/types";

export function useProductos() {
    const [productos, setProductos] = useState<Producto[]>([])

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await fetch('/api/productos')
                const data = await res.json()
                console.log('DATA:', data)
                setProductos(data)
            } catch (error) {
                console.error('Error al cargar productos', error)
            }
        }

        fetchProductos()
    }, [])

    return { productos, setProductos}
}