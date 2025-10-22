

"use strict";

import { gvar, 
} from './bq_tools.js';

import { fb_mod, 
} from './bq_quest_mgr.js';

import { get_user_href, 
} from './bq_referrer_mgr.js';

import { default_card_verses, 
} from './bq_user_info.js';

// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.3/jspdf.umd.min.js"></script>
//import * as MOD_PDF from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.3/jspdf.umd.min.js";

export function gen_pdf_cards(){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(gvar.current_user_info == null){
		console.error(gvar.current_user_info == null);
		return;
	}
	const uinfo = gvar.current_user_info;
	const fb_usr = fb_mod.tc_fb_user;

	const url = get_user_href(fb_usr);

	const user_id = uinfo.id_ed_user_alias;
	
	if(gvar.card_verses == null){ gvar.card_verses = default_card_verses; }	
	const arr_txt = Object.values(gvar.card_verses);
	
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