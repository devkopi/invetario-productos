import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const productos = await prisma.producto.findMany()
        console.log('PRODUCTOS DESDE BACKEND:', productos)
        return NextResponse.json(productos)
    } catch (error) {
        console.error("Error al obtener productos", error)
        return NextResponse.json({ error: 'Error al obtener productos'}, { status: 500})
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { nombre, precio, stock, categoria } = body

        const nuevoProducto = await prisma.producto.create({
            data: {
                nombre,
                precio: parseFloat(precio),
                stock: parseInt(stock),
                categoria,
            }
        })

        return NextResponse.json(nuevoProducto)
    } catch (error) {
        console.error("Error al crear productos", error)
        return NextResponse.json({error: 'Error al crear producto'}, { status: 500})
    }
}