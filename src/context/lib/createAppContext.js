import Context from './Context';

export default function createAppContext (config) {
    return new Context(config);
}