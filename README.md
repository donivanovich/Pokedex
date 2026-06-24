# Pokédex React App 🐾

Una Pokédex moderna construida con **React** que permite buscar, filtrar y explorar Pokémon de todas las generaciones (1–9).

---

## 📦 Características

- Renderizado de Pokémon con sus imágenes oficiales de [PokéAPI](https://pokeapi.co/).
- Filtros por:
  - Tipo (`Grass`, `Fire`, `Water`, etc.)
  - Región (`Kanto`, `Johto`, `Hoenn`, etc.)
- Buscador en tiempo real por nombre de Pokémon.
- Visualización responsiva con scroll en caso de listas largas.
- Colores dinámicos de las tarjetas según el tipo principal del Pokémon.
- Badges de tipo con color ligeramente más oscuro y esquinas redondeadas.
- Soporte completo para más de 1.000 Pokémon de todas las generaciones.

---

## 🛠 Tecnologías

- **React** – Librería principal de UI.
- **Hooks** – `useState` para estado local y filtrado dinámico.
- **CSS** – Estilos personalizados para tarjetas, badges y layout.
- **JSON** – Datos locales para Pokémon y regiones.

---

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/ikfstidea/Pokedex.git
cd ./pokedex
npm install
npm run dev
```