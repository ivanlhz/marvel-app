# Marvel App

## Descripción
Esta aplicación está construida con React + TypeScript + Vite, diseñada para mostrar información de personajes y comics de Marvel utilizando una arquitectura limpia y modular.

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
- **Axios**: Cliente HTTP para realizar peticiones a la API.

### Routing
- **React Router**: Para la navegación entre páginas.

### UI
- **CSS puro**: Para estilizar componentes, sin uso de bibliotecas externas.

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

# Corregir problemas de linting
npm run lint:fix

# Formatear código
npm run format

# Ejecutar tests
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

