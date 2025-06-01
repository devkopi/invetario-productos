'use client';

import React, { useState } from 'react';
import FormularioProducto from '@/components/FormularioProducto';
import type { Producto } from '@/types/types';
import TablaProductos from '@/components/TablaProducto';
import { useProductos } from '@/hooks/useProductos';

export default function InventoryPage() {
  const { productos, setProductos } = useProductos()
  const [productoEnEdicion, setProductoEnEdicion] = useState<Producto | null>(null);

  // Recibimos un objeto producto con los datos del formulario
  const handleSubmitProducto = async (producto: Producto) => {
    try {
      // Si está en productoEnEdicion se está editando -> usa PUT, sino usa POST (crear producto)
      const metodo = productoEnEdicion ? "PUT" : "POST";
      const endpoint = productoEnEdicion
        // Si se edita se manda la petición al producto con su ID
        ? `/api/productos/${producto.id}`
        // Si se está creando, manda el endpoint general
        : "/api/productos"; 

      // Usamos fetch para enviar datos a la API 
      const res = await fetch(endpoint, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        // Pasa de ser un objeto a -> string
        body: JSON.stringify(producto),
      });

      const data = await res.json();

      // Se verifica si el servidor respondió con un código 200-299
      if (!res.ok) {
        // En caso de que no, se muestra un error en la consola
        console.error("Error al guardar producto", data);
        return;
      }

      if (productoEnEdicion) {
        // Editamos en la lista
        setProductos((prev) =>
          prev.map((p) => (p.id === data.id ? data : p))
        );
        setProductoEnEdicion(null); // Se limpia el formulario
      } else {
        // Se agrega un nuevo producto
        setProductos((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error("Error al enviar producto al backend", error);
    }
  };




  const handleEdit = (producto: Producto) => {
    console.log("Editar producto", producto)
    setProductoEnEdicion(producto);
  };

  // Se recibe el id del producto a eliminar
  const handleDelete = async (id: number) => {
    console.log("Eliminar producto con id:", id)
    try {
      // Se envía una petición DELETE al backend con la ruta
      const response = await fetch(`/api/productos/${id}`, {
        method: "DELETE",
      });

      // Si la respuesta es correcta, actualizamos el estado
      if (response.ok) {
        setProductos(productos.filter((producto) => producto.id !== id));
      } else {
        const errorData = await response.json();
        console.error("Error al eliminar producto:", errorData);
      }
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  };





  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventario de Productos</h1>

      <FormularioProducto
        onSubmit={handleSubmitProducto}
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
