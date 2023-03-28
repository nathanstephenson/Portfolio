export function getIntValue(value:string) {
	return Number.parseInt(value.match('^[0-9]*') ? value.match('^[0-9]*')![0] : '0')
}
