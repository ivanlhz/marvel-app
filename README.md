# Dragon Ball App

## Descripción
Esta aplicación está construida con React + TypeScript + Vite, diseñada para mostrar información de personajes y elementos del universo Dragon Ball utilizando una arquitectura limpia y modular.

## Requisitos Previos
- Node.js >= 18.x recomendado
- npm >= 9.x

## Estructura del Proyecto

```
src/
├── pages/           # Todas las rutas de la aplicación
├── core/            # Lógica de negocio
│   ├── domain/      # Modelos, interfaces y contratos
│   └── infrastructure/ # Implementaciones, servicios y repositorios
├── ui/              # Componentes de UI
│   ├── components/  # Componentes reutilizables (Atomic Design)
│   │   ├── atoms/   # Componentes básicos (botones, inputs, etc.)
│   │   ├── molecules/ # Combinaciones de átomos
│   │   ├── organisms/ # Combinaciones complejas de moléculas
│   │   └── templates/ # Layouts y estructuras de página
│   ├── context/     # Contextos de React para estado global
│   └── hooks/       # Hooks personalizados
├── assets/          # Imágenes, iconos y otros recursos estáticos
└── utils/           # Utilidades y funciones auxiliares
```

## Bibliotecas Principales

### Gestión de Estado y Peticiones
- **React Query**: Para el cacheo de peticiones, manejo de estados de carga/error y revalidación automática.
- **Axios**: Cliente HTTP para realizar peticiones a la API de Dragon Ball.

### Routing
- **React Router**: Para la navegación entre páginas.

### UI
- **CSS puro**: Para estilizar componentes, sin uso de bibliotecas externas.
- **Vite**: Bundler y servidor de desarrollo rápido.

### Testing
- **Jest**: Framework de testing.
- **React Testing Library**: Para testing de componentes.

## Arquitectura

La aplicación sigue los principios de Clean Architecture:

1. **Domain**: Contiene las entidades y casos de uso del negocio.
2. **Infrastructure**: Implementa interfaces definidas en el dominio.
3. **UI**: Presenta la información al usuario siguiendo Atomic Design.

Esta estructura permite:
- Separación clara de responsabilidades
- Testabilidad mejorada
- Mantenibilidad a largo plazo
- Facilidad para cambiar implementaciones sin afectar la lógica de negocio

## Comandos Disponibles

```bash
# Iniciar el servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar la versión de producción
npm run preview

# Ejecutar linter
npm run lint

# Corregir problemas de linting automáticamente
npm run lint:fix

# Formatear código con Prettier
npm run format

# Ejecutar tests unitarios
npm run test

# Generar informe de cobertura de tests
npm run coverage
```

## Cómo Levantar la Aplicación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

3. Abrir en el navegador:
La aplicación estará disponible en [http://localhost:5173](http://localhost:5173)

## Testing y Convenciones
- Los tests se ubican junto a los componentes o funciones bajo el sufijo `.spec.tsx` o `.spec.ts`.
- Se utiliza Jest y React Testing Library para pruebas unitarias y de integración.
- Para ejecutar todos los tests: `npm run test`.
- Para ver el reporte de cobertura: `npm run coverage`.

## Linting y Formato
- Se utiliza ESLint para mantener la calidad del código.
- Prettier se usa para el formateo automático.
- Ejecuta `npm run lint` para ver advertencias/errores y `npm run lint:fix` para corregir automáticamente.

---

Si tienes dudas sobre la estructura o los comandos, revisa este README o consulta los scripts en `package.json`.
