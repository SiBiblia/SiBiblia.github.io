
import { gvar, init_glb_vars, get_qid_base, init_default_lang, find_GET_parameter, clear_local_storage, 	
} from './bq_tools.js';

import { init_page_buttons, init_firebase_mgr, fb_mod, fill_div_user, init_page_exam, start_qmodu, update_qmodu_title, add_last_module_ending, 
	write_exam_object, read_exam_object, 
} from './bq_quest_mgr.js';

import { init_loc_cand_referrer, 
} from './bq_referrer_mgr.js';

import { init_qmodu_info, 	
} from '../quest_conf/bq_modules.js';

const PERSISTANT_STATE = true;

const DEBUG_INITS = false;
const DEBUG_CLEAR_STORAGE = true;
const DEBUG_LOADER = true;

const INVALID_MONAM = "INVALID_MONAM";
const INVALID_TITLE = "INVALID_TITLE";

const GET_var_clear_local_storage = "CLEAR_LOCAL_STORAGE";

let site_lang = "en";
let local_conf_qmodus = null;
let bq_st_user_finished_qmodules = null;

const STORAGE_FINI_QMODUS_ID = "STORAGE_FINI_QMODUS_ID";
const STORAGE_CURRENT_QMONAM = "STORAGE_CURRENT_QMONAM";
const FINISHED_QMONAM = "FINISHED_QMONAM";

function check_param_clear_loc_storage(){
	if(! DEBUG_CLEAR_STORAGE){
		return;
	}
		
	const clear_stg = find_GET_parameter(GET_var_clear_local_storage);
	if(clear_stg == "true"){
		clear_local_storage();
	}
}

function read_storage_fini_qmodus(){
	let all_fini_str = window.localStorage.getItem(STORAGE_FINI_QMODUS_ID);
	let all_fini = {};
	if(all_fini_str){
		all_fini = JSON.parse(all_fini_str);
	}
	return all_fini;
}

export function write_storage_fini_qmodus(all_fini){
	const prev = read_storage_fini_qmodus();
	const are_eq = objs_eq(prev, all_fini);
	if(! are_eq){
		window.localStorage.setItem(STORAGE_FINI_QMODUS_ID, JSON.stringify(all_fini));
	}
	return are_eq;
}

function objs_eq(obj1, obj2){
	const s1 = JSON.stringify(obj1);
	const s2 = JSON.stringify(obj2);
	return (s1 == s2);
}

export function set_fini_qmodu(qmonam){
	const all_fini = get_fini_qmodus();
	all_fini[qmonam] = 1;
	write_storage_fini_qmodus(all_fini);
}

export function is_fini_qmodu(qmonam){
	const all_fini = get_fini_qmodus();
	return all_fini[qmonam];
}

function get_fini_qmodus(){
	let all_fini = null;
	if((fb_mod != null) && (fb_mod.bq_fb_user_finished_qmodules != null)){ 
		all_fini = fb_mod.bq_fb_user_finished_qmodules;		
	} else if(bq_st_user_finished_qmodules != null){ 
		all_fini = bq_st_user_finished_qmodules;
	} else {
		bq_st_user_finished_qmodules = read_storage_fini_qmodus();
		all_fini = bq_st_user_finished_qmodules;
	}
	return all_fini;
}

function init_conf_qmodus(){
	if(local_conf_qmodus == null){ 
		const loc_vars = {};
		init_qmodu_info(loc_vars);
		local_conf_qmodus = loc_vars.conf_qmodus;
	}
	if(gvar.conf_qmodus == null){ 
		gvar.conf_qmodus = local_conf_qmodus;
	}
}

function get_nxt_qmonam(){
	const qmonam = get_next_qmonam();
	if(qmonam != null){
		window.localStorage.setItem(STORAGE_CURRENT_QMONAM, qmonam);
	} else {
		window.localStorage.setItem(STORAGE_CURRENT_QMONAM, FINISHED_QMONAM);
	}
	return qmonam;
}

function get_next_qmonam(){
	if(gvar.conf_qmodus == null){ console.error("get_nxt_qmonam. gvar.conf_qmodus == null."); return null; }
	if(gvar.conf_qmodus.all_qmodus == null){ console.error("get_nxt_qmonam. gvar.conf_qmodus.all_qmodus == null."); return null; }
	const all_qmonams = Object.keys(gvar.conf_qmodus.all_qmodus);
	const all_fini = get_fini_qmodus();
	for(const qmonam of all_qmonams){
		if(! is_qmodu_dnf_sat(qmonam, all_fini)){
			continue;
		}
		if(all_fini[qmonam] == null){
			return qmonam;
		}
	}
	if(all_qmonams.length > 0){
		const fst_qmonam = all_qmonams[0];
		if(all_fini[fst_qmonam] == null){
			return fst_qmonam;
		}
	}
	return null;
}

let md_lang = null;
let md_txt = null;
let md_cont_db = null;

async function import_file(mod_nm){
	if(mod_nm == null){ return null; }
	const resp = import(mod_nm);
	return resp;
}

function init_all_jsmod_handles(){
	//md_lang = null;  // old lang mng
	md_txt = null;
	md_cont_db = null;
}

async function import_qmodu_files(qmonam){
	if(gvar.conf_qmodus == null){ console.error("import_qmodu_files. gvar.conf_qmodus == null."); return; }
	
	init_all_jsmod_handles();

	let txt_fn = null;
	let db_fn = null;

	if(qmonam != null){
		const txt_fnams = gvar.conf_qmodus.all_qmodus[qmonam].text_lang;
		txt_fn = "../" + txt_fnams[site_lang];
		db_fn = "../" + gvar.conf_qmodus.all_qmodus[qmonam].quest_file;
	}
	const results = await Promise.all([
		import_file(txt_fn),
		import_file(db_fn),
	]);
	
	md_txt = results[0];
	md_cont_db = results[1];
}

function get_title(){
	if(gvar.current_qmonam == null){ console.error("write_firebase_qmodu_results. gvar.current_qmonam == null."); return INVALID_TITLE; }
	if(gvar.conf_qmodus == null){ return INVALID_TITLE; }
	const cf_qmodu = gvar.conf_qmodus.all_qmodus[gvar.current_qmonam];
	let title = gvar.current_qmonam;
	let d_nam = null;
	if(cf_qmodu.display_name != null){ d_nam = cf_qmodu.display_name[gvar.site_lang]; }
	if(d_nam != null){ title = d_nam; }
	
	return title;
}

export async function load_qmodu(qmonam, st_qmodu){
	init_all_jsmod_handles();
	const all_vars = {};
	init_default_lang(all_vars);
	md_lang.init_lang_module(all_vars);
	
	all_vars.site_img_dir = "../img/";
	all_vars.qmodu_img_dir = "../img/"
	all_vars.site_lang = site_lang;
	all_vars.qmodule_title = INVALID_TITLE;
	init_glb_vars(all_vars);	
	init_conf_qmodus();
	
	if(qmonam != null){ 
		console.log("CURRENT MODULE NAME:" + qmonam);	
		gvar.current_qmonam = qmonam;
		gvar.qmodule_title = get_title();
	}
	init_page_exam();
	
	await import_qmodu_files(qmonam);	

	update_qmodu_title();
	
	if(gvar.conf_qmodus.image_dir != null){ gvar.site_img_dir = "../" + gvar.conf_qmodus.image_dir + "/"; }
	
	if(qmonam != null){ 
		const cf_qmodu = gvar.conf_qmodus.all_qmodus[qmonam];	
		if(cf_qmodu.image_dir != null){ gvar.qmodu_img_dir = "../" + cf_qmodu.image_dir + "/"; }
	}	
	
	if(md_txt != null){
		md_txt.init_module_text();
	}

	if(md_cont_db != null){
		if(gvar.current_qmonam == null){ console.error("gvar.current_qmonam == null"); }
		gvar.init_qmodu_db = md_cont_db.init_exam_database;
		if(st_qmodu){ 
			if(PERSISTANT_STATE && (st_qmodu == 2)){ 
				read_exam_object(get_save_name()); 					
			} else {
				start_qmodu();
			}
		}
	}

	if(qmonam == null){
		add_last_module_ending();
	}
}

export async function load_next_qmodu(st_qmodu = 2){
	const qmonam = get_nxt_qmonam();
	console.log("load_next_qmodu. qmonam = " + qmonam);
	await load_qmodu(qmonam, st_qmodu);
}

function get_st_current_qmonam(){
	let qmonam = null;
	if(PERSISTANT_STATE){ qmonam = window.localStorage.getItem(STORAGE_CURRENT_QMONAM); }
	if(! qmonam){ 
		qmonam = get_nxt_qmonam();
	}
	if(qmonam == FINISHED_QMONAM){ 
		qmonam = null;
	}
	return qmonam;
}

function get_save_name(){
	if(gvar.current_qmonam == null){ console.error("get_save_name.(gvar.current_qmonam == null)"); return null; }
	if(gvar.conf_qmodus == null){ console.error("get_save_name.(gvar.conf_qmodus == null)"); return null; }
	const cf_qmodu = gvar.conf_qmodus.all_qmodus[gvar.current_qmonam];
	let d_nam = null;
	if(cf_qmodu.save_name != null){ d_nam = cf_qmodu.save_name[gvar.site_lang]; }
	return d_nam;
}

async function init_current_qmodu(){
	const qmonam = get_st_current_qmonam();
	console.log("Called init_current_qmodu. qmonam = " + qmonam);
	if(DEBUG_INITS){ console.trace(); }
	await load_qmodu(qmonam, 2);
	fill_div_user();
}

export async function start_module_mgr(lang_md, curr_lang){	
	md_lang = lang_md;
	site_lang = curr_lang;
		
	if(PERSISTANT_STATE){ window.addEventListener('beforeunload', save_current_qmodu_hdlr); }

	window.addEventListener('online', async () => {
		if(fb_mod == null){
			console.log("fb_mod == null. NO_FIREBASE CONNECTION. NOW WITH INTERNET. RELOADING PAGE.");
			location.reload();
		}
	});

	check_param_clear_loc_storage();
	
	init_page_buttons();
	init_conf_qmodus();
	init_loc_cand_referrer();
	
	try {
		await init_firebase_mgr();
		await init_current_qmodu();
	} catch(err) {
		console.error("start_module_mgr. init_firebase_mgr FAILED. " + err.message);
		await init_current_qmodu();
	}
	//check_google();
}

function save_current_qmodu_hdlr(){
	if(gvar.did_local_storage_clear){
		return;
	}
	if(gvar.current_qmonam != null){
		if(PERSISTANT_STATE){ write_exam_object(get_save_name()); }
	} 
}

function is_qmodu_dnf_sat(monam, all_fini){
	if(monam == null){ return false; }
	const qmodu = gvar.conf_qmodus.all_qmodus[monam];
	if(qmodu == null){ return false; }
	if(qmodu.debug){ console.log("Called is_qmodu_dnf_sat. monam=" + monam); }
	//if
	qmodu.last_sat_conj = null;
	
	if(qmodu.pre_req == null){ 
		return true;
	}
	
	const act_if = Object.entries(qmodu.pre_req);
	for (const [conj_id, conj_obj] of act_if) {
		if(conj_obj == null){ continue; }
		const conj = Object.entries(conj_obj);
		let conj_act = true;
		
		//console.log(" | monam=" + monam + " | conj_id=" + conj_id + " conj_obj=" + JSON.stringify(conj_obj, null, "  "));
		for (const [cond_monam, resps_obj] of conj) {
			if(all_fini[cond_monam] != resps_obj){
				conj_act = false; break; 
			}
		}
		if(conj_act){
			if(qmodu.debug){ console.log("is_qmodu_dnf_sat. monam=" + monam + " IS_SAT"); }
			qmodu.last_sat_conj = conj_id;
			return true;
		}
	}
	if(qmodu.debug){ console.log("is_qmodu_dnf_sat. monam=" + monam + " NOT_sat"); }
	qmodu.last_sat_conj = null;
	return false;
}

