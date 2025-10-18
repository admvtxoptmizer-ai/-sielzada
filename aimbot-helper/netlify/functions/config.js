exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Configurações completas do sistema
    const systemConfig = {
        version: '1.0.0',
        package: 'com.dts.freefireth',
        gameVersion: '1.94.8',
        
        memoryMap: {
            libil2cpp: {
                base: '0xC9687000',
                size: '0x1FCE6E0',
                addresses: [
                    { name: 'BASE', addr: '0xC9687000', value: '464c457f', type: 'r-xp' },
                    { name: 'HEADER1', addr: '0xC9687004', value: '10101', type: 'r-xp' },
                    { name: 'HEADER2', addr: '0xC9687010', value: '280003', type: 'r-xp' },
                    { name: 'HEADER3', addr: '0xC9687014', value: '1', type: 'r-xp' },
                    { name: 'SIZE', addr: '0xC9687018', value: '352500', type: 'r-xp' },
                    { name: 'RECOIL', addr: '0xCB9B26DC', value: 'e3a01001', type: 'r-xp' },
                    { name: 'AIM', addr: '0xCB9B26E0', value: 'e59030f4', type: 'r-xp' }
                ]
            }
        },
        
        registrySettings: {
            'AimBot100': {
                dword: '00001',
                description: 'AimBot 100% Registre Sensitivy',
                package: 'com.dts.freefireth',
                value: '9900909'
            },
            'SensitivityAimBot': {
                dword: '00002',
                description: 'Sensitivy AimBot 100% = Mira-Não-Treme',
                value: '000009'
            },
            'MiraPesada': {
                dword: '00003',
                description: 'String AimBot 100% Mira-Pesada-Com-Mais-Precisão',
                type: 'String'
            },
            'AimBotVip': {
                dword: '00004',
                description: 'AimBot 100% Vip Registre',
                version: '1.94.8'
            },
            'AimGrudar': {
                dword: '00005',
                description: 'Sensitivy AimBot Mira-Grudar-100%',
                startActivity: true
            },
            'SeguraManaCabeca': {
                dword: '00006',
                description: '100%-Mira-Segurar-Na-Cabeça',
                startActivity: true
            },
            'AimGrudarVip': {
                dword: '00007',
                description: 'StartActivy AimGrudar AimBot Grudar 100% Sensitivy'
            },
            'HeadKill': {
                dword: '00008',
                description: 'Head Kill 100% Headshot Sensitivy',
                feature: 'Mira-Não-Tremer'
            },
            'PathConfig': {
                dword: '00009',
                description: 'String AimBot 100% Path config',
                path: 'com.dts.freefireth'
            }
        },
        
        touchControls: {
            touchMoveDX: {
                register: 'esp+560h+wndpl rcNormalPosition',
                type: 'Touchmovedx'
            },
            touchMoveCX: {
                register: 'esp+560h wndpl.rcNormalPosition bottom',
                value: '10000030',
                top: '1000C034'
            }
        },
        
        aimbotModes: [
            {
                name: 'auxilio 50%',
                intensity: 50,
                fov: 3,
                smoothing: 8,
                headshot: false
            },
            {
                name: 'auxilio 75%',
                intensity: 75,
                fov: 5,
                smoothing: 5,
                headshot: true
            },
            {
                name: 'auxilio 100%',
                intensity: 100,
                fov: 10,
                smoothing: 2,
                headshot: true,
                aimlock: true,
                noRecoil: true
            }
        ],
        
        features: {
            aimbot: true,
            aimlock: true,
            headshot: true,
            noRecoil: true,
            noShake: true,
            autoAim: true,
            fovCircle: true
        },
        
        advanced: {
            mouseOriginalGetRecoil: 'NULL',
            aimbotTrue: true,
            nullFull: true,
            androidPath: '/data/app/com.dts.freefireth-1/lib/arm/libil2cpp.so'
        }
    };

    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                config: systemConfig
            })
        };
    }

    if (event.httpMethod === 'POST') {
        try {
            const body = JSON.parse(event.body || '{}');
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    message: 'Configuração atualizada',
                    config: systemConfig,
                    userConfig: body
                })
            };
        } catch (error) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    success: false,
                    error: error.message
                })
            };
        }
    }

    return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
    };
};
