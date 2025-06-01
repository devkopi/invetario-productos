import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    try {
        const id = parseInt(context.params.id);
        const body = await req.json();

        const productoActualizado = await prisma.producto.update({
            where: { id },
            data: body,
        });

        return Response.json(productoActualizado);
    } catch (error) {
        console.error("Error al actualizar producto: ", error)
        return new Response(JSON.stringify({ error: 'Error al actualizar producto' }), {
            status: 500,
        });
    }
}


export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = parseInt(context.params.id);

    await prisma.producto.delete({
      where: { id },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error al eliminar producto:', error);

    return new Response(
      JSON.stringify({ error: 'Error al eliminar producto' }),
      { status: 500 }
    );
  }
}

