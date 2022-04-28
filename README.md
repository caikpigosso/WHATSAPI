# API Simples para alertas do zabbix !




# Instalandos **Dependências**

       sudo apt-get install -y libxshmfence-dev libgbm-dev wget unzip fontconfig locales gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc-s1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation  libnss3 lsb-release xdg-utils curl
  # Instalando NodeJS & Yarn
  

     curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
     sudo apt-get update && sudo apt-get install gcc g++ make yarn nodejs
     sudo apt-get install -y build-essential
     npm install -g pm2
# Iniciando API 

    git clone https://github.com/caikpigosso/zabbix-alert-whatsapp.git
    cd zabbix-alert-whatsapp/

#### Baixar Modulos da API

    yarn

#### Iniciar Backend

    pm2 start index.js --name API

#### Ler QR Code (Obs. Modo Beta do Whatsapp deve estar Ativado)

    pm2 log 0 --lines 150

#### Copiar Script para pasta de alertas do Zabbix

    sudo cp zabbix.sh /lib/zabbix/alertscripts/
    cd /lib/zabbix/alertscripts
    chmod 777 zabbix.sh 

# Configurando Whatsapp

 1. Após ler o QrCode criar um grupo no Whatsapp.
 2. Adicionar o contato do Bot no Grupo.
 3. Enviar o Comando `!groupinfo` para pegar o ID do grupo.

# Configurar Zabbix

 1. Importar tipo de midia [Tipo de Midia](https://raw.githubusercontent.com/caikpigosso/zabbix-alert-whatsapp/master/Zabbix/Tipo%20de%20midia/Alertas%20Via%20Whatsapp.yaml)
 2. Criar um usuário, na aba Midia
 3. Adicionar midia, selecione o tipo Alertas Midias e no campo enviar para Colocar o id do Grupo
 4. Criar trigger Actions 

