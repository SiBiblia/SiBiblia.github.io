

"use strict";

// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.3/jspdf.umd.min.js"></script>

//import * as MOD_PDF from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.3/jspdf.umd.min.js";

export function test_pdf(){
	const doc = new window.jspdf.jsPDF({
		orientation: 'p',
		unit: 'mm',
		format: 'letter',
		putOnlyUsedFonts: true
	});
	
	const fl = doc.getFontList();
	console.log("getFontList= " + JSON.stringify(fl, null, " "));

	const img_cod = get_code_img();
	//const id = "/?u=JoseLuisQuiroga";
	const id = "/?u=01234567890123456789";
	
	const txt = `Splits a given string into an array of strings. Uses 'size' value (in measurement units declared as default for the jsPDF instance) and the font's "widths" and "Kerning" tables, where available, to determine display length of a given string for a given font.`;
	
	const xx1 = 8;
	const xx2 = 110;
	const yy = 10;
	const hh = 50;
	const lines = 5;
	
	let ii = 0;
	for(ii = 0; ii < lines; ii++){
		const yy1 = yy + (hh * ii);
		add_side_1(doc, xx1, yy1, id, img_cod);
		add_side_1(doc, xx2, yy1, id, img_cod);
	}

	doc.addPage();	

	for(ii = 0; ii < lines; ii++){
		const yy1 = yy + (hh * ii);
		add_side_2(doc, xx1, yy1, txt);
		add_side_2(doc, xx2, yy1, txt);
	}
	
	doc.save("image_jspdf.pdf");	
}

function add_side_1(doc, xx, yy, id, img_cod){
	const mx = 4;
	const my = 5;
	doc.setFontSize(20);
	doc.setFont("Times", "bold");
	doc.text("SiBiblia.com", xx + mx, yy + my + 15);
	doc.setFontSize(12);
	doc.text(id, xx + mx, yy + my + 20);
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