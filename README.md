
# 📚 Components Library LCA

Bienvenido a **Components Library LCA**, una librería de componentes UI reactivos desarrollada con Angular CLI v17.3.8. Esta librería está diseñada para facilitar la creación de aplicaciones front-end modernas, proporcionando una colección de componentes reutilizables y altamente personalizables para tu proyecto.

## 🔗 Puedes verlo desplegado en el siguiente enlace:

https://components-library-lca.netlify.app/

---

## 🚀 Características principales

- 🔥 **Angular CLI 17.3.8**: Construido con la última versión de Angular para asegurar compatibilidad y rendimiento.
- ⚛️ **Componentes Reactivos**: Todos los componentes están preparados para trabajar de manera reactiva, integrándose a la perfección con formularios y servicios de datos.
- 🎨 **Altamente personalizable**: Diseñado con opciones flexibles para estilos y comportamiento.
- 📦 **Fácil integración**: Perfecto para cualquier proyecto Angular gracias a su sencilla instalación y uso.
- 🛠️ **Actualización continua**: Mantenido y mejorado constantemente para incluir nuevas funcionalidades y mejoras de rendimiento.

---

## 📦 Instalación

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/leoncanare/components-library-lca.git
   ```
   
2. Navega al directorio del proyecto:
   ```bash
   cd components-library-lca
   ```
   
3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

4. Lanza el servidor de desarrollo para probar la librería:
   ```bash
   ng serve
   ```

---

## 🧑‍💻 Uso

Para utilizar los componentes en tu proyecto Angular, primero necesitas importar el módulo de la librería y luego usar los componentes en tus templates.

### 1. Importar el módulo

En tu archivo `app.module.ts`, importa el módulo de la librería:

```typescript
import { LcaComponentsModule } from 'components-library-lca';

@NgModule({
  declarations: [
    // tus componentes
  ],
  imports: [
    LcaComponentsModule,
    // otros módulos
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2. Usar los componentes

Ahora puedes utilizar los componentes de la librería en tus templates. Por ejemplo:

```html
<lca-button label="Click me!"></lca-button>
```

---

## ⚙️ Scripts disponibles

- `ng serve` - Inicia el servidor de desarrollo.
- `ng build` - Compila el proyecto para producción.
- `ng test` - Ejecuta las pruebas unitarias.
- `ng lint` - Analiza el código para asegurarse de que cumple con las normas de estilo y calidad.

---

## 📖 Documentación

Cada componente viene con una documentación completa sobre su uso, propiedades, y eventos. Puedes encontrar más detalles en los archivos de cada componente dentro del directorio `/src/lib`.

Para más información sobre Angular CLI, visita [Angular CLI Documentation](https://angular.io/cli).

---

## 👥 Contribuciones

Si deseas contribuir a este proyecto, por favor sigue los pasos a continuación:

1. Haz un fork del repositorio.
2. Crea una nueva rama: `git checkout -b mi-nueva-rama`.
3. Realiza tus cambios y haz commit: `git commit -m 'Mi nueva funcionalidad'`.
4. Sube tu rama: `git push origin mi-nueva-rama`.
5. Abre un Pull Request.

---

## 📄 Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE.txt).

---

¡Gracias por usar **Components Library LCA**! 😊 Si tienes alguna duda o sugerencia, no dudes en abrir un issue o ponerte en contacto conmigo.
