'use client';

import React, { useState } from 'react';
import FormularioProducto from '@/components/FormularioProducto';
import type { Producto } from '@/types/types';
import TablaProductos from '@/components/TablaProducto';

export default function InventoryPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoEnEdicion, setProductoEnEdicion] = useState<Producto | null>(null);

  const handleSubmit = (producto: Producto) => {
    if (productoEnEdicion) {
      const actualizados = productos.map((p) =>
        p.id === producto.id ? producto : p
      );
      setProductos(actualizados);
      setProductoEnEdicion(null);
    } else {
      setProductos((prev) => [...prev, producto]);
    }
  };

  const handleEdit = (producto: Producto) => {
    setProductoEnEdicion(producto);
  };

  const handleDelete = (id: number) => {
    setProductos((prev) => prev.filter((producto) => producto.id !== id));
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventario de Productos</h1>

      <FormularioProducto
        onSubmit={handleSubmit}
        productoEnEdicion={productoEnEdicion}
      />

      <TablaProductos
        productos={productos}
        onEdit={handleEdit}
        onDelete={handleDelete} 
      />
      
    </main>
  );
}
