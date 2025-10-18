exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod === 'POST') {
        try {
            const body = JSON.parse(event.body || '{}');
            const { mode, fov, intensity } = body;

            const aimbotConfig = {
                aimlock: {
                    enabled: true,
                    intensity: intensity || 100,
                    fov: fov || 5,
                    touchMove: {
                        dx: 'Touchmovedx.[esp+560h+wndpl rcNormalPosition]',
                        cx: 'Touchmovecx.[esp+560h wndpl.rcNormalPosition bottom]=10000030',
                        top: 'top]=1000C034'
                    },
                    dword: {
                        aimbot100: '00001',
                        sensitivity: '00002',
                        miraPesada: '00003',
                        aimbotVip: '00004',
                        aimGrudar: '00005',
                        segurarCabeca: '00006',
                        aimbotVipGrudar: '00007',
                        headKill: '00008',
                        pathConfig: '00009'
                    }
                },
                memoryAddresses: {
                    libil2cpp: {
                        base: 'C9687000',
                        offsets: [
                            { addr: 'C9687000', value: '464c457f', offset: 0 },
                            { addr: 'C9687004', value: '10101', offset: 4 },
                            { addr: 'C9687010', value: '280003', offset: 10 },
                            { addr: 'C9687014', value: '1', offset: 14 },
                            { addr: 'C9687018', value: '352500', offset: 18 },
                            { addr: 'CB9B26DC', value: 'e3a01001', offset: '1fce6dc' },
                            { addr: 'CB9B26E0', value: 'e59030f4', offset: '1fce6e0' }
                        ]
                    }
                },
                registryConfig: {
                    package: 'com.dts.freefireth',
                    version: '1.94.8',
                    settings: {
                        aimbotFull: 'Dword:9900909',
                        sensitivity: 'Dword:000009',
                        miraNaoTreme: true,
                        miraGrudar: true,
                        headshot100: true
                    }
                }
            };

            let response = {
                success: true,
                mode: mode || 'auxilio',
                config: aimbotConfig,
                injectionCode: generateInjectionCode(mode, fov, intensity),
                timestamp: new Date().toISOString()
            };

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(response)
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

    const defaultConfig = {
        success: true,
        modes: ['auxilio 50%', 'auxilio 75%', 'auxilio 100%'],
        features: ['aimlock', 'aimbot', 'headshot', 'no-recoil'],
        status: 'ready',
        version: '1.0.0'
    };

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(defaultConfig)
    };
};

function generateInjectionCode(mode, fov, intensity) {
    return `// Aimbot Code - Mode: ${mode}, FOV: ${fov}, Intensity: ${intensity}%`;
}
