

import { get_new_dv_under, scroll_to_top, toggle_select_option, 
} from './bq_select_option_mgr.js';

import { gvar, set_bibrefs, set_cards_bibrefs, 
} from './bq_tools.js';

import { scroll_to_first_not_answered, get_bibref_in, 
	fb_mod, id_pop_menu_sele, user_logout, 
} from './bq_quest_mgr.js';

import { get_user_href, get_loc_confirmed_referrer, set_loc_confirmed_referrer, set_loc_cand_referrer, 
} from './bq_referrer_mgr.js';

import { gen_pdf_cards } from './bq_pdf_mgr.js'

const DEBUG_USER_INFO = true;
const DEBUG_USER_FIELDS = false;

const STORAGE_CARD_VERSES = "STORAGE_CARD_VERSES";

const SUF_FLD_VISI = "SUF_FLD_VISI";
const SUF_LBL_FLD = "SUF_LBL_FLD";

const firebase_user_info_path = "/user_info";
const id_user_sele = "id_user_sele";
const id_all_verses = "id_all_verses";

export const fb_general_private_ids = {
	id_comm_info: "id_ed_user_comm_info",
	id_sibiblia_qr: "id_ed_sibiblia_qr",
	id_sibiblia_link: "id_ed_sibiblia_link",
};

export const fb_ids = {
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

	id_referrer: "id_user_referrer",
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

const NUM_CARDS_IN_PAGE = 10;

export const default_card_verses = {
	"1": { txt: `BIBREF_Gen_1_1`, sel: true },
	"2": { txt: `BIBREF_Isa_40_28`, sel: true },
	"3": { txt: `BIBREF_Pro_3_19`, sel: true },
	"4": { txt: `BIBREF_Psa_86_15`, sel: true },
	"5": { txt: `BIBREF_Num_23_19`, sel: true },
	"6": { txt: `BIBREF_Deu_32_4`, sel: true },
	"7": { txt: `BIBREF_Psa_91_1_2`, sel: true },
	"8": { txt: `BIBREF_Psa_46_1`, sel: true },
	"9": { txt: `BIBREF_Isa_41_10`, sel: true },
	"10": { txt: `BIBREF_Jer_29_13`, sel: true },
	"11": { txt: `BIBREF_Jhn_1_1`, sel: false },
	"12": { txt: `BIBREF_2Pe_3_18`, sel: false },
	"13": { txt: `BIBREF_2Th_3_16`, sel: false },
	"14": { txt: `BIBREF_Heb_4_12`, sel: false },
	"15": { txt: `BIBREF_Jas_4_7`, sel: false },
	"16": { txt: `BIBREF_Phl_3_10`, sel: false },
};

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
	
	const flds = {};
	
	lbl = add_user_info_label(label);
	lbl.id = id + SUF_LBL_FLD;
	dv_ed_usr.appendChild(lbl);
	
	flds.lbl = lbl;

	fld = add_user_info_field(id, tp, sz, mx_ln, val, 10);
	dv_ed_usr.appendChild(fld);

	flds.fld = fld;
	
	fld = add_user_info_end_line(id);
	dv_ed_usr.appendChild(fld);

	flds.end = fld;
	
	return flds;
}

function add_user_div_field(id, htm_str){
	const fld = document.createElement("div");
	fld.id = id;
	fld.classList.add("exam");
	fld.classList.add("grid_item_user");
	fld.style.gridColumnEnd = "span 10";
	fld.innerHTML = htm_str;
	
	return fld;	
}

function add_user_info_simple_html_line(dv_ed_usr, label, id, htm_str){
	let lbl = null;
	let fld = null;
	
	const flds = {};
	
	lbl = add_user_info_label(label);
	lbl.id = id + SUF_LBL_FLD;
	dv_ed_usr.appendChild(lbl);

	flds.lbl = lbl;
	
	fld = add_user_div_field(id, htm_str);
	dv_ed_usr.appendChild(fld);

	flds.fld = fld;
	const dv_info = fld;
	
	fld = add_user_info_end_line(id);
	dv_ed_usr.appendChild(fld);
	
	flds.end = fld;
	
	return flds;
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

function is_show_fld(obj_usr, fld){
	if(obj_usr == null){ return true; }
	if(fld == null){ return true; }
	if(obj_usr[fld] != null){ return true; }
	return false;
}

export async function toggle_user_info(fb_usr, obj_usr){
	init_verses_loc_storage();
	
	let ln_flds = null;
	let lbl = null;
	let fld = null;
	let val_fld = null;
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
	if(obj_usr != null){ dv_edit_user.classList.add("brown_background"); }

	fld = document.createElement("div");
	fld.id = fb_ids.id_comm_info;
	fld.classList.add("exam");
	dv_edit_user.appendChild(fld);
	
	if(fb_usr != null){
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
	}
	
	if(obj_usr != null){
		const dv_usr_tit = dv_edit_user.appendChild(document.createElement("div"));
		dv_usr_tit.classList.add("exam");
		dv_usr_tit.classList.add("grid_item_auto_span_4");
		dv_usr_tit.classList.add("is_big_button");
		dv_usr_tit.innerHTML = obj_usr[fb_ids.id_sibiblia_id];
		dv_usr_tit.addEventListener('click', function() {		
			dv_edit_user.remove();
			scroll_to_first_not_answered();
		});
	}
	
	const dv_ed_usr = document.createElement("div");
	dv_ed_usr.classList.add("exam");
	dv_ed_usr.classList.add("grid_user_info");
	dv_edit_user.appendChild(dv_ed_usr);
	
	let htm_str = "";
	let show_fld = true;
	
	// NON EDITABLE INFO
	
	if(fb_usr != null){ htm_str = fb_usr.displayName; }
	show_fld = is_show_fld(obj_usr, fb_ids.id_goo_name);
	if((obj_usr != null) && show_fld){ htm_str = obj_usr[fb_ids.id_goo_name]; }
	if(show_fld){ add_user_info_simple_html_line(dv_ed_usr, ulang.msg_google_name, fb_ids.id_goo_name, htm_str); }
	htm_str = "";

	if(fb_usr != null){ htm_str = `<img class="img_observ" src="${fb_usr.photoURL}">`; }	
	show_fld = is_show_fld(obj_usr, fb_ids.id_goo_photo);
	if((obj_usr != null) && show_fld){ htm_str = `<img class="img_observ" src="${obj_usr[fb_ids.id_goo_photo]}">`; }
	if(show_fld){ add_user_info_simple_html_line(dv_ed_usr, ulang.msg_google_photo, fb_ids.id_goo_photo, htm_str); }
	htm_str = "";
	
	if(fb_usr != null){ htm_str = fb_usr.email; }	
	show_fld = is_show_fld(obj_usr, fb_ids.id_goo_email);
	if((obj_usr != null) && show_fld){ htm_str = obj_usr[fb_ids.id_goo_email]; }
	if(show_fld){ add_user_info_simple_html_line(dv_ed_usr, ulang.msg_google_email, fb_ids.id_goo_email, htm_str); }
	htm_str = "";
	
	let user_id = null;
	let the_link = "";
	if(fb_usr != null){ user_id = fb_usr.uid; }
	if(obj_usr != null){ user_id = obj_usr[fb_ids.id_sibiblia_id]; }
	ln_flds = add_user_info_simple_html_line(dv_ed_usr, ulang.msg_sibiblia_qr, fb_ids.id_sibiblia_qr, htm_str);
	const dv_qrcod = ln_flds.fld;
	dv_qrcod.classList.add("qr_code_img");
	if(user_id != null){ 
		const the_qr_maker = new QRCode(dv_qrcod, {
			width : 300,
			height : 300,
		});
		the_link = get_user_href(user_id);
		//console.log("LINK for QR code = " + the_link);
		the_qr_maker.makeCode(the_link);
	}
	htm_str = "";	

	lbl = `<div style="display: flex; justify-content: space-between;"><span>${ulang.msg_sibiblia_link}</span>
				<span id="id_copy_link"><i class="medium_font has_icons icon-copy"></i></span>
		</div>`;
	if(obj_usr != null){ lbl = ulang.msg_sibiblia_link; }
	if(user_id != null){ htm_str = the_link; }	
	add_user_info_simple_html_line(dv_ed_usr, lbl, fb_ids.id_sibiblia_link, htm_str);
	if(obj_usr == null){ add_copy_data_listener("id_copy_link", fb_ids.id_sibiblia_link); }
	htm_str = "";	
	
	lbl = `<div style="display: flex; justify-content: space-between;"><span>${ulang.msg_sibiblia_id}</span>
				<span id="id_copy_id"><i class="medium_font has_icons icon-copy"></i></span>
		</div>`;
	if(obj_usr != null){ lbl = ulang.msg_sibiblia_id; }
	if(user_id != null){ htm_str = user_id; }	
	add_user_info_simple_html_line(dv_ed_usr, lbl, fb_ids.id_sibiblia_id, htm_str);
	if(obj_usr == null){ add_copy_data_listener("id_copy_id", fb_ids.id_sibiblia_id); }
	htm_str = "";
	
	//add_user_info_simple_html_line(dv_ed_usr, ulang.msg_sibiblia_photo, fb_ids.id_sibiblia_photo, htm_str);
	
	// EDITABLE INFO
	
	show_fld = is_show_fld(obj_usr, fb_ids.id_nequi_number);
	if(show_fld){ add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_nequi, fb_ids.id_nequi_number, "number", 10, 10, 0); }
	show_fld = is_show_fld(obj_usr, fb_ids.id_paypal_email);
	if(show_fld){ add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_paypal, fb_ids.id_paypal_email, "text", 150, 150, ""); }
	show_fld = is_show_fld(obj_usr, fb_ids.id_transfiya_number);
	if(show_fld){ add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_transfiya, fb_ids.id_transfiya_number, "number", 10, 10, 0); }
	//add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_url_photo, fb_ids.id_url_photo, "text", 150, 150, "");
	
	show_fld = is_show_fld(obj_usr, fb_ids.id_alias);
	if(show_fld){ 
		lbl = `<div style="display: flex; justify-content: space-between;"><span>${ulang.msg_usr_pub_alias}</span>
				<div><span id="id_reset_alias"><i class="medium_font has_icons icon-undo-4"></i></span>
					<span id="id_check_alias"><i class="medium_font has_icons icon-square-check"></i></span>
				</div>
			</div>`;
		const skip_checker = (obj_usr != null);
		if(skip_checker){ lbl = ulang.msg_usr_pub_alias; }
		add_user_info_simple_line(dv_ed_usr, lbl, fb_ids.id_alias, "text", 150, 150, ulang.msg_usr_type_alias);
		if(! skip_checker){
			add_alias_checker("id_check_alias", fb_ids.id_alias, true);
			add_alias_reset();
		}
	}
	
	show_fld = is_show_fld(obj_usr, fb_ids.id_country);
	if(show_fld){ 
		add_user_info_select_line(dv_ed_usr, ulang.msg_usr_country, fb_ids.id_country, gvar.glb_all_countries[gvar.glb_def_country], gvar.glb_all_countries);
	}
	
	show_fld = is_show_fld(obj_usr, fb_ids.id_citizen_id);
	if(show_fld){ 
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
	}

	show_fld = is_show_fld(obj_usr, fb_ids.id_birth_day);
	if(show_fld){ 
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
	}
	
	show_fld = is_show_fld(obj_usr, fb_ids.id_sex);
	if(show_fld){ add_user_info_select_line(dv_ed_usr, ulang.msg_usr_sex, fb_ids.id_sex, gvar.glb_all_sex["1"], gvar.glb_all_sex); }
	
	show_fld = is_show_fld(obj_usr, fb_ids.id_marital_status);
	if(show_fld){ 
		add_user_info_select_line(dv_ed_usr, ulang.msg_usr_marital_status, fb_ids.id_marital_status, 
							  gvar.glb_all_marital[gvar.glb_def_marital], gvar.glb_all_marital);
	}
	
	if(fb_usr != null){ htm_str = fb_usr.displayName; }	
	show_fld = is_show_fld(obj_usr, fb_ids.id_name);
	if(show_fld){ add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_name, fb_ids.id_name, "text", 150, 150, htm_str); }
	htm_str = "";
	show_fld = is_show_fld(obj_usr, fb_ids.id_divorce_number);
	if(show_fld){ add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_divorce_num, fb_ids.id_divorce_number, "number", 1, 1, 123); }
	show_fld = is_show_fld(obj_usr, fb_ids.id_children_number);
	if(show_fld){ add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_children_num, fb_ids.id_children_number, "number", 2, 2, 123); }
	show_fld = is_show_fld(obj_usr, fb_ids.id_website);
	if(show_fld){ add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_website, fb_ids.id_website, "text", 150, 150, ""); }
	show_fld = is_show_fld(obj_usr, fb_ids.id_facebook);
	if(show_fld){ add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_facebook, fb_ids.id_facebook, "text", 150, 150, ""); }
	show_fld = is_show_fld(obj_usr, fb_ids.id_instagram);
	if(show_fld){ add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_instagram, fb_ids.id_instagram, "text", 150, 150, ""); }
	show_fld = is_show_fld(obj_usr, fb_ids.id_youtube);
	if(show_fld){ add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_youtube, fb_ids.id_youtube, "text", 150, 150, ""); }
	
	show_fld = is_show_fld(obj_usr, fb_ids.id_referrer);
	val_fld = ulang.msg_no_referrer;
	if(obj_usr == null){ val_fld += ulang.msg_type_referrer; }
	if(show_fld){ add_user_info_simple_line(dv_ed_usr, ulang.msg_usr_referrer, fb_ids.id_referrer, "text", 25, 25, val_fld); }
	
	//gvar.glb_all_countries[gvar.glb_def_country]
	//gvar.glb_all_countries[gvar.glb_def_country]
	if(obj_usr != null){
		const dv_ok = dv_edit_user.appendChild(document.createElement("div"));
		dv_ok.classList.add("exam");
		dv_ok.classList.add("grid_item_auto_span_4");
		dv_ok.classList.add("is_big_button");
		dv_ok.innerHTML = ulang.msg_ok;
		dv_ok.addEventListener('click', function() {		
			dv_edit_user.remove();
			scroll_to_first_not_answered();
		});
		
		const filled_obj = await read_firebase_user_fields(obj_usr);
		filled_obj.ck_flds = true;
		if(DEBUG_USER_INFO){ console.log("toggle_user_info. FULL_OBJ="); console.log(filled_obj); }
		fill_user_info(filled_obj);
	}
	
	if(fb_usr != null){

		const dv_save = dv_edit_user.appendChild(document.createElement("div"));
		dv_save.classList.add("exam");
		dv_save.classList.add("grid_item_auto_span_4");
		dv_save.classList.add("is_big_button");
		dv_save.innerHTML = ulang.msg_save;
		dv_save.addEventListener('click', async function() {
			if(gvar.users_private_fields == null){ gvar.users_private_fields = {}; }
			
			gvar.current_user_info = get_user_info_object(fb_usr);
			gvar.users_private_fields[fb_usr.uid] = get_user_private_fields();
			
			await write_firebase_user_alias();
			await write_firebase_referrer();
			await write_firebase_user_private_fields();
			await write_firebase_user_object();
			
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
	
		await read_firebase_user_object();
	}

	await read_firebase_user_referrer(user_id);
	await read_firebase_user_private_fields(user_id);
	await read_firebase_general_private_fields();
	
	scroll_to_top(dv_edit_user);
}

function get_user_field(obj, id_fld, get_htm){
	const dv_fld = document.getElementById(id_fld);
	if(dv_fld == null){
		console.log("GET_user_field. No field with id = " + id_fld);
		return;
	}
	obj[id_fld] = null;
	if(get_htm){
		obj[id_fld] = dv_fld.innerHTML;
	} else {
		obj[id_fld] = dv_fld.value;
	}
	if(DEBUG_USER_INFO){ 
		console.log(`GET_user_field. elem(${id_fld}) = '${obj[id_fld]}'`);
	}
}

function get_user_info_object(fb_usr){
	const obj = {};
	//get_user_field(obj, fb_ids.id_sibiblia_link, true);
	if(fb_usr != null){
		let fld = fb_ids.id_goo_name;
		obj[fld] = fb_usr.displayName;
		if(obj[fld] == null){ obj[fld] = ""; }
		
		fld = fb_ids.id_goo_email;
		obj[fld] = fb_usr.email;
		if(obj[fld] == null){ obj[fld] = ""; }
		
		fld = fb_ids.id_goo_photo;
		obj[fld] = fb_usr.photoURL;
		if(obj[fld] == null){ obj[fld] = ""; }
		
		fld = fb_ids.id_sibiblia_id;
		obj[fld] = fb_usr.uid;
		if(obj[fld] == null){ obj[fld] = ""; }
	}
	//get_user_field(obj, fb_ids.id_url_photo);
	get_user_field(obj, fb_ids.id_nequi_number);
	get_user_field(obj, fb_ids.id_paypal_email);
	get_user_field(obj, fb_ids.id_transfiya_number);
	// fb_ids.id_alias is SEPARETLY
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

function set_user_field(obj, id_fld, set_htm, htm_txt){
	let vv = obj[id_fld];
	if(set_htm && (htm_txt != null)){
		vv = htm_txt;
	}
	if(obj.ck_flds && (vv == null)){
		return;
	}
	const dv_fld = document.getElementById(id_fld);
	if(dv_fld == null){
		console.error(`dv_fld == null for ${id_fld}`);
		return;
	}
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
	
	if(obj.ck_flds){
		set_user_field(obj, fb_ids.id_goo_name, true);
		set_user_field(obj, fb_ids.id_goo_email, true);
		const htm_str = `<img class="img_observ" src="${obj[fb_ids.id_goo_photo]}">`;
		set_user_field(obj, fb_ids.id_goo_photo, true, htm_str);
	}
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
	if(nw_alias == null){
		console.error(`nw_alias == null. FLD_ID='${fb_ids.id_alias}'`);
		return;
	}
	let nw_fixed_alias = fix_alias(nw_alias);
	if(nw_fixed_alias == null){
		console.error(`nw_fixed_alias == null. FROM_ALIAS='${nw_alias}'`);
		return;
	}
	
	let old_alias = gvar.current_user_alias;
	if(old_alias == nw_alias){
		console.error("old_alias == nw_alias");
		return;
	}
	let old_fixed_alias = fix_alias(old_alias);

	let db_ref = null;
	try{		
		const nw_alias_pth = fb_mod.firebase_bib_quest_path + 'all_alias/' + nw_fixed_alias + '/' + user_id;		
		const wr_data = {};
		wr_data[usr_alias_pth] = nw_alias;
		wr_data[nw_alias_pth] = 1;
		
		if(old_fixed_alias != null){
			const old_alias_pth = fb_mod.firebase_bib_quest_path + 'all_alias/' + old_fixed_alias + '/' + user_id;
			wr_data[old_alias_pth] = null;
			if(DEBUG_USER_INFO){ console.log(`write_firebase_user_alias. removing path=${old_alias_pth}`); }
		}
		
		db_ref = fb_mod.md_db.ref(fb_database);
		await fb_mod.md_db.update(db_ref, wr_data);
		if(DEBUG_USER_INFO){ console.log(`write_firebase_user_alias. updating nw_alias_pth=${nw_alias_pth} and usr_alias_pth=${usr_alias_pth}`); }
	} catch (error){
		console.error(error);
		const dv_als = document.getElementById(fb_ids.id_alias);
		dv_als.classList.add("background_red");
	}
}

async function read_firebase_user_object(){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	const user_id = fb_mod.tc_fb_user.uid;
	if(user_id == null){ console.error("user_id == null.");  return; }
	const usr_path = fb_mod.firebase_get_user_path(user_id);
	const usr_info_pth = usr_path + '/user_info/';

	const db_ref = fb_mod.md_db.ref(fb_database, usr_info_pth);
	const snapshot = await fb_mod.md_db.get(db_ref);
	if(snapshot.exists()) {
		const rd_obj = snapshot.val();
		gvar.current_user_info = JSON.parse(JSON.stringify(rd_obj));
		if(gvar.current_user_info[fb_ids.id_alias] != null){
			gvar.current_user_alias = gvar.current_user_info[fb_ids.id_alias];
		}
		if(DEBUG_USER_INFO){ 
			console.log("read_firebase_user_object. FULL_OBJ=");
			console.log(gvar.current_user_info);
		}
		fill_user_info(gvar.current_user_info);
	} else {
		gvar.current_user_info = get_user_info_object(fb_mod.tc_fb_user);
		if(DEBUG_USER_INFO){ 
			console.log("read_firebase_user_object. DEFAULT_OBJ=");
			console.log(gvar.current_user_info);
		}
		console.error("No user info available");
	}
}

async function is_valid_user(u_fld_id){ // returns null if INvalid otherwise returns obj with id and alias of the valid user
	const obj = {};
	get_user_field(obj, u_fld_id);
	let nw_alias = obj[u_fld_id];
	let nw_fixed_alias = fix_alias(nw_alias);

	if(fb_mod == null){ console.error("fb_mod == null."); return null; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return null; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	if(nw_fixed_alias == null){
		console.error(`nw_fixed_alias == null. orig_alias=${nw_alias}`);
	}
	let db_ref = null;
	try{
		if(nw_fixed_alias != null){
			const nw_alias_pth = fb_mod.firebase_bib_quest_path + 'all_alias/' + nw_fixed_alias;
			
			db_ref = fb_mod.md_db.ref(fb_database, nw_alias_pth);
			const snapshot = await fb_mod.md_db.get(db_ref);

			if(snapshot.exists()) {
				const dat = snapshot.val();
				const kk = Object.keys(dat)[0];
				if(kk != null){
					return { id:kk, alias:nw_alias, fx_alias:nw_fixed_alias, };
				}
			}
		}
		
		db_ref = fb_mod.md_db.ref(fb_database, fb_mod.firebase_users_list_path + nw_alias);
		const snapshot = await fb_mod.md_db.get(db_ref);
		if(snapshot.exists()) {
			return { id:nw_alias, alias: nw_alias, fx_alias:nw_fixed_alias, };
		}
	} catch(err){
		console.error(err);
	}
	
	return null;
}

function add_alias_checker(id_ck, id_fld, null_ok){
	const dv_ck = document.getElementById(id_ck);
	const dv_als = document.getElementById(id_fld);
	dv_ck.addEventListener('click', async function() {
		const old_alias = await is_valid_user(id_fld);
		let is_ok = (old_alias == null);
		if(! null_ok){ is_ok = ! is_ok;	}
		if(is_ok){
			dv_als.classList.add("background_green");
			dv_als.classList.remove("background_red");
		} else {
			if(old_alias != null){
				console.error(`alias ${old_alias.alias} for ${old_alias.id} ALREADY in use`);
			}
			dv_als.classList.add("background_red");
			dv_als.classList.remove("background_green");
		}
	});
}

function add_alias_reset(){
	const ulang = gvar.glb_curr_lang;
	const dv_ck = document.getElementById("id_reset_alias");
	const dv_als = document.getElementById(fb_ids.id_alias);
	dv_ck.addEventListener('click', async function() {
		const obj = {};
		if(gvar.current_user_alias != null){
			obj[fb_ids.id_alias] = gvar.current_user_alias;
		} else {
			obj[fb_ids.id_alias] = ulang.msg_usr_type_alias;
		}
		set_user_field(obj, fb_ids.id_alias);
		
		dv_als.classList.remove("background_red");
		dv_als.classList.remove("background_green");
		
	});
	dv_als.addEventListener('click', async function() {
		if(dv_als.value == ulang.msg_usr_type_alias){
			dv_als.value = "";
		}
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

async function read_firebase_user_private_fields(user_id){
	if(user_id == null){ console.error("user_id == null.");  return; }
	if(gvar.users_private_fields == null){ gvar.users_private_fields = {}; }
	
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	const usr_path = fb_mod.firebase_get_user_path(user_id);
	const usr_private_pth = usr_path + '/private_fields/';

	const db_ref = fb_mod.md_db.ref(fb_database, usr_private_pth);
	let u_prv_flds = null;
	try {
		const snapshot = await fb_mod.md_db.get(db_ref);
		if (snapshot.exists()) {
			const rd_obj = snapshot.val();
			gvar.users_private_fields[user_id] = JSON.parse(JSON.stringify(rd_obj));
			u_prv_flds = gvar.users_private_fields[user_id];
			if(DEBUG_USER_INFO){ 
				console.log(`read_firebase_user_private_fields(${user_id}). FULL_OBJ=`);
				console.log(u_prv_flds);
			}
			if(user_id == fb_mod.tc_fb_user.uid){
				fill_private_info(u_prv_flds);
			}
		} else {
			gvar.users_private_fields[user_id] = {};
			console.error(`No private fields available for user=${user_id}`);
		}
	} catch(err){
		console.error(err);
	}
	return u_prv_flds;
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
			if(fld_id == ids.id_birth_day){
				obj[ids.id_birth_year] = 1;
				obj[ids.id_birth_month] = 1;
			}
		}
	}
	if(DEBUG_USER_INFO){
		console.log("private_info=");
		console.log(obj);
	}
	return obj;
}

async function write_firebase_user_private_fields(){
	if(gvar.users_private_fields == null){ gvar.users_private_fields = {}; }
	
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	const user_id = fb_mod.tc_fb_user.uid;
	
	if(gvar.users_private_fields[user_id] == null){
		console.error(`gvar.users_private_fields[${user_id}] == null`);
		return;
	}
	const u_prv_flds = gvar.users_private_fields[user_id];
	
	if(user_id == null){ console.error("user_id == null.");  return; }
	const usr_path = fb_mod.firebase_get_user_path(user_id);
	const usr_info_pth = usr_path + '/private_fields/';

	const wr_data = JSON.parse(JSON.stringify(u_prv_flds));
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
			gvar.general_private_fields = {};
			console.error("No general private fields available");
		}	
	} catch (error){
		console.error(error);
	}
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
		if(dv_visi != null){
			dv_visi.classList.add("is_color_grey");
		}
	}
}

function calc_next_card_key(kk){
	let ii = Number(kk);
	ii++;
	const nxt = "" + ii;
	return nxt;
}

function add_card_verse(dv_all_vss, vss, kk){
	const ico_ck = `<i class="has_icons icon-square-check"></i>`;
	const ico_no_ck = `<i class="has_icons icon-white-square-check"></i>`;
	const dv_vs_cont = document.createElement("div");		
	dv_vs_cont.classList.add("grid_verse");
	dv_vs_cont.is_verse = true;
	
	const id_vs = id_all_verses + "_" + kk;
	const dv_vs = document.createElement("div");
	dv_vs.classList.add("item_can_select");
	dv_vs.classList.add("grid_item_auto_auto");
	dv_vs.id = id_vs;
	dv_vs.innerHTML = vss[kk].txt;
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
		let num_vs = Object.keys(vss).length;
		if(num_vs == NUM_CARDS_IN_PAGE){
			return;
		}
		
		dv_vs_cont.remove();
		delete vss[kk];
	});
	dv_oper.appendChild(sp_del);
	
	let kk_ico = null;
	if(vss[kk].sel){
		kk_ico = ico_ck;
	} else {
		kk_ico = ico_no_ck;
	}
	
	const sp_sel = document.createElement("span");
	sp_sel.innerHTML = kk_ico;
	sp_sel.addEventListener('click', async function() {
		vss[kk].sel = ! vss[kk].sel;
		if(vss[kk].sel){
			kk_ico = ico_ck;
		} else {
			kk_ico = ico_no_ck;
		}
		sp_sel.innerHTML = kk_ico;
	});
	dv_oper.appendChild(sp_sel);
	dv_vs_cont.appendChild(dv_oper);
	
	dv_all_vss.appendChild(dv_vs_cont);
}

function choose_verses(dv_cho_ver){
	init_verses_loc_storage();
	const vss = gvar.card_verses;
	if(DEBUG_USER_INFO){ 
		console.log("choose_verses. ALL_VERSES=");
		console.log(vss);
	}
	const ulang = gvar.glb_curr_lang;

	let dv_ed_vss = null;
	dv_ed_vss = get_new_dv_under(dv_cho_ver, id_all_verses);
	if(dv_ed_vss == null){
		if(DEBUG_USER_INFO){ console.log("toggle_all_verses OFF"); }
		return;
	}
	dv_ed_vss.classList.add("exam", "has_margin_bot", "has_margin_top");

	const dv_all_vss = dv_ed_vss.appendChild(document.createElement("div"));
	
	let kks = Object.keys(gvar.card_verses);
	let ii = 0;
	let kk = "0";
	for(ii = 0; ii < kks.length; ii++){
		kk = kks[ii];
		add_card_verse(dv_all_vss, vss, kk);
	}
	
	const dv_add = dv_ed_vss.appendChild(document.createElement("div"));
	dv_add.classList.add("item_can_select");
	dv_add.innerHTML = ulang.msg_add_verse;
	dv_add.addEventListener('click', async function() {
		const fst_txt = Object.values(vss)[0].txt;
		kk = calc_next_card_key(kk);
		vss[kk] = { txt: fst_txt, sel: false, };
		add_card_verse(dv_all_vss, vss, kk);
	});

	const dv_save = dv_ed_vss.appendChild(document.createElement("div"));
	dv_save.classList.add("item_can_select");
	dv_save.innerHTML = ulang.msg_save_verses;
	dv_save.addEventListener('click', async function() {
		let nkk = "0";
		const nvss = {};
		//for(const dv_vs of dv_all_vss.children) {
		//}
		kks = Object.keys(gvar.card_verses);
		let ii = 0;
		for(ii = 0; ii < kks.length; ii++){
			const kk = kks[ii];
			if(kk == null){ continue; }
			const id_vs = id_all_verses + "_" + kk;
			const dv_vs = document.getElementById(id_vs);
			vss[kk].txt = dv_vs.innerHTML;
			
			nkk = calc_next_card_key(nkk);
			nvss[nkk] = vss[kk];
		}
		
		gvar.card_verses = nvss;
		
		write_verses_loc_storage();
		dv_ed_vss.remove();
		scroll_to_top(dv_cho_ver, "center");
	});
	
}

function write_verses_loc_storage(){
	if(gvar.card_verses == null){ gvar.card_verses = default_card_verses; }
	const vss = gvar.card_verses;
	if(DEBUG_USER_INFO){ console.log("WRITE_STORAGE_VERSES="); console.log(vss); }
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
		set_cards_bibrefs(gvar.card_verses);
	}
}

async function read_firebase_user_referrer(user_id){
	if(user_id == null){
		console.error("user_id == null");
		return;
	}
	if(DEBUG_USER_INFO){ console.log("Called read_firebase_user_referrer"); }
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	const ulang = gvar.glb_curr_lang;

	const ref_pth = fb_mod.firebase_bib_quest_path + 'score_data/all_referred_by/' + user_id + '/referred_by/';
	const db_ref = fb_mod.md_db.ref(fb_database, ref_pth);
	
	const nw_rf_msg = ulang.msg_no_referrer + ulang.msg_type_referrer;
	
	try{ 	
		const dv_ref = document.getElementById(fb_ids.id_referrer);
		const snapshot = await fb_mod.md_db.get(db_ref);
		if (snapshot.exists()) {
			const rd_obj = snapshot.val();
			const obj_ref = JSON.parse(JSON.stringify(rd_obj));
			const uref = Object.keys(obj_ref)[0];
			
			const nw_but = add_user_div_field(fb_ids.id_referrer, ulang.msg_show_referrer);
			nw_but.classList.add("is_button");
			nw_but.id_referrer = uref;
			nw_but.addEventListener('click', async function() {
				await show_referrer(uref);
			});
			const pnt = dv_ref.parentNode;
			pnt.replaceChild(nw_but, dv_ref);
			
			const confir = get_loc_confirmed_referrer();
			if(confir != uref){
				set_loc_confirmed_referrer(uref);
				if(DEBUG_USER_INFO){ console.log("read_firebase_user_referrer. Setting confirmed referrer=" + uref); }
			}
			if(DEBUG_USER_INFO){ console.log("REFERRER_OBJ"); console.log(obj_ref); }
		} else {
			dv_ref.value = nw_rf_msg;
			const lbl = `<div style="display: flex; justify-content: space-between;"><span>${ulang.msg_usr_referrer}</span>
						<span id="id_ck_referrer"><i class="medium_font has_icons icon-square-check"></i></span>
				</div>`;
			const skip_checker = (user_id != fb_mod.tc_fb_user.uid);
			if(skip_checker){ lbl = ulang.msg_usr_referrer; }
			const lbl_id = fb_ids.id_referrer + SUF_LBL_FLD;
			const dv_lbl = document.getElementById(lbl_id);
			if(dv_lbl != null){
				dv_lbl.innerHTML = lbl;
			} else {
				console.error("dv_lbl == null");
			}
			if(! skip_checker){ add_alias_checker("id_ck_referrer", fb_ids.id_referrer, false); }
			
			/*
			const dv_ck_rf = document.getElementById("id_ck_referrer");
			dv_ck_rf.addEventListener('click', async function() {
				await write_firebase_referrer();
			});*/
			
			dv_ref.addEventListener('click', async function() {
				if(dv_ref.value == nw_rf_msg){
					dv_ref.value = "";
				}
				dv_ref.classList.remove("background_red");
				dv_ref.classList.remove("background_green");
			});
			console.error("No referrer available");
		}	
	} catch (error){
		console.error(error);
	}
}

async function write_firebase_referrer(){
	if(DEBUG_USER_INFO){ console.log("Called write_firebase_referrer"); }
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	const ulang = gvar.glb_curr_lang;
	const curr_ci = fb_mod.tc_fb_current_cicle;
	const user_id = fb_mod.tc_fb_user.uid;
	if(curr_ci == null){
		console.error("curr_ci == null");
		return;
	}
	if(user_id == null){
		console.error("user_id == null");
		return;
	}
	const dv_ref = document.getElementById(fb_ids.id_referrer);
	const the_referrer = dv_ref.value;
	const nw_rf_msg = ulang.msg_no_referrer + ulang.msg_type_referrer;
	if((the_referrer == nw_rf_msg) || (the_referrer == ulang.msg_no_referrer)){
		console.error(`the_referrer == ${the_referrer}`);
		return;
	}

	const alias_pth = fb_mod.firebase_bib_quest_path + 'all_alias/' + the_referrer;
		
	try{
		let uref = null;
		let db_ref = fb_mod.md_db.ref(fb_database, alias_pth);
		const snapshot = await fb_mod.md_db.get(db_ref);
		if (snapshot.exists()) {
			const obj = snapshot.val();
			uref = Object.keys(obj)[0];
			if(DEBUG_USER_INFO){ console.log(`write_firebase_referrer. FROM_ALIAS=${the_referrer} ID=${uref}`); }
			set_loc_cand_referrer(uref);
			await fb_mod.firebase_set_user_referrer();
		} else {
			uref = the_referrer;
			if(DEBUG_USER_INFO){ console.log(`write_firebase_referrer. FROM_ID=${uref}`); }
			set_loc_cand_referrer(uref);
			await fb_mod.firebase_set_user_referrer();
		}
	} catch(err){
		dv_ref.value = nw_rf_msg;
		console.error(err);
	}
	
}

async function show_referrer(uref){
	if(DEBUG_USER_INFO){ console.log(`Called show_referrer for ${uref}`); }	
	await read_firebase_user_private_fields(uref);
	await read_firebase_general_private_fields();
	const dv_usr = document.getElementById(id_pop_menu_sele);
	if(dv_usr != null){ dv_usr.remove(); }
	const obj = new_user_object(uref);
	await toggle_user_info(null, obj);
}

function arr_union(aa, bb){
	return [...new Set([...aa, ...bb])];
}

function arr_diff(aa, bb){
	return aa.filter(ee => ! bb.includes(ee));
}

function new_user_object(user_id){
	if(DEBUG_USER_INFO){ console.log("Called new_user_object"); }
	let obj = {};

	obj[fb_ids.id_sibiblia_id] = user_id;
	
	if(gvar.users_private_fields == null){ gvar.users_private_fields = {}; }
	let u_prv_flds = gvar.users_private_fields[user_id];
	if(u_prv_flds == null){
		console.error(`u_prv_flds == null for ${user_id}`);
		return;
	}
	u_prv_flds = Object.keys(u_prv_flds);
	
	let g_prv_flds = gvar.general_private_fields;
	if(g_prv_flds == null){
		console.error(`g_prv_flds == null`);
		return;
	}
	g_prv_flds = Object.keys(g_prv_flds);
	const all_pvt = arr_union( u_prv_flds, g_prv_flds);
	
	let all_fld = JSON.parse(JSON.stringify(fb_ids));
	all_fld = Object.values(all_fld);
	
	const all_to_read = arr_diff(all_fld, all_pvt);
	if(DEBUG_USER_INFO){ console.log(`new_user_object. user_id=${user_id} all_to_read=`); console.log(all_to_read); }

	let ii = 0;
	for(ii = 0; ii < all_to_read.length; ii++){
		const fld = all_to_read[ii];
		if(fld == fb_ids.id_sibiblia_id){
			continue;
		}
		obj[fld] = "";
	}
	return obj;
}

async function read_firebase_user_fields(obj){
	if(DEBUG_USER_INFO){ console.log("Called read_firebase_user_fields"); }
	
	const user_id = obj[fb_ids.id_sibiblia_id];
	if(user_id == null){ console.error("user_id == null.");  return; }
	
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	const usr_path = fb_mod.firebase_get_user_path(user_id);
	const usr_info_pth = usr_path + '/user_info/';	
	
	const all_to_read = Object.keys(obj);
	let ii = 0;
	try{
		for(ii = 0; ii < all_to_read.length; ii++){
			const fld = all_to_read[ii];
			if(fld == fb_ids.id_sibiblia_id){
				continue;
			}
			const fld_pth = usr_info_pth + fld;
			const db_ref = fb_mod.md_db.ref(fb_database, fld_pth);
			if(DEBUG_USER_FIELDS){ console.log(`read_firebase_user_fields. user_id=${user_id} fld_pth=${fld_pth}`); }
			
			const snapshot = await fb_mod.md_db.get(db_ref);
			if (snapshot.exists()) {
				const vfld = snapshot.val();
				obj[fld] = vfld;
				if(DEBUG_USER_FIELDS){ console.log(`read_firebase_user_fields. ${fld}=${vfld}`); }
			}
		}	
	} catch(err){
		console.error(err);
	}
	
	if(DEBUG_USER_INFO){ console.log("read_firebase_user_fields. FULL_OBJ="); console.log(obj); }
	return obj;
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

ali3_usu3
​
*/

