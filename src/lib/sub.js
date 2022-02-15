export default function sub(template, values = {}) {
    return template.replace(
        /{{(\w*)}}/g,
        function( m, key ){
            return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : '';
        }
    );
}
