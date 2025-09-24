

"use strict";

// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.3/jspdf.umd.min.js"></script>

//import * as MOD_PDF from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.3/jspdf.umd.min.js";

export function test_pdf(){
	const doc = new window.jspdf.jsPDF();

	doc.setFontSize(40);
	doc.text("Octonyan loves jsPDF", 35, 25);
	const img_cod = get_code_img();
	if(img_cod != null){
		doc.addImage(img_cod, "PNG", 15, 40, 180, 180);	
	} else {
		doc.addImage("../img/trophy.webp", "WEBP", 15, 40, 180, 180);	
	}
	doc.save("image_jspdf.pdf");	
}

function get_code_img(){
	const dv_qrcod = document.createElement("div");
	dv_qrcod.classList.add("qr_code_img");
	const the_qr_maker = new QRCode(dv_qrcod, {
		width : 300,
		height : 300,
	});
	the_qr_maker.makeCode("http://sebiblia.github.io/");
	const all_canv = dv_qrcod.getElementsByTagName("canvas");
	let the_img = null;
	if(all_canv.length > 0){
		const canv0 = all_canv[0];
		the_img = canv0.toDataURL("image/png");
		console.log("FOUND_CANVAS");
	}
	return the_img;
}


