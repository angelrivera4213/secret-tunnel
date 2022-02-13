export class MixinBuilder {
    constructor (superclass) {
        this._superclass = superclass;
    }

    with (...mixins) {
        return mixins.reduce((c, mixin) => mixin(c), this._superclass);
    }
}

export const mix = (superclass) => new MixinBuilder(superclass);
