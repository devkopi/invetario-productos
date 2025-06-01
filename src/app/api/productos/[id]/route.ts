import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

// PUT: Actualizar producto
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = parseInt(context.params.id);
    const body = await request.json();

    const productoActualizado = await prisma.producto.update({
      where: { id },
      data: body,
    });

    return new Response(JSON.stringify(productoActualizado), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar producto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE: Eliminar producto
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = parseInt(context.params.id);

    await prisma.producto.delete({
      where: { id },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar producto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
