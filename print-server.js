#!/usr/bin/env node
/**
 * Servidor de impresión para Zebra ZQ320 Plus
 * 
 * Instalación:
 *   npm install express cors body-parser serialport
 * 
 * Uso:
 *   node print-server.js
 * 
 * Luego en la app, ve a 🖨️ Impresora y pon:
 *   URL del servidor: http://localhost:3000/print
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { SerialPort } = require('serialport');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

const PORT = 3000;
let serialPort = null;
let connectedDevice = null;

// Detectar puertos Bluetooth/seriales disponibles
app.get('/api/ports', async (req, res) => {
  try {
    const ports = await SerialPort.list();
    const filtered = ports.filter(p => 
      p.manufacturer && (p.manufacturer.includes('Zebra') || p.manufacturer.includes('Prolific'))
    );
    res.json({ 
      available: filtered.length > 0,
      ports: filtered.map(p => ({ path: p.path, manufacturer: p.manufacturer, productId: p.productId })),
      allPorts: ports.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Conectar a un puerto específico
app.post('/api/connect', (req, res) => {
  const { path, baudRate } = req.body;
  if (!path) return res.status(400).json({ error: 'path requerido' });

  try {
    if (serialPort) serialPort.close();
    
    serialPort = new SerialPort({ path, baudRate: baudRate || 115200 });
    
    serialPort.on('open', () => {
      connectedDevice = { path, baudRate: baudRate || 115200 };
      res.json({ success: true, message: `Conectado a ${path}` });
    });

    serialPort.on('error', err => {
      serialPort = null;
      res.status(500).json({ error: `Error en puerto: ${err.message}` });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Desconectar
app.post('/api/disconnect', (req, res) => {
  if (serialPort) {
    serialPort.close();
    serialPort = null;
    connectedDevice = null;
    res.json({ success: true, message: 'Desconectado' });
  } else {
    res.status(400).json({ error: 'No hay conexión activa' });
  }
});

// Enviar comando de impresión (recibe HTML y lo convierte a ZPL)
app.post('/print', (req, res) => {
  const { html, width } = req.body;
  
  if (!serialPort || !connectedDevice) {
    return res.status(400).json({ error: 'No conectado a impresora. Ve a /config para conectar.' });
  }

  if (!html) {
    return res.status(400).json({ error: 'HTML requerido' });
  }

  try {
    // Convertir HTML a ZPL (Zebra Programming Language)
    const zplCommand = htmlToZPL(html, width || '72mm');
    
    serialPort.write(Buffer.from(zplCommand, 'binary'), (err) => {
      if (err) {
        return res.status(500).json({ error: `Error al escribir en puerto: ${err.message}` });
      }
      res.json({ success: true, message: 'Enviado a impresora', bytesWritten: zplCommand.length });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Convertir HTML básico a ZPL (simplificado - solo texto)
function htmlToZPL(html, width) {
  const widthMM = parseInt(width);
  const dotsPerMM = 8; // Zebra default: 203 DPI
  const pageWidthDots = widthMM * dotsPerMM;

  // Extraer texto del HTML (muy básico)
  const text = html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/\n\n+/g, '\n')
    .trim();

  // ZPL básico para impresora térmica
  const zpl = `^XA
^LL600
^LS0
^CF0,${Math.max(20, 40)}
^FO50,50^FD${text.substring(0, 500)}^FS
^XZ`;

  return zpl;
}

// Interfaz web simple
app.get('/config', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Configuración Impresora Zebra</title>
      <style>
        body { font-family: sans-serif; padding: 20px; max-width: 600px; }
        button { padding: 10px; margin: 5px; }
        #status { padding: 10px; border-radius: 5px; margin: 10px 0; }
        .connected { background: #d4edda; color: #155724; }
        .disconnected { background: #f8d7da; color: #721c24; }
      </style>
    </head>
    <body>
      <h1>🖨️ Configuración Impresora Zebra ZQ320 Plus</h1>
      <p>Puerto conectado: <span id="current">No conectado</span></p>
      <div id="status" class="disconnected">Desconectado</div>
      <h3>Puertos disponibles:</h3>
      <select id="portSelect"></select>
      <button onclick="connect()">Conectar</button>
      <button onclick="disconnect()">Desconectar</button>
      <button onclick="testPrint()">Prueba de Impresión</button>
      <h3>Info del servidor</h3>
      <p>Endpoint POST: <code>http://localhost:3000/print</code></p>
      <p>En la app, configurar: URL = http://localhost:3000/print</p>
      <script>
        async function listPorts() {
          const res = await fetch('/api/ports');
          const data = await res.json();
          const select = document.getElementById('portSelect');
          select.innerHTML = '';
          data.ports.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.path;
            opt.text = p.path + ' (' + p.manufacturer + ')';
            select.appendChild(opt);
          });
          if (data.ports.length === 0) {
            const opt = document.createElement('option');
            opt.disabled = true;
            opt.text = 'No se detectaron impresoras Zebra';
            select.appendChild(opt);
          }
        }
        async function connect() {
          const path = document.getElementById('portSelect').value;
          if (!path) { alert('Selecciona un puerto'); return; }
          const res = await fetch('/api/connect', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path, baudRate: 115200 }) });
          const data = await res.json();
          if (data.success) {
            document.getElementById('current').textContent = path;
            document.getElementById('status').className = 'connected';
            document.getElementById('status').textContent = '✅ Conectado a ' + path;
          } else {
            alert('Error: ' + data.error);
          }
        }
        async function disconnect() {
          const res = await fetch('/api/disconnect', { method: 'POST' });
          const data = await res.json();
          if (data.success) {
            document.getElementById('current').textContent = 'No conectado';
            document.getElementById('status').className = 'disconnected';
            document.getElementById('status').textContent = '❌ Desconectado';
          }
        }
        async function testPrint() {
          const res = await fetch('/print', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html: 'PRUEBA DE IMPRESION\\n' + new Date().toLocaleString() })
          });
          const data = await res.json();
          alert(data.message || data.error);
        }
        listPorts();
        setInterval(listPorts, 5000); // Actualizar cada 5 segundos
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║  Servidor de Impresión Zebra ZQ320 Plus          ║
║  Escuchando en http://localhost:${PORT}                  ║
╚════════════════════════════════════════════════════╝

Interfaz web: http://localhost:${PORT}/config
Endpoint de impresión: http://localhost:${PORT}/print

En la app, configura:
  URL del servidor: http://localhost:${PORT}/print

Nota: iOS y Android pueden usar http://192.168.x.x:${PORT}/print
      (reemplaza con tu IP local)
  `);
});
