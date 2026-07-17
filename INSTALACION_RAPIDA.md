# 🚀 INSTALACIÓN RÁPIDA (5 MINUTOS)

## **EN TU iPhone - AHORA MISMO**

### **1️⃣ Descarga los archivos**
- Ve a este repositorio en GitHub
- Presiona **Code** (botón verde)
- Presiona **Download ZIP**
- Los archivos se descargan en tu iPhone

### **2️⃣ Abre la app**
- Abre la app **Archivos** en tu iPhone
- Busca la carpeta descomprimida `icecream-factura-pro-main`
- Busca el archivo `index.html`
- Presiona y abre con **Safari**

✅ **¡Ya tienes la app funcionando!**

### **3️⃣ Instálalo como app en tu pantalla (IMPORTANTE)**
- En Safari, presiona el **ícono de compartir** (cuadro con flecha hacia arriba)
- Desplázate hacia abajo y presiona **"Agregar a pantalla de inicio"**
- Dale el nombre: `IceCream Pro`
- Presiona **Agregar**

🎉 **¡Listo! Tienes la app como ícono en tu pantalla de inicio**

---

## **🖨️ CONECTAR LA IMPRESORA ZEBRA**

### **Opción 1: Impresión directa (sin servidor)**
1. En la app → **🖨️ Impresora**
2. Configura:
   - Ancho: **72mm (3")**
   - Margen: **8mm**
   - Tamaño: **Normal**
3. Guarda ✅
4. Al imprimir, selecciona tu Zebra en el cuadro de diálogo

### **Opción 2: Impresión automática (con servidor en tu PC/Mac)**

**En tu computadora (Mac o PC):**

1. Descarga e instala **Node.js**: https://nodejs.org/

2. Descarga el archivo `print-server.js` del repo

3. Abre **Terminal** (Mac) o **PowerShell** (Windows)

4. Ve a la carpeta donde está `print-server.js`:
   ```bash
   cd /ruta/a/la/carpeta
   ```

5. Instala lo necesario:
   ```bash
   npm install express cors body-parser serialport
   ```

6. Inicia el servidor:
   ```bash
   node print-server.js
   ```

   Verás algo como:
   ```
   Servidor de Impresión Zebra ZQ320 Plus
   Escuchando en http://localhost:3000
   Interfaz web: http://localhost:3000/config
   ```

7. **En tu navegador**, ve a: `http://localhost:3000/config`

8. Selecciona tu Zebra y presiona **Conectar**

9. **En la app (iPhone)** → **🖨️ Impresora**:
   - Marca: `Zebra ZQ320 Plus`
   - URL del servidor: `http://192.168.X.X:3000/print`
   
   *(Reemplaza X.X.X con tu IP local. En tu Mac/PC, busca tu IP en Preferencias de Red)*

10. Guarda ✅

**¡Ahora imprime automáticamente sin diálogos!**

---

## **📊 DATOS Y FACTURACIÓN**

Todo se guarda en tu iPhone automáticamente:
- ✅ Productos y precios
- ✅ Clientes
- ✅ Facturas (con fecha/hora)
- ✅ Reportes por día/semana/mes
- ✅ Detalles por tienda

**Sin internet necesaria** (offline 100%)

---

## **🎯 EMPIEZA A FACTURAR**

1. **📋 Nueva Factura**
   - Selecciona cliente
   - Ingresa cantidades
   - Presiona "Agregar a la Factura"
   - Presiona "Guardar"
   - Presiona "Imprimir" o "PDF"

2. **📈 Reportes**
   - Hoy / Esta Semana / Este Mes / Personalizado
   - Ve ventas totales
   - Ve ventas por tienda
   - Ve detalle de cada factura
   - Imprime o descarga como PDF

3. **🍨 Productos**
   - Agrega sabores con precio de unidad
   - Display (x3) y Caja (x24) se calculan solos
   - Edita el precio general para todos a la vez

---

## **⚠️ PROBLEMAS?**

**"¿Dónde descargo los archivos?"**
- Ve a https://github.com/TU_USUARIO/icecream-factura-pro
- Botón **Code** (verde) → **Download ZIP**

**"La impresora no aparece"**
- Asegúrate de estar en la misma WiFi
- Reinicia tu Zebra
- En la PC, presiona "Detectar" en http://localhost:3000/config

**"¿Funciona sin WiFi?"**
- SÍ, la app y datos funcionan 100% offline
- Solo necesita WiFi para imprimir (si usas servidor)
- Impresión por Bluetooth: sin WiFi

---

## **✅ CHECKLIST ANTES DE FACTURAR**

- [ ] Descargué los archivos
- [ ] Abrí `index.html` en Safari
- [ ] Agregué la app a pantalla de inicio
- [ ] Conecté mi Zebra (Opción 1 u Opción 2)
- [ ] Agregué algunos productos de prueba
- [ ] Hice una factura de prueba
- [ ] Imprimí correctamente

**¡LISTO PARA FACTURAR! 🎉**

---

*¿Preguntas? Abre un "Issue" en GitHub o contacta al desarrollador.*
