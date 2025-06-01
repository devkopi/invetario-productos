import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const id = parseInt(context.params.id);
  const body = await request.json();

  const productoActualizado = await prisma.producto.update({
    where: { id },
    data: body,
  });

  return new Response(JSON.stringify(productoActualizado), {
    headers: { 'Content-Type': 'application/json' },
  });
}


export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const id = parseInt(context.params.id);

  await prisma.producto.delete({
    where: { id },
  });

  return new Response(null, { status: 204 });
}

