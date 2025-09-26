

"use strict";

// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.3/jspdf.umd.min.js"></script>
//import * as MOD_PDF from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.3/jspdf.umd.min.js";

export function test_pdf(){
	

	const url = "http://sebiblia.github.io/";

	//const id = "/?u=JoseLuisQuiroga";
	const user_id = "/?u=01234567890123456789";
	
	const arr_txt = [
		`Juan 1:1. En el principio ya existía la Palabra; y aquel que es la Palabra estaba con Dios y era Dios.`,
		`Juan 1:2. Él estaba en el principio con Dios.`,
		`Juan 1:3. Por medio de él, Dios hizo todas las cosas; nada de lo que existe fue hecho sin él.`,
		`Juan 1:4. En él estaba la vida, y la vida era la luz de la humanidad.`,
		`Juan 1:5. Esta luz brilla en las tinieblas, y las tinieblas no han podido apagarla.`,
		`Juan 1:6. Hubo un hombre llamado Juan, a quien Dios envió`,
		`Juan 1:7. como testigo, para que diera testimonio de la luz y para que todos creyeran por lo que él decía.`,
		`Juan 1:8. Juan no era la luz, sino uno enviado a dar testimonio de la luz.`,
		`Juan 1:9. La luz verdadera que alumbra a toda la humanidad venía a este mundo.`,
		`Juan 1:10. Aquel que es la Palabra estaba en el mundo; y, aunque Dios hizo el mundo por medio de él, los que son del mundo no lo reconocieron.`,
	];
	
	const img_cod = get_code_img(url);
	
	const xx1 = 8;
	const xx2 = 110;
	const yy = 10;
	const hh = 50;
	const lines = 5;

	const doc = new window.jspdf.jsPDF({
		orientation: 'p',
		unit: 'mm',
		format: 'letter',
		putOnlyUsedFonts: true
	});
	//const fl = doc.getFontList();
	//console.log("getFontList= " + JSON.stringify(fl, null, " "));
	
	let ii = 0;
	for(ii = 0; ii < lines; ii++){
		const yy1 = yy + (hh * ii);
		add_side_1(doc, xx1, yy1, user_id, img_cod);
		add_side_1(doc, xx2, yy1, user_id, img_cod);
	}

	doc.addPage();

	if((arr_txt != null) && (arr_txt.length > 0)){
		let txt = arr_txt[0]; 
		let vv = 1;
		for(ii = 0; ii < lines; ii++){
			const yy1 = yy + (hh * ii);
			
			add_side_2(doc, xx1, yy1, txt);
			if(vv >= arr_txt.length){
				txt = arr_txt[0]; vv = 1;
			} else {
				txt = arr_txt[vv]; vv++;
			}
			
			add_side_2(doc, xx2, yy1, txt);
			if(vv >= arr_txt.length){
				txt = arr_txt[0]; vv = 1;
			} else {
				txt = arr_txt[vv]; vv++;
			}
		}
	}
	
	doc.save("image_jspdf.pdf");	
}

function gen_pdf_dist_cards(doc, xx, yy, user_id, img_cod){
}

function add_side_1(doc, xx, yy, user_id, img_cod){
	const mx = 4;
	const my = 5;
	doc.setFontSize(20);
	doc.setFont("Times", "bold");
	doc.text("SiBiblia.com", xx + mx, yy + my + 15);
	doc.setFontSize(12);
	doc.text(user_id, xx + mx, yy + my + 20);
	if(img_cod != null){
		doc.addImage(img_cod, "PNG", xx + mx + 55, yy + my, 35, 35);	
	}
	doc.rect(xx, yy, 97, 45);
}

function add_side_2(doc, xx, yy, txt){
	const arr = doc.splitTextToSize(txt, 89);
	const mx = 4;
	const my = 5;
	doc.setFontSize(12);
	//doc.setFont("Times", "bold");
	doc.text(arr, xx + mx, yy + my + 5);
	doc.rect(xx, yy, 97, 45);
}

function get_code_img(url){
	const dv_qrcod = document.createElement("div");
	dv_qrcod.classList.add("qr_code_img");
	const the_qr_maker = new QRCode(dv_qrcod, {
		width : 300,
		height : 300,
	});
	the_qr_maker.makeCode(url);
	const all_canv = dv_qrcod.getElementsByTagName("canvas");
	let the_img = null;
	if(all_canv.length > 0){
		const canv0 = all_canv[0];
		the_img = canv0.toDataURL("image/png");
		//console.log("FOUND_CANVAS");
	}
	return the_img;
}

/*
getFontList= {
 "helvetica": [
  "normal",
  "bold",
  "italic",
  "bolditalic"
 ],
 "Helvetica": [
  "",
  "Bold",
  "Oblique",
  "BoldOblique"
 ],
 "courier": [
  "normal",
  "bold",
  "italic",
  "bolditalic"
 ],
 "Courier": [
  "",
  "Bold",
  "Oblique",
  "BoldOblique"
 ],
 "times": [
  "normal",
  "bold",
  "italic",
  "bolditalic"
 ],
 "Times": [
  "Roman",
  "Bold",
  "Italic",
  "BoldItalic"
 ],
 "zapfdingbats": [
  "normal"
 ],
 "ZapfDingbats": [
  ""
 ],
 "symbol": [
  "normal"
 ],
 "Symbol": [
  ""
 ]
} bq_pdf_mgr.js:18:10

*/