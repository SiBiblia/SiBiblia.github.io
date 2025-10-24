

import { get_new_dv_under, scroll_to_top, toggle_select_option, 
} from './bq_select_option_mgr.js';

import { gvar, set_bibrefs, set_obj_bibrefs, 
} from './bq_tools.js';

import { scroll_to_first_not_answered, get_bibref_in, 
	fb_mod, id_pop_menu_sele, user_logout, 
} from './bq_quest_mgr.js';

import { get_user_href, 
} from './bq_referrer_mgr.js';

import { gen_pdf_cards } from './bq_pdf_mgr.js'

const DEBUG_USER_INFO = true;

const STORAGE_CARD_VERSES = "STORAGE_CARD_VERSES";

const SUF_FLD_VISI = "SUF_FLD_VISI";

const firebase_user_info_path = "/user_info";
const id_user_sele = "id_user_sele";
const id_all_verses = "id_all_verses";

const fb_ids = {
	//id_ed_user_info: "id_ed_user_info",
	id_comm_info: "id_ed_user_comm_info",

	id_goo_name: "id_ed_user_goo_name",
	id_goo_photo: "id_ed_user_goo_photo",
	id_goo_email: "id_ed_user_goo_email",
	id_sibiblia_qr: "id_ed_sibiblia_qr",
	id_sibiblia_link: "id_ed_sibiblia_link",
	id_sibiblia_id: "id_ed_sibiblia_id",
	//id_sibiblia_photo: "id_ed_sibiblia_photo",

	id_nequi_number: "id_ed_user_nequi_number",
	id_paypal_email: "id_ed_user_paypal_email",
	id_transfiya_number: "id_ed_user_transfiya_number",
	//id_url_photo: "id_ed_user_url_photo",
	id_alias: "id_ed_user_alias",
	id_country: "id_ed_user_country",
	id_citizen_id_lbl: "id_ed_user_citizen_id_lbl",
	id_citizen_id: "id_ed_user_citizen_id",
	id_birth_year: "id_ed_user_birth_year",
	id_birth_month: "id_ed_user_birth_month",
	id_birth_day: "id_ed_user_birth_day",
	id_sex: "id_ed_user_sex",
	id_marital_status: "id_ed_user_marital_status",
	id_name: "id_ed_user_name",
	id_divorce_number: "id_ed_user_divorce_number",
	id_children_number: "id_ed_user_children_number",
	id_website: "id_ed_user_website",
	id_facebook: "id_ed_user_facebook",
	id_instagram: "id_ed_user_instagram",
	id_youtube: "id_ed_user_youtube",
};

/*
Gen, Exo, Lev, Num, Deu, 
Jos, Jdg, Rth, 1Sa, 2Sa, 1Ki, 2Ki, 1Ch, 2Ch, 
Ezr, Neh, Est, Job, Psa, Pro, Ecc, Sng, 
Isa, Jer, Lam, Eze, Dan, 
Hos, Joe, Amo, Oba, Jon, Mic, Nah, Hab, Zep, Hag, Zec, Mal, 
Mat, Mar, Luk, Jhn, Act, 
Rom, 1Co, 2Co, Gal, Eph, Phl, Col, 1Th, 2Th, 1Ti, 2Ti, Tit, Phm, 
Heb, Jas, 1Pe, 2Pe, 1Jo, 2Jo, 3Jo, Jde, Rev,
*/


export const default_card_verses = {
	"1": `BIBREF_Gen_1_1`,
	"2": `BIBREF_Isa_40_28`,
	"3": `BIBREF_Pro_3_19`,
	"4": `BIBREF_Psa_86_15`,
	"5": `BIBREF_Num_23_19`,
	"6": `BIBREF_Deu_32_4`,
	"7": `BIBREF_Psa_91_1_2`,
	"8": `BIBREF_Psa_46_1`,
	"9": `BIBREF_Isa_41_10`,
	"10": `BIBREF_Jer_29_13`,
};

/*
	: `BIBREF_Jhn_1_1`,
	: `BIBREF_2Pe_3_18`,
	: `BIBREF_2Th_3_16`,
	: `BIBREF_Heb_4_12`,
	: `BIBREF_Jas_4_7`,
	: `BIBREF_Phl_3_10`,
*/

function add_user_info_label(htm_txt){ 
	const inp_fld = document.createElement("div");
	inp_fld.innerHTML = htm_txt;
	inp_fld.classList.add("exam", "big_font", "bold_font");
	inp_fld.classList.add("grid_item_auto_auto");
	return inp_fld;
}

function add_user_info_end_line(fld_id){ 
	const inp_fld = document.createElement("div");
	inp_fld.id = fld_id + SUF_FLD_VISI;
	inp_fld.classList.add("exam");
	inp_fld.classList.add("grid_item_auto_rest"); 
	inp_fld.classList.add("medium_font");
	inp_fld.innerHTML = `<i class="has_icons icon-eye"></i>`;
	inp_fld.fb_visi = true;
	
	inp_fld.addEventListener('click', function() {
		if(inp_fld.fb_visi){
			inp_fld.fb_visi = false;
			inp_fld.innerHTML = `<i class="has_icons icon-no-eye"></i>`;
		} else {
			inp_fld.fb_visi = true;
			inp_fld.innerHTML = `<i class="has_icons icon-eye"></i>`;
		}
	});
	
	return inp_fld;
}

function add_user_info_field(id, tp, sz, mx_ln, val, snum){ // type "number" or "text"
	const g_col = "span " + snum;
	
	const inp_fld = document.createElement("input");
	inp_fld.id = id;
	inp_fld.type = tp;
	inp_fld.size = sz;
	inp_fld.maxlength = mx_ln;
	inp_fld.value = val;
	inp_fld.classList.add("exam");
	inp_fld.classList.add("grid_item_user");
	inp_fld.style.gridColumnEnd = g_col;
	return inp_fld;
}

function add_user_info_simple_line(dv_ed_usr, label, id, tp, sz, mx_ln, val){ 
	let lbl = null;
	let fld = null;
	
	lbl = add_user_info_label(label);
	dv_ed_usr.appendChild(lbl);

	fld = add_user_info_field(id, tp, sz, mx_ln, val, 10);
	dv_ed_usr.appendChild(fld);
	
	fld = add_user_info_end_line(id);
	dv_ed_usr.appendChild(fld);
}

function add_user_info_simple_html_line(dv_ed_usr, label, id, htm_str){
	let lbl = null;
	let fld = null;
	
	lbl = add_user_info_label(label);
	dv_ed_usr.appendChild(lbl);

	fld = dv_ed_usr.appendChild(document.createElement("div"));
	fld.id = id;
	fld.classList.add("exam");
	fld.classList.add("grid_item_user");
	fld.style.gridColumnEnd = "span 10";
	fld.innerHTML = htm_str;
	dv_ed_usr.appendChild(fld);

	const dv_info = fld;
	
	fld = add_user_info_end_line(id);
	dv_ed_usr.appendChild(fld);
	
	return dv_info;
}

function add_user_info_select_line(dv_ed_usr, label, id, val, arr_ops){ 
	let lbl = null;
	let fld = null;
	
	lbl = add_user_info_label(label);
	dv_ed_usr.appendChild(lbl);

	fld = dv_ed_usr.appendChild(document.createElement("div"));
	fld.id = id;
	fld.classList.add("exam");
	fld.classList.add("grid_item_user");
	fld.style.gridColumnEnd = "span 10";
	fld.classList.add("is_button");
	fld.innerHTML = val;
	
	const all_ops = arr_ops;
	const inp = fld;
	inp.addEventListener('click', function() {
		const all_vals = Object.values(all_ops);
		toggle_select_option(inp, id_user_sele, all_vals, null);
		scroll_to_top(inp);
		return;
	});
	dv_ed_usr.appendChild(fld);

	fld = add_user_info_end_line(id);
	dv_ed_usr.appendChild(fld);	
	
}

export async function toggle_user_info(fb_usr){
	init_verses_loc_storage();
	
	let lbl = null;
	let fld = null;
	const ulang = gvar.glb_curr_lang;
	
	const dv_user_sec = document.getElementById("id_user_info_sec");

	let dv_edit_user = null;
	dv_edit_user = get_new_dv_under(dv_user_sec, id_pop_menu_sele);
	if(dv_edit_user == null){
		if(DEBUG_USER_INFO){ console.log("toggle_user_info OFF"); }
		scroll_to_first_not_answered();
		return;
	}
	dv_edit_user.classList.add("exam");

	fld = document.createElement("div");
	fld.id = fb_ids.id_comm_info;
	fld.classList.add("exam");
	dv_edit_user.appendChild(fld);
	
	const dv_logout = dv_edit_user.appendChild(document.createElement("div"));
	dv_logout.classList.add("exam");
	dv_logout.classList.add("grid_item_auto_span_4");
	dv_logout.classList.add("is_big_button");
	dv_logout.innerHTML = ulang.msg_logout;
	dv_logout.addEventListener('click', function() {		
		dv_edit_user.remove();
		user_logout();
		scroll_to_first_not_answered();
		return;
	});
	
	const dv_ed_usr = document.createElement("div");
	dv_ed_usr.classList.add("exam");
	dv_ed_usr.classList.add("grid_user_info");
	dv_edit_user.appendChild(dv_ed_usr);
	
	let htm_str = "";
	
	// NON EDITABLE INFO
	
	if(fb_usr != null){ htm_str = fb_usr.displayName; }	
	add_user_info_simple_html_line(dv_ed_usr, ulang.msg_google_name, fb_ids.id_goo_name, htm_str);
	htm_str = "";
	if(fb_usr != null){ htm_str = `<img class="img_observ" src="${fb_usr.photoURL}">`; }	
	add_user_info_simple_html_line(dv_ed_usr, ulang.msg_google_photo, fb_ids.id_goo_photo, htm_str);
	htm_str = "";
	if(fb_usr != null){ htm_str = fb_usr.email; }	
	add_user_info_simple_html_line(dv_ed_usr, ulang.msg_google_email, fb_ids.id_goo_email, htm_str);
	htm_str = "";
	const dv_qrcod = add_user_info_simple_html_line(dv_ed_usr, ulang.msg_sibiblia_qr, fb_ids.id_sibiblia_qr, htm_str);
	dv_qrcod.classList.add("qr_code_img");
	let the_link = "";
	if(fb_usr != null){ 
		const the_qr_maker = new QRCode(dv_qrcod, {
			width : 300,
			height : 300,
		});
		the_link = get_user_href(fb_usr);
		//console.log("LINK for QR code = " + the_link);
		the_qr_maker.makeCode(the_link);
	}

	if(fb_usr != null){ htm_str = the_link; }	
	lbl = `<div style="display: flex; justify-content: space-between;"><span>${ulang.msg_sibiblia_link}</span>
				<span id="id_copy_link"><i class="medium_font has_icons icon-copy"></i></span>
		</div>`;
	add_user_info_simple_html_line(dv_ed_usr, lbl, fb_ids.id_sibiblia_link, htm_str);
	htm_str = "";
	lbl = `<div style="display: flex; justify-content: space-between;"><span>${ulang.msg_sibiblia_id}</span>
				<span id="id_copy_id"><i class="medium_font has_icons icon-copy"></i></span>
		</div>`;
	if(fb_usr != null){ htm_str = fb_usr.uid; }	
	add_user_info_simple_html_line(dv_ed_usr, lbl, fb_ids.id_sibiblia_id, htm_str);
	htm_str = "";
	
	add_copy_data_listener("id_copy_link", fb_ids.id_sibiblia_link);
	add_copy_data_listener("id_copy_id", fb_ids.id_sibiblia_id);
	
	//add_user_info_simple_html_line(dv_ed_usr, ulang.msg_sibiblia_photo, fb_ids.id_sibiblia_photo, htm_str);
	
	// EDITABLE INFO
	
	add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_nequi, fb_ids.id_nequi_number, "number", 10, 10, 0);
	add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_paypal, fb_ids.id_paypal_email, "text", 150, 150, "");
	add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_transfiya, fb_ids.id_transfiya_number, "number", 10, 10, 0);
	//add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_url_photo, fb_ids.id_url_photo, "text", 150, 150, "");
	
	lbl = `<div style="display: flex; justify-content: space-between;"><span>${ulang.msg_usr_pub_alias}</span>
			<div><span id="id_reset_alias"><i class="medium_font has_icons icon-undo-4"></i></span>
				<span id="id_check_alias"><i class="medium_font has_icons icon-square-check"></i></span>
			</div>
		</div>`;
	add_user_info_simple_line(dv_ed_usr, lbl, fb_ids.id_alias, "text", 150, 150, "");
	add_alias_checker();
	add_alias_reset();
	
	add_user_info_select_line(dv_ed_usr, ulang.msg_usr_country, fb_ids.id_country, gvar.glb_all_countries[gvar.glb_def_country], gvar.glb_all_countries);
	
	lbl = document.createElement("div");
	lbl.id = fb_ids.id_citizen_id_lbl;
	lbl.innerHTML = gvar.glb_all_id_names[gvar.glb_def_country];
	lbl.classList.add("exam", "big_font", "bold_font");
	lbl.classList.add("grid_item_auto_auto");
	dv_ed_usr.appendChild(lbl);

	fld = add_user_info_field(fb_ids.id_citizen_id, "number", 15, 15, 0, 10);
	dv_ed_usr.appendChild(fld);
	
	fld = add_user_info_end_line(fb_ids.id_citizen_id);
	dv_ed_usr.appendChild(fld);	

	lbl = add_user_info_label(ulang.msg_usr_birth_date);
	dv_ed_usr.appendChild(lbl);

	fld = add_user_info_field(fb_ids.id_birth_year, "number", 4, 4, 2024, 4);
	dv_ed_usr.appendChild(fld);
	
	fld = add_user_info_field(fb_ids.id_birth_month, "number", 2, 2, 12, 3);
	dv_ed_usr.appendChild(fld);
	
	fld = add_user_info_field(fb_ids.id_birth_day, "number", 2, 2, 31, 3);
	dv_ed_usr.appendChild(fld);
	
	fld = add_user_info_end_line(fb_ids.id_birth_day);
	dv_ed_usr.appendChild(fld);	
	
	add_user_info_select_line(dv_ed_usr, ulang.msg_usr_sex, fb_ids.id_sex, gvar.glb_all_sex["1"], gvar.glb_all_sex);
	
	add_user_info_select_line(dv_ed_usr, ulang.msg_usr_marital_status, fb_ids.id_marital_status, 
							  gvar.glb_all_marital[gvar.glb_def_marital], gvar.glb_all_marital);
	
	if(fb_usr != null){ htm_str = fb_usr.displayName; }	
	add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_name, fb_ids.id_name, "text", 150, 150, htm_str);
	htm_str = "";
	add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_divorce_num, fb_ids.id_divorce_number, "number", 1, 1, 123);
	add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_children_num, fb_ids.id_children_number, "number", 2, 2, 123);
	add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_website, fb_ids.id_website, "text", 150, 150, "");
	add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_facebook, fb_ids.id_facebook, "text", 150, 150, "");
	add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_instagram, fb_ids.id_instagram, "text", 150, 150, "");
	add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_youtube, fb_ids.id_youtube, "text", 150, 150, "");
	
	//gvar.glb_all_countries[gvar.glb_def_country]
	//gvar.glb_all_countries[gvar.glb_def_country]

	const dv_ok = dv_edit_user.appendChild(document.createElement("div"));
	dv_ok.classList.add("exam");
	dv_ok.classList.add("grid_item_auto_span_4");
	dv_ok.classList.add("is_big_button");
	dv_ok.innerHTML = ulang.msg_save;
	dv_ok.addEventListener('click', async function() {
		gvar.current_user_info = get_user_info_object();
		gvar.current_user_private_fields = get_user_private_fields();
		
		await write_firebase_user_object();
		await write_firebase_user_alias();
		await write_firebase_user_private_fields();
		
		dv_edit_user.remove();
		scroll_to_first_not_answered();		
		return;
	});
	
	const dv_cards = dv_edit_user.appendChild(document.createElement("div"));
	dv_cards.classList.add("exam");
	dv_cards.classList.add("grid_item_auto_span_4");
	dv_cards.classList.add("is_big_button");
	dv_cards.innerHTML = ulang.msg_gen_cards;
	dv_cards.addEventListener('click', function() {
		gen_pdf_cards();
		return;
	});
	
	const dv_cho_ver = dv_edit_user.appendChild(document.createElement("div"));
	dv_cho_ver.classList.add("exam");
	dv_cho_ver.classList.add("grid_item_auto_span_4");
	dv_cho_ver.classList.add("is_button");
	dv_cho_ver.classList.add("has_margin_bot");
	dv_cho_ver.classList.add("has_margin_top");
	dv_cho_ver.innerHTML = ulang.msg_choose_verses;
	dv_cho_ver.addEventListener('click', function() {
		choose_verses(dv_cho_ver);
		return;
	});
	
	if(fb_usr != null){
		read_firebase_user_object();
		read_firebase_user_private_fields();
		await read_firebase_general_private_fields();
	}	

	scroll_to_top(dv_edit_user);
}

function get_user_field(obj, id_fld, get_htm){
	const dv_fld = document.getElementById(id_fld);
	if(dv_fld == null){
		console.log("GET_user_field. No field with id = " + id_fld);
		return;
	}
	if(get_htm){
		obj[id_fld] = dv_fld.innerHTML;
	} else {
		obj[id_fld] = dv_fld.value;
	}
	if(DEBUG_USER_INFO){ 
		console.log("GET_user_field. id = " + id_fld + " = " + obj[id_fld]);
	}
}

function get_user_info_object(){
	const obj = {};
	//get_user_field(obj, fb_ids.id_sibiblia_link, true);
	//get_user_field(obj, fb_ids.id_sibiblia_id, true);
	get_user_field(obj, fb_ids.id_nequi_number);
	get_user_field(obj, fb_ids.id_paypal_email);
	get_user_field(obj, fb_ids.id_transfiya_number);
	// fb_ids.id_alias is SEPARETLY
	//get_user_field(obj, fb_ids.id_url_photo);
	get_user_field(obj, fb_ids.id_country, true);
	get_user_field(obj, fb_ids.id_citizen_id);
	get_user_field(obj, fb_ids.id_birth_year);
	get_user_field(obj, fb_ids.id_birth_month);
	get_user_field(obj, fb_ids.id_birth_day);
	get_user_field(obj, fb_ids.id_sex, true);
	get_user_field(obj, fb_ids.id_marital_status, true);
	get_user_field(obj, fb_ids.id_name);
	get_user_field(obj, fb_ids.id_divorce_number);
	get_user_field(obj, fb_ids.id_children_number);
	get_user_field(obj, fb_ids.id_website);
	get_user_field(obj, fb_ids.id_facebook);
	get_user_field(obj, fb_ids.id_instagram);
	get_user_field(obj, fb_ids.id_youtube);
	
	return obj;
}

function set_user_field(obj, id_fld, set_htm){
	const dv_fld = document.getElementById(id_fld);
	if(dv_fld == null){
		console.error(`dv_fld == null for ${id_fld}`);
		return;
	}
	let vv = obj[id_fld];
	if(vv == null){ vv = ""; }
	if(set_htm){
		dv_fld.innerHTML = vv;
	} else {
		dv_fld.value = vv;
	}
}

function fill_user_info(obj){
	if(obj == null){
		return;
	}
	/*const dv_fld = document.getElementById(fb_ids.id_sibiblia_photo);
	if(dv_fld != null){
		//  OpaqueResponseBlocking from GoogleDrive
		dv_fld.innerHTML = `<img class="img_observ" src="${obj[fb_ids.id_url_photo]}">`;
	}*/
	//show_photo(obj[fb_ids.id_url_photo]);
	//show_photo2(obj[fb_ids.id_url_photo]);
	
	//set_user_field(obj, fb_ids.id_sibiblia_link, true);
	//set_user_field(obj, fb_ids.id_sibiblia_id, true);
	set_user_field(obj, fb_ids.id_nequi_number);
	set_user_field(obj, fb_ids.id_paypal_email);
	set_user_field(obj, fb_ids.id_transfiya_number);
	//set_user_field(obj, fb_ids.id_url_photo);
	set_user_field(obj, fb_ids.id_alias);
	set_user_field(obj, fb_ids.id_country, true);
	set_user_field(obj, fb_ids.id_citizen_id_lbl);
	set_user_field(obj, fb_ids.id_citizen_id);
	set_user_field(obj, fb_ids.id_birth_year);
	set_user_field(obj, fb_ids.id_birth_month);
	set_user_field(obj, fb_ids.id_birth_day);
	set_user_field(obj, fb_ids.id_sex, true);
	set_user_field(obj, fb_ids.id_marital_status, true);
	set_user_field(obj, fb_ids.id_name);
	set_user_field(obj, fb_ids.id_divorce_number);
	set_user_field(obj, fb_ids.id_children_number);
	set_user_field(obj, fb_ids.id_website);
	set_user_field(obj, fb_ids.id_facebook);
	set_user_field(obj, fb_ids.id_instagram);
	set_user_field(obj, fb_ids.id_youtube);
}

async function write_firebase_user_object(){
	if(gvar.current_user_info == null){
		console.error(gvar.current_user_info == null);
		return;
	}
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	const user_id = fb_mod.tc_fb_user.uid;
	if(user_id == null){ console.error("user_id == null.");  return; }
	const usr_path = fb_mod.firebase_get_user_path(user_id);
	const usr_info_pth = usr_path + '/user_info/';

	const wr_data = JSON.parse(JSON.stringify(gvar.current_user_info));
	const db_ref = fb_mod.md_db.ref(fb_database, usr_info_pth);
	
	await fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
}

async function write_firebase_user_alias(){
	if(gvar.current_user_info == null){
		console.error(gvar.current_user_info == null);
		return;
	}
	const uinfo = gvar.current_user_info;
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	const user_id = fb_mod.tc_fb_user.uid;
	if(user_id == null){ console.error("user_id == null.");  return; }
	
	const usr_path = fb_mod.firebase_get_user_path(user_id);
	const usr_info_pth = usr_path + '/user_info/';
	const usr_alias_pth = usr_info_pth + fb_ids.id_alias;

	const obj = {};
	get_user_field(obj, fb_ids.id_alias);
	let nw_alias = obj[fb_ids.id_alias];
	let nw_fixed_alias = fix_alias(nw_alias);
	if(nw_fixed_alias == null){
		console.error("nw_fixed_alias == null");
		return;
	}
	
	let old_alias = uinfo[fb_ids.id_alias];
	if(old_alias == nw_alias){
		console.error("old_alias == nw_alias");
		return;
	}
	let old_fixed_alias = fix_alias(old_alias);

	let db_ref = null;
	try{
		const old_alias_pth = fb_mod.firebase_bib_quest_path + 'all_alias/' + old_fixed_alias + '/' + user_id;
		db_ref = fb_mod.md_db.ref(fb_database, old_alias_pth);
		await fb_mod.md_db.remove(db_ref);
		
		const nw_alias_pth = fb_mod.firebase_bib_quest_path + 'all_alias/' + nw_fixed_alias + '/' + user_id;
		
		const wr_data = {};
		wr_data[nw_alias_pth] = 1;
		wr_data[usr_alias_pth] = nw_alias;
		
		db_ref = fb_mod.md_db.ref(fb_database);
		await fb_mod.md_db.update(db_ref, wr_data);
	} catch (error){
		console.error(error);
		const dv_als = document.getElementById(fb_ids.id_alias);
		dv_als.classList.add("background_red");
	}
}

function read_firebase_user_object(){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	const user_id = fb_mod.tc_fb_user.uid;
	if(user_id == null){ console.error("user_id == null.");  return; }
	const usr_path = fb_mod.firebase_get_user_path(user_id);
	const usr_info_pth = usr_path + '/user_info/';

	const db_ref = fb_mod.md_db.ref(fb_database, usr_info_pth);
	fb_mod.md_db.onValue(db_ref, (snapshot) => {
		if (snapshot.exists()) {
			const rd_obj = snapshot.val();
			gvar.current_user_info = JSON.parse(JSON.stringify(rd_obj));
			if(DEBUG_USER_INFO){ 
				console.log("read_firebase_user_object. FULL_OBJ=");
				console.log(gvar.current_user_info);
			}
			fill_user_info(gvar.current_user_info);
		} else {
			gvar.current_user_info = get_user_info_object();
			if(DEBUG_USER_INFO){ 
				console.log("read_firebase_user_object. DEFAULT_OBJ=");
				console.log(gvar.current_user_info);
			}
			console.error("No data available");
		}
	});	
}

async function check_alias(){
	if(gvar.current_user_info == null){
		console.error(gvar.current_user_info == null);
		return;
	}
	const uinfo = gvar.current_user_info;

	let old_alias = uinfo[fb_ids.id_alias];
	let old_fixed_alias = fix_alias(old_alias);
	
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	const user_id = fb_mod.tc_fb_user.uid;
	if(user_id == null){ console.error("user_id == null.");  return; }
	
	const obj = {};
	get_user_field(obj, fb_ids.id_alias);
	let nw_alias = obj[fb_ids.id_alias];
	let nw_fixed_alias = fix_alias(nw_alias);
	if(nw_fixed_alias == null){
		console.error("nw_fixed_alias == null");
		return;
	}
	if(old_alias == nw_alias){
		console.error("old_alias == nw_alias");
		return;
	}
	
	const nw_alias_pth = fb_mod.firebase_bib_quest_path + 'all_alias/' + nw_fixed_alias;
	
	let db_ref = null;
	db_ref = fb_mod.md_db.ref(fb_database, nw_alias_pth);
	const snapshot = await fb_mod.md_db.get(db_ref);

	let ck_alias = null;
	if (snapshot.exists()) {
		ck_alias = snapshot.val();
		console.error(`alias ${ck_alias} ALREADY in use`);
		const kk = Object.keys(ck_alias)[0];
		const same = (kk == user_id);
		if(same){
			ck_alias = null;
		}
	}
	return ck_alias;
}

function add_alias_checker(){
	const dv_ck = document.getElementById("id_check_alias");
	const dv_als = document.getElementById(fb_ids.id_alias);
	dv_ck.addEventListener('click', async function() {
		const old_alias = await check_alias();
		if(old_alias != null){
			dv_als.classList.add("background_red");
			dv_als.classList.remove("background_green");
		} else {
			dv_als.classList.add("background_green");
			dv_als.classList.remove("background_red");
		}
	});
}

function add_alias_reset(){
	const dv_ck = document.getElementById("id_reset_alias");
	const dv_als = document.getElementById(fb_ids.id_alias);
	dv_ck.addEventListener('click', async function() {
		if(gvar.current_user_info == null){
			console.error(gvar.current_user_info == null);
			return;
		}
		const obj = gvar.current_user_info;
		set_user_field(obj, fb_ids.id_alias);
		
		dv_als.classList.remove("background_red");
		dv_als.classList.remove("background_green");
		
	});
}

function fix_alias(nw_alias){
	if(nw_alias == null){ return null;}
	if(nw_alias.length < 5){ return null;}
	if(nw_alias.length > 18){ return null;}
	let fx_alias = nw_alias.toLowerCase();
	fx_alias = fx_alias.replace(/\s+/g, '_');
	fx_alias = fx_alias.replaceAll('á', 'a');
	fx_alias = fx_alias.replaceAll('é', 'e');
	fx_alias = fx_alias.replaceAll('í', 'i');
	fx_alias = fx_alias.replaceAll('ó', 'o');
	fx_alias = fx_alias.replaceAll('ú', 'u');
	if(DEBUG_USER_INFO){
		console.log(`fix_alias. ${nw_alias} => ${fx_alias}`);
	}
	return fx_alias;
}

async function copy_in_clipboard(txt){
	try{
		if(txt != null){
			await navigator.clipboard.writeText(txt);
		}
	} catch(err){
		console.error(`${err}. ${txt}.`);
	}
}

function add_copy_data_listener(id_but, id_data){
	const dv_but = document.getElementById(id_but);
	const dv_dat = document.getElementById(id_data);
	dv_but.addEventListener('click', async function() {
		await copy_in_clipboard(dv_dat.innerHTML);
	});
}

function read_firebase_user_private_fields(){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	let user_id = fb_mod.tc_fb_user.uid;
	if(user_id == null){ console.error("user_id == null.");  return; }
	const usr_path = fb_mod.firebase_get_user_path(user_id);
	const usr_private_pth = usr_path + '/private_fields/';

	const db_ref = fb_mod.md_db.ref(fb_database, usr_private_pth);
	fb_mod.md_db.onValue(db_ref, (snapshot) => {
		if (snapshot.exists()) {
			const rd_obj = snapshot.val();
			gvar.current_user_private_fields = JSON.parse(JSON.stringify(rd_obj));
			if(DEBUG_USER_INFO){ 
				console.log("read_firebase_user_private_fields. FULL_OBJ=");
				console.log(gvar.current_user_private_fields);
			}
			fill_private_info(gvar.current_user_private_fields);
		} else {
			console.error("No data available");
		}
	});	
}

function fill_private_info(obj){
	if(obj == null){
		return;
	}
	const ids = Object.keys(obj);
	let ii = 0;
	for(ii = 0; ii < ids.length; ii++){
		const fld_id = ids[ii];
		const visi_id = fld_id + SUF_FLD_VISI;
		const dv_visi = document.getElementById(visi_id);
		dv_visi.fb_visi = false;
		dv_visi.innerHTML = `<i class="has_icons icon-no-eye"></i>`;
	}
}

function get_user_private_fields(){
	const obj = {};
	const ids = Object.values(fb_ids);
	let ii = 0;
	for(ii = 0; ii < ids.length; ii++){
		const fld_id = ids[ii];
		const visi_id = fld_id + SUF_FLD_VISI;
		const dv_visi = document.getElementById(visi_id);
		if(dv_visi == null){ continue; }
		if(dv_visi.fb_visi === false){
			obj[fld_id] = 1;
		}
	}
	if(DEBUG_USER_INFO){
		console.log("private_info=");
		console.log(obj);
	}
	return obj;
}

async function write_firebase_user_private_fields(){
	if(gvar.current_user_private_fields == null){
		return;
	}
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	const user_id = fb_mod.tc_fb_user.uid;
	if(user_id == null){ console.error("user_id == null.");  return; }
	const usr_path = fb_mod.firebase_get_user_path(user_id);
	const usr_info_pth = usr_path + '/private_fields/';

	const wr_data = JSON.parse(JSON.stringify(gvar.current_user_private_fields));
	const db_ref = fb_mod.md_db.ref(fb_database, usr_info_pth);
	
	await fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
}

async function read_firebase_general_private_fields(){
	if(DEBUG_USER_INFO){ console.log("Called read_firebase_general_private_fields"); }
	if(gvar.general_private_fields != null){
		fill_general_private_fields(gvar.general_private_fields);
		return;
	}
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	const gn_private_pth = fb_mod.firebase_bib_quest_path + 'private_fields/';

	if(DEBUG_USER_INFO){ console.log(`read_firebase_general_private_fields. ${gn_private_pth}`); }
	
	try{ 	
		const db_ref = fb_mod.md_db.ref(fb_database, gn_private_pth);
		const snapshot = await fb_mod.md_db.get(db_ref);
		if (snapshot.exists()) {
			const rd_obj = snapshot.val();
			gvar.general_private_fields = JSON.parse(JSON.stringify(rd_obj));
			fill_general_private_fields(gvar.general_private_fields);
		} else {
			console.error("No data available");
		}	
	} catch (error){
		console.error(error);
	}
	/*
	fb_mod.md_db.onValue(db_ref, (snapshot) => {
		if (snapshot.exists()) {
			const rd_obj = snapshot.val();
			gvar.general_private_fields = JSON.parse(JSON.stringify(rd_obj));
			fill_general_private_fields(gvar.general_private_fields);
		} else {
			console.error("No data available");
		}
	});	*/
}

function fill_general_private_fields(obj){
	if(obj == null){
		return;
	}
	if(DEBUG_USER_INFO){ 
		console.log("fill_general_private_fields. FULL_OBJ=");
		console.log(obj);
	}
	const ids = Object.keys(obj);
	let ii = 0;
	for(ii = 0; ii < ids.length; ii++){
		const fld_id = ids[ii];
		const visi_id = fld_id + SUF_FLD_VISI;
		const dv_visi = document.getElementById(visi_id);
		dv_visi.classList.add("is_color_grey");
	}
}

function choose_verses(dv_cho_ver){
	init_verses_loc_storage();
	const vss = gvar.card_verses;
	if(DEBUG_USER_INFO){ 
		console.log("choose_verses. ALL_VERSES=");
		console.log(vss);
	}
	const ulang = gvar.glb_curr_lang;

	let dv_all_vss = null;
	dv_all_vss = get_new_dv_under(dv_cho_ver, id_all_verses);
	if(dv_all_vss == null){
		if(DEBUG_USER_INFO){ console.log("toggle_all_verses OFF"); }
		return;
	}
	dv_all_vss.classList.add("exam", "has_margin_bot", "has_margin_top");
	
	const kks = Object.keys(gvar.card_verses);
	let ii = 0;
	for(ii = 0; ii < kks.length; ii++){
		const kk = kks[ii];
		
		const dv_vs_cont = document.createElement("div");		
		dv_vs_cont.classList.add("grid_verse");
		
		const id_vs = id_all_verses + "_" + kk;
		const dv_vs = document.createElement("div");
		dv_vs.classList.add("item_can_select");
		dv_vs.classList.add("grid_item_auto_auto");
		dv_vs.id = id_vs;
		dv_vs.innerHTML = vss[kk];
		dv_vs.addEventListener('click', async function() {
			get_bibref_in(dv_vs, (dv_ed_cit, bibref) => {
				dv_vs.innerHTML = bibref;
				dv_vs.plain_txt = true;
				set_bibrefs(dv_vs);
				dv_ed_cit.remove();
			});
		});
		dv_vs_cont.appendChild(dv_vs);

		const dv_oper = document.createElement("div");
		dv_oper.classList.add("grid_item_auto_rest");
		
		const sp_del = document.createElement("span");
		sp_del.innerHTML = `<i class="has_icons icon-delete"></i>`;
		sp_del.addEventListener('click', async function() {
			dv_vs_cont.remove();
		});
		dv_oper.appendChild(sp_del);
		
		const sp_sel = document.createElement("span");
		sp_sel.innerHTML = `<i class="has_icons icon-square-check"></i>`;
		sp_sel.addEventListener('click', async function() {
		});
		dv_oper.appendChild(sp_sel);
		dv_vs_cont.appendChild(dv_oper);
		
		dv_all_vss.appendChild(dv_vs_cont);
	}

	const dv_ok = dv_all_vss.appendChild(document.createElement("div"));
	dv_ok.classList.add("item_can_select");
	//dv_ok.classList.add("is_button");
	dv_ok.innerHTML = ulang.msg_save_verses;
	dv_ok.addEventListener('click', async function() {
		let ii = 0;
		for(ii = 0; ii < kks.length; ii++){
			const kk = kks[ii];
			const id_vs = id_all_verses + "_" + kk;
			const dv_vs = document.getElementById(id_vs);
			vss[kk] = dv_vs.innerHTML;
		}
		write_verses_loc_storage();
		dv_all_vss.remove();
		scroll_to_top(dv_cho_ver, "center");
	});
	
}

function write_verses_loc_storage(){
	if(gvar.card_verses == null){ gvar.card_verses = default_card_verses; }
	const vss = gvar.card_verses;
	window.localStorage.setItem(STORAGE_CARD_VERSES, JSON.stringify(vss));
}

function read_verses_loc_storage(){
	let vss_str = window.localStorage.getItem(STORAGE_CARD_VERSES);
	if(vss_str != null){
		gvar.card_verses = JSON.parse(vss_str);
		if(DEBUG_USER_INFO){ 
			console.log("read_verses_loc_storage. ALL_VERSES=");
			console.log(gvar.card_verses);
		}
	}	
}

function init_verses_loc_storage(){
	if(gvar.card_verses != null){ 
		return;
	}
	gvar.card_verses = null;
	read_verses_loc_storage();
	if(gvar.card_verses == null){
		gvar.card_verses = default_card_verses;
		set_obj_bibrefs(gvar.card_verses);
	}
}



/* 
{
"id_ed_user_nequi_number":1,
"id_ed_user_paypal_email":1,
"id_ed_user_transfiya_number":1,
"id_ed_user_url_photo":1,
"id_ed_user_country":1,
"id_ed_user_citizen_id":1,
"id_ed_user_birth_year":1,
"id_ed_user_birth_month":1,
"id_ed_user_birth_day":1,
"id_ed_user_sex":1,
"id_ed_user_marital_status":1,
"id_ed_user_name":1,
"id_ed_user_divorce_number":1,
"id_ed_user_children_number":1,
"id_ed_user_website":1,
"id_ed_user_facebook":1,
"id_ed_user_instagram":1,
"id_ed_user_youtube":1
}
​
*/

