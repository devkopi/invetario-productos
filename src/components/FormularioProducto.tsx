"use client";

import { useEffect, useState } from "react";
import type { Producto } from "@/types/types";

type Props = {
  onSubmit: (producto: Producto) => void;
  productoEnEdicion: Producto | null;
};

export default function FormularioProducto({ onSubmit, productoEnEdicion }: Props) {
  const [form, setForm] = useState<Producto>({
    id: Date.now(),
    nombre: "",
    precio: 0,
    stock: 0,
    categoria: "",
  });

  useEffect(() => {
    if (productoEnEdicion) {
      setForm(productoEnEdicion);
    }
  }, [productoEnEdicion]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "precio" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    onSubmit(form);
    setForm({
      id: Date.now(),
      nombre: "",
      precio: 0,
      stock: 0,
      categoria: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-xl bg-white shadow-md max-w-md mx-auto"
    >
      <h2 className="text-lg font-semibold">
        {productoEnEdicion ? "Editar producto" : "Agregar producto"}
      </h2>

      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full p-2 border rounded"
      />Precio
      <input
        type="number"
        name="precio"
        value={form.precio}
        onChange={handleChange}
        placeholder="Precio"
        className="w-full p-2 border rounded"
      />Cantidades existentes
      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="categoria"
        value={form.categoria}
        onChange={handleChange}
        placeholder="Categoría"
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {productoEnEdicion ? "Guardar cambios" : "Agregar producto"}
      </button>
    </form>
  );
}