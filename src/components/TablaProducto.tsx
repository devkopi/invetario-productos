import type { Producto } from '@/types/types'

type Props = {
    productos: Producto[];
    onEdit: (producto: Producto) => void;
    onDelete: (id: number) => void;
};

export default function TablaProductos({ productos, onEdit, onDelete }: Props) {
    return (
        <table className="w-full mt-8 border border-zinc-300">
            <thead className="bg-zinc-100 text-zinc-600">
                <tr>
                    <th className="p-2 border">Nombre</th>
                    <th className="p-2 border">Precio</th>
                    <th className="p-2 border">Stock</th>
                    <th className="p-2 border">Categoría</th>
                    <th className="p-2 border text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(productos) ? (
                    productos.map((producto) => (
                        <tr key={producto.id} className="hover:bg-zinc-50">
                            <td className="p-2 border">{producto.nombre}</td>
                            <td className="p-2 border">$ {producto.precio.toFixed(2)}</td>
                            <td className="p-2 border">{producto.stock}</td>
                            <td className="p-2 border">{producto.categoria}</td>
                            <td className="p-2 border text-center space-x-2">
                                <button
                                    onClick={() => onDelete(producto.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                >
                                    Eliminar
                                </button>
                                <button
                                    onClick={() => onEdit(producto)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="p-2 text-center text-red-500">
                            Error al cargar productos.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}