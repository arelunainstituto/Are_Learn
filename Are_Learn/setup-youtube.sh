#!/bin/bash

# 🚀 Script de Setup Automático - YouTube Integration
# AreLuna Platform

echo "=================================="
echo "🎬 Setup YouTube - AreLuna"
echo "=================================="
echo ""

# Verificar se .env.local existe
if [ -f .env.local ]; then
    echo "✅ Arquivo .env.local encontrado"
    
    # Verificar se já tem a chave
    if grep -q "NEXT_PUBLIC_YOUTUBE_API_KEY" .env.local; then
        echo "⚠️  Chave YouTube já existe em .env.local"
        echo ""
        read -p "Deseja substituir? (s/n): " resposta
        
        if [ "$resposta" = "s" ] || [ "$resposta" = "S" ]; then
            # Remover linha antiga
            sed -i.bak '/NEXT_PUBLIC_YOUTUBE_API_KEY/d' .env.local
            # Adicionar nova
            echo "NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyD43HxF9UcWlUhdqxr1tmoQeuBnrpyj_eU" >> .env.local
            echo "✅ Chave atualizada!"
        else
            echo "❌ Operação cancelada"
            exit 0
        fi
    else
        # Adicionar chave
        echo "" >> .env.local
        echo "# YouTube Integration" >> .env.local
        echo "NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyD43HxF9UcWlUhdqxr1tmoQeuBnrpyj_eU" >> .env.local
        echo "✅ Chave adicionada!"
    fi
else
    # Criar .env.local do zero
    echo "📝 Criando .env.local..."
    cp .env.local.example .env.local 2>/dev/null || cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Video Service
NEXT_PUBLIC_VIDEO_PROVIDER=youtube

# YouTube Integration ✅
NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyD43HxF9UcWlUhdqxr1tmoQeuBnrpyj_eU

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=AreLuna
EOF
    echo "✅ Arquivo .env.local criado!"
fi

echo ""
echo "=================================="
echo "✅ SETUP COMPLETO!"
echo "=================================="
echo ""
echo "📋 Próximos passos:"
echo ""
echo "1. Instalar dependências:"
echo "   npm install"
echo ""
echo "2. Iniciar servidor:"
echo "   npm run dev"
echo ""
echo "3. Testar integração:"
echo "   http://localhost:3000/exemplo-youtube"
echo ""
echo "4. Interface admin:"
echo "   http://localhost:3000/admin/youtube"
echo ""
echo "=================================="
echo "🎉 Pronto para usar!"
echo "=================================="

