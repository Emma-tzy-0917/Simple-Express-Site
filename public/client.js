//"use strict";
$(function(){
	$.get("/fruits", appendToList);

	function appendToList(fruits){
		var list=[];
		var fruit, content, newLi; 
		for(var i=0; i<fruits.length; i++){
			fruit = fruits[i];
			content = '<a href="/fruits/'+fruit+'">'+fruit+'</a>  <a href=# data-fruit = '+fruit+'><img class="delete" src=delete.png /></a>';
			newLi = $('<li/>',{html:content});
			list.push(newLi);
		}
		$('.fruit-list').append(list);
	}

	$('form').on('submit',function(event){
		event.preventDefault();
		var form = $(this);
		var blockData = form.serialize();
		$.ajax({
			type: "POST",
			url: "/fruits",
			data: blockData,
			success: appendNRest
		});
	}); 
	
	function appendNRest(blockName){
			appendToList([blockName]);
			form.trigger('reset');
	};

	$('.fruit-list').on('click','a[data-fruit]',function(event){
		event.preventDefault();
		if(!confirm("Do you really want to delete this item?")){
			return false;
		}
		var target = $(event.currentTarget);
		$.ajax({
			type: "DELETE",
			url: "/fruits/"+target.data("fruit"),
			success: deleteElem
		});

		function deleteElem(){
			target.parents('li').remove();
		}

	});

});