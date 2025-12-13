import { getStore } from '@netlify/blobs';

const store = getStore('invapentory');
const JSON_KEY = 'invapentory';

const getData = async () => {
    const data = await store.get(JSON_KEY, { type: 'json' });
    if (!data) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Data not found' })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
}

const writeData = async (body) => {
    const data = JSON.parse(body);
    await store.setJSON(JSON_KEY, data);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Data successfully updated' })
    };
}

exports.handler = async ({ httpMethod, body }) => {
    const ops = {
        'GET': getData,
        'POST': writeData.bind(this, body)
    };

    const response = await ops[httpMethod]();
    return response;
}
