import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
    request: NextRequest,
    context: { params: { id: string } }
) {
    const id = parseInt(context.params.id);
    const body = await request.json();

    try {
        const productoActualizado = await prisma.producto.update({
            where: { id },
            data: body,
        });

        return Response.json(productoActualizado);
    } catch (error) {
        console.error("Error al actualizar el producto: ", error)
        return new Response(
            JSON.stringify({ error: 'Error al actualizar producto' }),
            { status: 500 }
        );
    }
}


export async function DELETE(
    request: NextRequest,
    context: { params: { id: string } }
) {
    const id = parseInt(context.params.id);

    try {
        await prisma.producto.delete({
            where: { id },
        });

        return new Response(null, { status: 204 });
    } catch (error) {
        console.error("Error en eliminar el producto: ", error)
        return new Response(
            JSON.stringify({ error: 'Error al eliminar producto' }),
            { status: 500 }
        );
    }
}
