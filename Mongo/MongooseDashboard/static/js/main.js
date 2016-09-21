function main() {
	$('#btn_edit').click(function(){
		// this function hides edit and delete buttons, shows save button
		// and enables input fields
		$(this).hide();
		$('#btn_delete').hide();
		$('#btn_save').show();
		$('.input').removeAttr('disabled');
        return false;
	});	
};