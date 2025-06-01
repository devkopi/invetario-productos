import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const body = await request.json();

        const productoActualizado = await prisma.producto.update({
            where: { id },
            data: {
                nombre: body.nombre,
                precio: parseFloat(body.precio),
                stock: parseInt(body.stock),
                categoria: body.categoria,
            },
        });

        return NextResponse.json(productoActualizado);
    } catch (error) {
        console.error("Error al actualizar producto", error);
        return NextResponse.json({ error: "Error al actualizar producto" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        //  Primero se espera el parametro
        const { id } = await params;  

        const parsedId = parseInt(id);  // Convertimos el id a número
        await prisma.producto.delete({
            where: { id: parsedId },
        });

        return NextResponse.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 });
    }
}
