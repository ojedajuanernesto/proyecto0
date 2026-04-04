const fs = require('fs');
const path = require('path');

const redirectsPath = path.join(__dirname, '..', 'public', '_redirects');
const disabledRedirectsPath = path.join(__dirname, '..', 'public', '_redirects.disabled');

const mode = process.argv[2];

if (mode === 'on') {
  if (fs.existsSync(disabledRedirectsPath)) {
    fs.renameSync(disabledRedirectsPath, redirectsPath);
    console.log('✅ Modo mantenimiento ACTIVADO (Redirección habilitada).');
  } else if (fs.existsSync(redirectsPath)) {
    console.log('ℹ️ El modo mantenimiento ya está activado.');
  } else {
    console.error('❌ Error: No se encontró el archivo de redirecciones.');
  }
} else if (mode === 'off') {
  if (fs.existsSync(redirectsPath)) {
    fs.renameSync(redirectsPath, disabledRedirectsPath);
    console.log('✅ Modo mantenimiento DESACTIVADO (Redirección deshabilitada).');
  } else if (fs.existsSync(disabledRedirectsPath)) {
    console.log('ℹ️ El modo mantenimiento ya está desactivado.');
  } else {
    console.error('❌ Error: No se encontró el archivo de redirecciones.');
  }
} else {
  console.log('Uso: node scripts/toggle-maintenance.js [on|off]');
}
