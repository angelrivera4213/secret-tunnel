export default function sub(template, values = {}) {
	return template.replace(
		/{{(\w*)}}/g,
		function( m, key ){
			return values?.hasOwnProperty(key) ? values[key] : '';
		}
	);
}
