#!/usr/bin/env node
// scripts/validate-data.js
const fs = require('fs');
const path = require('path');

console.log('🔍 Validando dados do Hub Direitista...\n');

// Validar db.json
try {
  const dbPath = path.join(__dirname, '../public/data/db.json');
  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  console.log('📊 db.json:');
  console.log(`  • ${dbData.members?.length || 0} membros`);
  console.log(`  • ${dbData.portavoze?.length || 0} porta-vozes`);
  console.log(`  • ${dbData.plataformas?.length || 0} plataformas`);
  console.log(`  • Versão: ${dbData.metadata?.version || 'N/A'}`);
  
  // Verificar IDs únicos
  const memberIds = dbData.members?.map(m => m.id) || [];
  const uniqueIds = new Set(memberIds);
  
  if (memberIds.length !== uniqueIds.size) {
    console.log('  ⚠️  IDs duplicados detectados!');
  } else {
    console.log('  ✅ IDs únicos');
  }
  
} catch (error) {
  console.error('❌ Erro ao validar db.json:', error.message);
  process.exit(1);
}

// Validar artigos.json (se existir)
try {
  const artigosPath = path.join(__dirname, '../public/data/artigos.json');
  if (fs.existsSync(artigosPath)) {
    const artigosData = JSON.parse(fs.readFileSync(artigosPath, 'utf8'));
    console.log('\n📝 artigos.json:');
    console.log(`  • ${artigosData.artigos?.length || 0} artigos`);
    console.log(`  • ${artigosData.metadata?.total || 0} no total`);
  }
} catch (error) {
  console.error('❌ Erro ao validar artigos.json:', error.message);
}

console.log('\n✅ Validação completa!');
process.exit(0);