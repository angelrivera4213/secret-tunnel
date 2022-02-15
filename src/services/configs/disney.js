export default {
    'defaults': {
        'host': 'cd-static.bamgrid.com',
        'roHost': 'cd-static.bamgrid.com',
        'protocol': 'https',
        'timeout': 3000,
        'pathPrefix': '/dp-117731241344',
        'credentials': 'omit'
    },
    'resources': {
        'disney.home': {
            'path': '/home.json',
            'params': {},
            'query': []
        },
        'disney.ref': {
            'path': '/sets/{{refId}}.json',
            'params': {},
            'query': []
        }
    }
};