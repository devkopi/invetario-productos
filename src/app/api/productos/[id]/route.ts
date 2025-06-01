import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const productoActualizado = await prisma.producto.update({
      where: { id },
      data: body,
    });

    return new Response(JSON.stringify(productoActualizado), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error al actualizar producto:', mensaje);
    return new Response(JSON.stringify({ error: 'Error al actualizar producto', detalle: mensaje }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const id = parseInt((await context.params).id);

    await prisma.producto.delete({
      where: { id },
    });

    return new Response(null, { status: 204 });
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error al eliminar producto:', mensaje);
    return new Response(JSON.stringify({ error: 'Error al eliminar producto', detalle: mensaje }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}