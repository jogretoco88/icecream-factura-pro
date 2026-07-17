# 🍨 IceCream Factura Pro

Sistema de facturación completo para heladerías con impresora térmica Zebra ZQ320 Plus, instalable como app nativa en iPhone.

## ⚡ Instalación Rápida en iPhone (5 minutos)

### **Paso 1: Descarga en tu iPhone**
1. Abre Safari en tu iPhone
2. Ve a: `https://github.com/TU_USUARIO/icecream-factura-pro`
3. Presiona el botón **Code** → **Download ZIP**
4. Guarda y descomprime los archivos

### **Paso 2: Abre la app en tu iPhone**
1. En tu iPhone, abre **Archivos** → busca `index.html`
2. Ábrelo con **Safari**
3. Verás la app de facturación

### **Paso 3: Instálalo como app nativa (sin icono de Safari)**
1. En Safari, presiona el icono de **compartir** (cuadro con flecha)
2. Desplázate y presiona **"Agregar a pantalla de inicio"**
3. Dale un nombre (ej: "IceCream Pro")
4. Presiona **Agregar**

¡Listo! Ahora tienes una app nativa en tu pantalla de inicio. 🎉

---

## 🖨️ Configurar Impresora Zebra ZQ320 Plus

### **Opción A: Impresión por WiFi (Lo más rápido)**

Si tu Zebra ZQ320 Plus está conectada a WiFi:

1. En la app, ve a **🖨️ Impresora**
2. Selecciona:
   - **Ancho**: 72mm (3")
   - **Margen**: 8mm
   - **Tamaño de letra**: Normal
3. Guarda la configuración

Cuando hagas clic en **"Imprimir"**, se abrirá el cuadro de diálogo de iOS. Ahí selecciona tu Zebra.

### **Opción B: Impresión por Bluetooth (Recomendado)**

Tu Zebra está conectada a Bluetooth al iPhone. Para que funcione automáticamente:

#### **Instala el servidor local (en tu Mac/PC):**

1. **Abre Terminal/PowerShell** en tu computadora
2. Crea una carpeta para el servidor:
   ```bash
   mkdir icecream-print-server
   cd icecream-print-server
   ```

3. **Instala Node.js** (si no lo tienes):
   - Descarga desde: https://nodejs.org/
   - Instala normalmente

4. **Instala las dependencias:**
   ```bash
   npm install express cors body-parser serialport
   ```

5. **Descarga el archivo `print-server.js`** de este repo y colócalo en la carpeta

6. **Inicia el servidor:**
   ```bash
   node print-server.js
   ```

   Verás:
   ```
   Servidor de Impresión Zebra ZQ320 Plus
   Escuchando en http://localhost:3000
   Interfaz web: http://localhost:3000/config
   ```

7. **En tu navegador, ve a:** `http://localhost:3000/config`

8. **Conecta la impresora:**
   - Selecciona tu Zebra en la lista de puertos
   - Presiona **Conectar**
   - Verás: ✅ Conectado

9. **En la app, configura la impresora:**
   - Ve a **🖨️ Impresora**
   - Marca: "Zebra ZQ320 Plus"
   - URL del servidor: `http://192.168.X.X:3000/print` (tu IP local)

   *Para encontrar tu IP:*
   - **Windows:** abre PowerShell y escribe `ipconfig` (busca IPv4)
   - **Mac:** Ve a Preferencias → Red (ve el IP en la sección de WiFi)

10. **¡Listo!** Ahora cuando hagas clic en "Imprimir", se enviará directamente a tu Zebra sin diálogos.

---

## 📋 Funcionalidades

✅ **Nueva Factura** - Crea y guarda facturas  
✅ **Créditos** - Emite notas de crédito  
✅ **Gestión de Productos** - Añade sabores con precios automáticos (Unidad/Display/Caja)  
✅ **Reportes** - Hoy, Semana, Mes, Personalizado  
✅ **Ventas por Tienda** - Detalle de cada factura por cliente  
✅ **Impresión Térmica** - Zebra ZQ320 Plus  
✅ **Exportar PDF** - Descarga reportes y facturas  
✅ **Funciona Offline** - Todos los datos se guardan localmente  
✅ **App Nativa** - Se ve como app de iOS, sin navegador visible  

---

## 💾 Datos y Sincronización

Todos los datos se guardan en **localStorage** del iPhone:
- Productos
- Clientes
- Facturas (con fecha y hora)
- Configuración de impresora

Para **respaldar tus datos**, exporta desde la app o copia `index.html` a tu computadora.

---

## 🐛 Solución de Problemas

### "¿Por qué me aparece el cuadro de diálogo de impresión?"
- iOS requiere seleccionar la impresora manualmente por seguridad. Usa el servidor local (Opción B) para automática.

### "La impresora Zebra no aparece en la lista"
- Asegúrate de que está conectada a Bluetooth en iPhone
- Reinicia la Zebra
- En `http://localhost:3000/config` presiona "Detectar" nuevamente

### "¿Funciona sin WiFi?"
- **Sí**, todos los datos se guardan localmente
- La impresión por WiFi requiere conexión
- Impresión por Bluetooth funciona sin WiFi

---

## 📱 Requisitos

- **iPhone**: iOS 12+ (recomendado iOS 14+)
- **Impresora**: Zebra ZQ320 Plus con Bluetooth
- **Servidor local** (opcional): Mac/PC con Node.js 14+

---

## 🚀 Subir a GitHub

1. Crea un nuevo repo en https://github.com/new
2. Nombre: `icecream-factura-pro`
3. Sube estos archivos:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `print-server.js`
   - `README.md`

```bash
git init
git add .
git commit -m "Initial commit: IceCream Factura Pro"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/icecream-factura-pro.git
git push -u origin main
```

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que `index.html` esté en el directorio raíz
2. Comprueba que todos los archivos están juntos
3. Limpia la caché del navegador (Settings → Safari → Clear History)
4. Reinstala la app desde pantalla de inicio

---

**Versión**: 1.0  
**Actualizado**: Julio 2026  
**Compatible con**: Zebra ZQ320 Plus
