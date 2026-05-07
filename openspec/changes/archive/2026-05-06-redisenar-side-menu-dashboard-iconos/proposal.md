# Proposal: Rediseñar el side menu del dashboard

## What
Rediseñar el menú lateral del dashboard para que cada sección tenga un icono descriptivo y coherente.

El cambio incluye:
- actualizar los iconos actuales de menú por iconos que representen claramente cada sección
- mejorar la consistencia visual de los enlaces de navegación
- asegurar que el menú siga siendo accesible y responsive en dispositivos móviles

## Why
El menú lateral actual usa iconos genéricos e inconsistentes que no ayudan a identificar rápidamente cada sección.
Agregar iconos descriptivos mejora la usabilidad, acelera la navegación y hace el dashboard más intuitivo para los usuarios.

## Scope
Incluye:
- actualizar el HTML del menú en `src/app/pages/dashboard/dashboard.html`
- reemplazar iconos SVG mal definidos con iconos descriptivos y libres de errores
- mejorar los estados activos y el contraste de los enlaces
- conservar el comportamiento responsive del sidebar en pantallas pequeñas

No incluye:
- rediseño completo de la página de dashboard fuera del menú lateral
- cambios en la lógica de enrutamiento existente
- creación de nuevos módulos o iconos fuera del menú principal
