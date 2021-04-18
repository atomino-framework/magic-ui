<script lang="ts">
	export let value = "";
	export const name = '';

	$: datetime = datetimeLocal(value, true);

	function input(event){
		let val = event.target.value;
		value = datetimeLocal(val, true, true) ?? '';
		console.log(value)
	}

	function datetimeLocal(date, T = false, zone = false){
		if(date === '' || date === null) return null;
		if(!(date instanceof Date)) date = new Date(date);
		if(isNaN(date)) return null;
		let offset;
		return date.getFullYear()+'-'+
			('0' + (date.getMonth() + 1)).slice(-2)+'-'+
			('0' + (date.getDate())).slice(-2)+
			(T ? 'T' : ' ')+
			('0' + (date.getHours())).slice(-2)+':'+
			('0' + (date.getMinutes())).slice(-2)+':'+
			('0' + (date.getSeconds())).slice(-2)+
			(!zone?'':!(offset=new Date().getTimezoneOffset())?'Z':((offset > 0 ? '-' : '+')+
				('0'+Math.floor(Math.abs(offset)/60)).slice(-2)+':'+
				('0'+Math.floor(Math.abs(offset)%60)).slice(-2)));
	}
</script>

<input on:input={input} type="datetime-local" bind:value={datetime}>

<style lang="scss">
	@import "../../../../style/mixins";
	input{
		@include input;
		flex-grow: 1;
	}
</style>