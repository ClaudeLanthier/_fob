function cl(v){console.log(v)};
(function(){
var $_fob={
	ini:function(){
		$fob.dom.layout();
		$fob.dom.menu.form.build();
		$fob.dom.menu.canvas();
		$fob.dom.menu.control();
		$fob.dom.canvas.ini_size();
		window.onresize=function(e){/*$fob.dom.canvas.reset_width();*/}

		


	}
}
this.$_fob=$_fob;
})();
