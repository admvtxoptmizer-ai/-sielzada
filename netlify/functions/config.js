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

    const systemConfig = {
        version: '1.0.0',
        package: 'com.dts.freefireth',
        gameVersion: '1.94.8',
        memoryMap: {
            libil2cpp: {
                base: '0xC9687000',
                addresses: [
                    { name: 'BASE', addr: '0xC9687000', value: '464c457f' },
                    { name: 'RECOIL', addr: '0xCB9B26DC', value: 'e3a01001' },
                    { name: 'AIM', addr: '0xCB9B26E0', value: 'e59030f4' }
                ]
            }
        }
    };

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, config: systemConfig })
    };
};
