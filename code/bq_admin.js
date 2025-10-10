
import { get_new_dv_under, scroll_to_top, toggle_select_option, 
} from './bq_select_option_mgr.js';

import { gvar, get_qid_base, bib_defaults, is_observation, get_date_and_time, clear_local_storage, 
} from './bq_tools.js';

import { start_qmodu, 
	fb_mod, close_pop_menu, id_pop_menu_sele, toggle_verse_ed, get_default_verse_obj, get_bibref_in, user_logout, calc_user_qmodule_score, 
	get_qmodule_score_weights, 
} from './bq_quest_mgr.js';

import { load_qmodu, load_next_qmodu, } from './bq_module_mgr.js';

import { get_bib_verse, } from './bq_bible_mgr.js';

import { test_pdf } from './bq_pdf_mgr.js'

const DEBUG_ADMIN_OPS = true;
const DEBUG_UPDATE_STATS = true;
const DEBUG_UPDATE_SCORES = true;
const DEBUG_UPDATE_REFERRERS = true;

const test_ids = {
	"user9" : "2s9VD9GYUYTAABs10uTc4ffPjIl1",
	"user8" : "aEGcnW9mryNAZXjdlo4dKLajiZj1",
	"user7" : "zRaEatJMbJbYMefNXjS8zTVtD5k1",
	"user6" : "2uRMCFlCeZQ4f4OwJc2Puas8zY73",
	"user5" : "sPh7cf5NvqTVkPZzPpWBcSH7tGc2",
	"user4" : "REAFsHwfknZupnUjCMjbaHoHDV13",
	"user3" : "AYIKhJkFuOXB01qAwzswq0mNdP73",
	"user2" : "0pm1Ys62dMc1Taz1gqDRMjA23Ex2",
	"user1" : "026iih43UqXvDQFsdFNhiTedtvB2",
	"admin" : "N5zHMUNEmXVEebV7CrevjAgys2R2",
};

const admin_ops = {
	//up_all:"Update ALL to Update",
	up_referrers:"Update ALL referrers",
	up_stats:"Update ALL stats and results",
	up_qmodu_ustats:"Update pending stats and results for current module",
	show_user_list:"Show user list",
	block_user:"Block user",
	unblock_user:"Unblock user",
	download_db:"Download Database",
	up_qmodu_observ:"Update current module observations",
	up_mods:"Update ALL module observations",
	//upload_index_W:`upload_index("W")`,
	//upload_index_S:`upload_index("S")`,
	//upload_index_A:`upload_index("A")`,
	//prt_tots:`print_totals()`,
	//prt_fl_tot:"print_file_totals()",
	//ini_atots:"init_ascii_totals()",
	//get_verse:"get bible verse",
	//is_google_user:"Check if google signed-in",
	//show_server_timestamp:"Show server timestamp",
	test_jdpdf:"test_jdpdf",
	//delete_all_strong:"delete_all_strong",
	//add_big_test_data:"add_big_test_data",
	//remove_big_test_data:"remove_big_test_data",
	//test_small_root_update: "test_small_root_update",
};

const test_ops = {
	//set_write_once_field:"set_write_once_field",
	//try_update_write_once_field:"try_update_write_once_field",
	//try_delete_write_once_field:"try_delete_write_once_field",
	
	//set_cannot_del_field:"set_cannot_del_field",
	//try_update_cannot_del_field:"try_update_cannot_del_field",
	//try_delete_cannot_del_field:"try_delete_cannot_del_field",
	
	//set_cannot_update_field:"set_cannot_update_field",
	//try_update_cannot_update_field:"try_update_cannot_update_field",
	//try_delete_cannot_update_field:"try_delete_cannot_update_field",
	
	//set_can_del_field:"set_can_del_field",
	//try_update_can_del_field:"try_update_can_del_field",
	//try_delete_can_del_field:"try_delete_can_del_field",

	set_adhoc_field:"set_adhoc_field",
	
	set_user_in_stats:"set_user_in_stats",
};

const id_admin_ops = "id_admin_ops";

async function do_selec(val_sel_w){
	if(val_sel_w == admin_ops.up_referrers){
		update_ALL_referrers();
	}
	if(val_sel_w == admin_ops.up_mods){
		update_ALL_qmodule_observations();
	}
	if(val_sel_w == admin_ops.up_stats){
		await update_ALL_stats_and_results();
	}
	if(val_sel_w == admin_ops.up_qmodu_observ){
		update_current_qmodule_observations();
	}
	if(val_sel_w == admin_ops.up_qmodu_ustats){
		await update_qmodule_stats(gvar.current_qmonam);
		await update_qmodule_results(gvar.current_qmonam);
	}
	if(val_sel_w == admin_ops.download_db){
		//test_php();
		//sim_download('test_sim_download_jlq.txt', 'HOLA JOSE FUNCIONO!');
		//generate_and_download();
		download_database();
	}
	if(val_sel_w == admin_ops.get_verse){
		test_get_verse();
	}
	if(val_sel_w == admin_ops.test_jdpdf){
		test_pdf();
	}
	if(val_sel_w == admin_ops.add_big_test_data){
		add_big_test_data();
	}
	if(val_sel_w == admin_ops.remove_big_test_data){
		remove_big_test_data();
	}
	if(val_sel_w == admin_ops.test_small_root_update){
		test_small_root_update();
	}
	
	if(val_sel_w == admin_ops.delete_all_strong){
		delete_all_strong();
	}
	if(val_sel_w == admin_ops.upload_index_W){
		upload_index("W");
	}
	if(val_sel_w == admin_ops.upload_index_S){
		upload_index("S");
	}
	if(val_sel_w == admin_ops.upload_index_A){
		upload_index("A");
	}
	if(val_sel_w == admin_ops.prt_tots){
		print_totals();
	}
	if(val_sel_w == admin_ops.prt_fl_tot){
		print_file_totals();
	}
	if(val_sel_w == admin_ops.ini_atots){
		init_ascii_totals();
	}
	if(val_sel_w == admin_ops.show_server_timestamp){
		get_server_timestamp();
	}
	
	close_pop_menu();
}

export function toggle_test_logins(){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	
	const dv_upper = document.getElementById("id_admin_ops_sec");
	let ii = 0;
	const test_users = {};
	for(ii = 1; ii < 10; ii++){
		test_users["user" + ii] = ii;
	}
	const all_vals = Object.keys(test_users);
	toggle_select_option(dv_upper, id_pop_menu_sele, all_vals, async function(dv_ret_w, dv_ops_w, val_sel_w, idx_sel_w){
		await user_logout();
		fb_mod.firebase_email_login(test_users[val_sel_w]);
	});
	
	scroll_to_top(dv_upper);
}

export function toggle_admin_opers(fb_usr){
	const dv_upper = document.getElementById("id_admin_ops_sec");
	const all_vals = Object.values(admin_ops);
	toggle_select_option(dv_upper, id_pop_menu_sele, all_vals, async function(dv_ret_w, dv_ops_w, val_sel_w, idx_sel_w){
		await do_selec(val_sel_w);
	});
	
	scroll_to_top(dv_upper);
}

function get_qmodule_observations_obj(){
	const all_obs = gvar.all_observations;
	if(all_obs == null){ console.error("all_obs == null"); }
	return all_obs;
}

function update_current_qmodule_observations(){
	if(gvar.current_qmonam == null){
		console.error("gvar.current_qmonam == null");
		return;
	}
	
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	const ref_path = fb_mod.firebase_bib_quest_path + "modules/" + gvar.current_qmonam;
	const obj = get_qmodule_observations_obj();  // THIS ONLY WORKS FOR CURRENT MODULE
	
	if(DEBUG_ADMIN_OPS){ 
		console.log("update_current_qmodule_observations. PATH=" + ref_path + " full_data=\n" + JSON.stringify(obj, null, "  ")); 
	}
	
	const db_ref = fb_mod.md_db.ref(fb_database, ref_path);
	console.log("update_current_qmodule_observations. db_ref = " + db_ref);
	fb_mod.md_db.set(db_ref, obj).catch((error) => { 
		console.error(error); 
	});	
}

async function update_user_qmodule_in_stats(fb_database, the_uid, qmonam, all_obs){
	const wr_data = {};
	
	const usr_path = fb_mod.firebase_get_user_path(the_uid);
	const old_stat_pth = usr_path + '/stats/to_add/' + qmonam;
	const in_stat_pth = usr_path + '/stats/in_stats/' + qmonam;
	const glb_stat_pth = fb_mod.firebase_bib_quest_path + 'stats/' + qmonam;	
	const to_upd_pth = fb_mod.firebase_bib_quest_path + 'to_update/stats/' + qmonam + '/' + the_uid;
	const old_last_ck = all_obs.last_check;
	const old_num_ck = all_obs.num_checks;
	
	const all_qids = Object.keys(all_obs);
	for(const qid of all_qids){
		if(qid == "num_checks"){ continue; }
		if(qid == "last_check"){ continue; }
		
		const inc_val = all_obs[qid];
		wr_data[in_stat_pth + '/' + qid] = fb_mod.md_db.increment(inc_val);
		wr_data[glb_stat_pth + '/' + qid] = fb_mod.md_db.increment(inc_val);
	}
	
	wr_data[in_stat_pth + '/last_check'] = fb_mod.md_db.serverTimestamp();
	wr_data[in_stat_pth + '/num_checks'] = fb_mod.md_db.increment(old_num_ck);
	wr_data[glb_stat_pth + '/last_check'] = fb_mod.md_db.serverTimestamp();
	wr_data[glb_stat_pth + '/num_checks'] = fb_mod.md_db.increment(old_num_ck);
	
	wr_data[old_stat_pth] = {};
	
	wr_data[to_upd_pth] = {};
	
	if(DEBUG_ADMIN_OPS){ console.log("update_user_qmodule_in_stats. full_data=" + JSON.stringify(wr_data, null, "  ")); }
	
	const db_ref = fb_mod.md_db.ref(fb_database);
	await fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
}

function get_user_stats_qmodule_path(the_uid, qmonam){
	if(fb_mod == null){ return ""; }
	if(qmonam == null){ return ""; }
	const path = fb_mod.firebase_users_path + the_uid + '/stats/to_add/' + qmonam + "/";
	return path;
}

async function update_user_qmodule_stats(fb_database, the_uid, qmonam){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(DEBUG_UPDATE_STATS){ console.log("update_user_qmodule_stats. Updating user " + the_uid + " | qmonam " + qmonam); }
	
	let path = null;
	let db_ref = null;
	let obj = null;
	
	const lock_pth = fb_mod.firebase_bib_quest_path + "doing_stats/" + the_uid;
	const lok_ref = fb_mod.md_db.ref(fb_database, lock_pth);
	await fb_mod.md_db.set(lok_ref, 1).catch((error) => { console.error(error); });	
	
	path = get_user_stats_qmodule_path(the_uid, qmonam);
	db_ref = fb_mod.md_db.ref(fb_database, path);
	
	const snapshot = await fb_mod.md_db.get(db_ref);

	if (snapshot.exists()) {
		const all_obs = snapshot.val();
		await update_user_qmodule_in_stats(fb_database, the_uid, qmonam, all_obs);
	}
	
	await fb_mod.md_db.remove(lok_ref);
}

async function update_qmodule_stats(qmonam){
	update_qmodule_repots_for(qmonam, "stats");
}

async function update_qmodule_results(qmonam){
	update_qmodule_repots_for(qmonam, "results");
}

async function update_qmodule_repots_for(qmonam, report){
	if(qmonam == null){
		console.error("CANNOT update_qmodule_stats. qmonam == null");
		return;
	}
	
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	//const ref_path = "users/list";
	const ref_path = fb_mod.firebase_bib_quest_path + "to_update/" + report + "/" + qmonam;
	const db_ref = fb_mod.md_db.ref(fb_database, ref_path);
	
	let func_report = update_user_qmodule_stats;
	if(report == "results"){
		func_report = update_user_qmodule_score;
	}
	
	const pg_sz = 100;
	let curr_pg = 1;
	let pg_found = true;
	
	if(DEBUG_UPDATE_STATS){ console.log("update_qmodule_stats. Updating all users for " + ref_path); }
	while(pg_found){
		const st_at = (curr_pg - 1) * pg_sz;
		curr_pg++;
		
		let cond1 = fb_mod.md_db.orderByKey();
		let cond2 = fb_mod.md_db.startAt(st_at.toString());
		let cond3 = fb_mod.md_db.limitToFirst(pg_sz);
		let db_qry = fb_mod.md_db.query(db_ref, cond1, cond2, cond3);
		let snapshot = await fb_mod.md_db.get(db_qry);
		
		pg_found = snapshot.exists();
		
		if(pg_found){
			const all_usr = snapshot.val();
			const all_uid = Object.keys(all_usr);
			if(DEBUG_UPDATE_STATS){ console.log("Updating users = " + JSON.stringify(all_uid)); }
			
			for(const the_uid of all_uid){
				await func_report(fb_database, the_uid, qmonam);
			}
		} else {
			console.log("update_qmodule_stats. No user list for " + ref_path);
			break;
		}
	}	
}

function test_php(){
	const obj = { 
		campo3: "Este es el campo3",
		campo4: "Este es el campo4",
	};
	const data = { 
		file_name: "mi_nombre_de_archivo",
		content: obj,
	};
	
	const the_obj = JSON.stringify(data, null, "  ");
	const url1 = "../backups/save.php";
	
	fetch(url1, {
		method:"POST",
		headers: {
		   'Content-Type':'application/json',
		},
		body: the_obj,
	}).then((data_recv) => {
		console.log(data_recv);
		data_recv.text().then((txt) => {
			console.log(">>>>>\n" + txt + "\n<<<<<\n");
		});
	});
	
	console.log("Called test_php");
}

/*
 < *div id="id_pop_opt_sec"></div>
 <div id="id_user_info_sec"></div>
 <div id="id_admin_ops_sec"></div>
 
 */

/*
function sim_download(filename, text) {
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	pom.setAttribute('download', filename);
	
	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	}
	else {
		pom.click();
	}
}

function generate_and_download(){
	const data = [];
	const obj = { 
		campo3: "Este es el campo3",
		campo4: "Este es el campo4",
	};
	const the_str = JSON.stringify(obj);
	data.push(the_str);
	
	const file = new File(data, "bajado.txt", {type: 'application/octet-stream'});
	var url = URL.createObjectURL(file);
	window.open(url);
	URL.revokeObjectURL(url); // This seems to work here.
}
*/

function download_database(){
	if(fb_mod == null){ console.error("download_database. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("download_database. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	const db_ref = fb_mod.md_db.ref(fb_database, fb_mod.firebase_bib_quest_path);
	
	fb_mod.md_db.get(db_ref).then((snapshot) => {
		if (snapshot.exists()) {
			const full_db = snapshot.val();
			save_file("FIREBASE_DATABASE_DOWLOADED.txt", full_db);
		} else {
			console.log("download_database. No database object !");
		}
	}).catch((error) => {
		console.error(error);
	});	
}

function save_file(nam, obj){
	const data = [];
	const the_str = JSON.stringify(obj, null, "  ");
	data.push(the_str);
	
	const file = new File(data, nam, {type: 'application/octet-stream'});
	var url = URL.createObjectURL(file);
	window.open(url);
	URL.revokeObjectURL(url); // This seems to work here.
}

function upload_index(kk){
	if(fb_mod == null){ console.error("upload_index. fb_mod == null."); return; }
	
	let code_kind = "code";
	if(kk == "S"){
		code_kind = "strong_code";
	} else if(kk == "W"){
		code_kind = "word_code";
	} else if(kk == "A"){
		code_kind = "ascii_code";
	}
	const mod_nm = "../bib_code_indexes/" + code_kind + ".js";
	import(mod_nm)
	.then((module) => {
		let obj = {};
		if(module != null){ 
			if(kk == "S"){
				obj = module.strong_code;
			} else if(kk == "W"){
				obj = module.word_code;
			} else if(kk == "A"){
				obj = module.ascii_code;
			}
			
			const pth = "bib_codes/" + code_kind;
			update_index_in_chunks(pth, obj).then((resp) => {
				console.log(`FINISHED UPLOAD OF ${mod_nm} OK`);
			});
		}
	})
	.catch((err) => {
		console.error(`Could NOT import ${mod_nm} err:` + err.message);
	});	
}

function print_totals(){
	if(fb_mod == null){ console.error("print_totals. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("print_totals. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	const pth1 = "bib_codes/strong_code/total";
	const db_ref1 = fb_mod.md_db.ref(fb_database, pth1);
	fb_mod.md_db.get(db_ref1).then((snapshot) => {
		if (snapshot.exists()) {
			const tot = snapshot.val();
			console.log(pth1 + " = " + tot);
		} else {
			console.log("print_totals. firebase get " + pth1 + " failed. No data.");
		}
	}).catch((error) => {
		console.error("print_totals. firebase get " + pth1 + " failed. Cannot get.");
		console.error(error);
	});

	const pth2 = "bib_codes/word_code/total";
	const db_ref2 = fb_mod.md_db.ref(fb_database, pth2);
	fb_mod.md_db.get(db_ref2).then((snapshot) => {
		if (snapshot.exists()) {
			const tot = snapshot.val();
			console.log(pth2 + " = " + tot);
		} else {
			console.log("print_totals. firebase get " + pth2 + " failed. No data.");
		}
	}).catch((error) => {
		console.error("print_totals. firebase get " + pth2 + " failed. Cannot get.");
		console.error(error);
	});

	const pth3 = "bib_codes/ascii_code/total";
	const db_ref3 = fb_mod.md_db.ref(fb_database, pth3);
	fb_mod.md_db.get(db_ref3).then((snapshot) => {
		if (snapshot.exists()) {
			const tot = snapshot.val();
			console.log(pth3 + " = " + tot);
		} else {
			console.log("firebase get " + pth3 + " failed. No data.");
		}
	}).catch((error) => {
		console.error("print_totals. firebase get " + pth3 + " failed. Cannot get.");
		console.error(error);
	});	
}

function init_strong_totals(){
	if(fb_mod == null){ console.error("init_strong_totals. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("init_strong_totals. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	const pth1 = "bib_codes/strong_code/total";
	const db_ref1 = fb_mod.md_db.ref(fb_database, pth1);
	fb_mod.md_db.set(db_ref1, 0).catch((error) => { 
		console.error(error); 
	});
}

function init_word_totals(){
	if(fb_mod == null){ console.error("init_word_totals. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("init_word_totals. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	const pth2 = "bib_codes/word_code/total";
	const db_ref2 = fb_mod.md_db.ref(fb_database, pth2);
	fb_mod.md_db.set(db_ref2, 0).catch((error) => { 
		console.error(error); 
	});
}

function init_ascii_totals(){
	if(fb_mod == null){ console.error("init_ascii_totals. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("init_ascii_totals. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	const pth3 = "bib_codes/ascii_code/total";
	const db_ref3 = fb_mod.md_db.ref(fb_database, pth3);
	fb_mod.md_db.set(db_ref3, 0).catch((error) => { 
		console.error(error); 
	});	
}

function get_file_total(kk){
	let code_kind = "code";
	if(kk == "S"){
		code_kind = "strong_code";
	} else if(kk == "W"){
		code_kind = "word_code";
	} else if(kk == "A"){
		code_kind = "ascii_code";
	}
	const mod_nm = "../bib_code_indexes/" + code_kind + ".js";
	import(mod_nm)
	.then((module) => {
		let obj = {};
		if(module != null){ 
			if(kk == "S"){
				obj = module.strong_code;
			} else if(kk == "W"){
				obj = module.word_code;
			} else if(kk == "A"){
				obj = module.ascii_code;
			}
			
			const all_keys = Object.keys(obj);
			console.log(`TOTAL KEYS IN ${mod_nm} =` + all_keys.length);
		}
	})
	.catch((err) => {
		console.error(`get_file_total. Could NOT import ${mod_nm} err:` + err.message);
	});	
}

function print_file_totals(){
	get_file_total("W");
	get_file_total("S");
	get_file_total("A");
}

async function update_index_in_chunks(pth, obj){
	if(fb_mod == null){ console.error("update_index_in_chunks. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("update_index_in_chunks. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	const db_ref = fb_mod.md_db.ref(fb_database, pth);

	const ctr_pth = pth + "/total";
	const db_cnter = fb_mod.md_db.ref(fb_database, ctr_pth);	
	await fb_mod.md_db.set(db_cnter, 0).catch((error) => { 
		console.error(error); 
	});
	
	const min_sz = 5000;
	
	const codes = Object.keys(obj);
	let wr_data = {};
	let chunk_sz = 0;
	for(const cod of codes){
		if(chunk_sz == min_sz){
			wr_data.total = fb_mod.md_db.increment(chunk_sz);
			await fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
			console.log("UPDATED " + pth); 
			wr_data = {};
			chunk_sz = 0;
		}
		wr_data[cod] = obj[cod];
		chunk_sz++;
	}
	if(chunk_sz > 0){
		wr_data.total = fb_mod.md_db.increment(chunk_sz);
		await fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
		console.log("UPDATED " + pth); 
	}
}

async function update_ALL_qmodule_observations(){
	if(gvar.conf_qmodus == null){ console.error("gvar.conf_qmodus == null."); return; }
	const all_qmonams = Object.keys(gvar.conf_qmodus.all_qmodus);
	for(const qmonam of all_qmonams){
		await load_qmodu(qmonam);
		if(gvar.init_qmodu_db != null){
			start_qmodu(true);
		}
		update_current_qmodule_observations();
	}
	await load_next_qmodu();
}

async function update_ALL_stats_and_results(){
	if(gvar.conf_qmodus == null){ console.error("gvar.conf_qmodus == null."); return; }
	const all_qmonams = Object.keys(gvar.conf_qmodus.all_qmodus);
	for(const qmonam of all_qmonams){
		await update_qmodule_stats(qmonam);
		await update_qmodule_results(qmonam);
	}
}

function test_get_verse(){
	const dv_ops = document.getElementById("id_pop_opt_sec");
	/*
	if(dv_ops.tc_cit_obj == null){
		dv_ops.tc_cit_obj = get_default_verse_obj();
	}
	
	toggle_verse_ed(dv_ops);
	*/
	
	//get_bibref_in(dv_ops);
	
	get_bib_verse("SBLM", "revelation", 22, 20).then((resp) => {
		dv_ops.innerHTML = resp;
	});
}

async function update_ALL_referrers(){	
	console.log("Called update_ALL_referrers.");
	
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	//const ref_path = "users/list";
	const ref_path = fb_mod.firebase_bib_quest_path + "to_update/referred_by";
	const db_ref = fb_mod.md_db.ref(fb_database, ref_path);

	const snapshot = await fb_mod.md_db.get(db_ref).catch((error) => { console.error("update_ALL_referrers. get failed." + error); });
	if(! snapshot.exists()) {
		console.log("update_ALL_referrers. Nothing to update.");
		return;
	}
	
	const all_usr = snapshot.val();
	const all_uid = Object.keys(all_usr);
	for(const the_uid of all_uid){
		update_user_referrer(fb_database, the_uid);
	}
	
}

async function update_user_referrer(fb_database, the_uid){
	const db = fb_database;
	
	if(fb_mod.tc_fb_current_cicle == null){
		console.error("fb_mod.tc_fb_current_cicle == null");
		return;
	}
	
	const curr_ci = fb_mod.tc_fb_current_cicle;
	const upd_path = fb_mod.firebase_bib_quest_path + "to_update/referred_by/" + the_uid;	
	const usr_path = fb_mod.firebase_get_user_path(the_uid);
	const usr_rfr_pth = usr_path + "/referred_by";
	const score_all_rfred = fb_mod.firebase_bib_quest_path + 'score_data/all_referred_by/';
	const score_all_rfrrer = fb_mod.firebase_bib_quest_path + 'score_data/all_referrer_of/';
	const old_rfr_pth = score_all_rfred + the_uid;

	if(DEBUG_UPDATE_REFERRERS){
		//console.log("upd_path=" + upd_path);
		console.log("usr_path=" + usr_path);
		console.log("usr_rfr_pth=" + usr_rfr_pth);
		console.log("old_rfr_pth=" + old_rfr_pth);
	}

	let nw_cand = null;
	let adm_rf_by = null; 
	let adm_nw_rf_of = null; 
	let adm_old_rf_of = null; 
	let db_ref = null;
	
	db_ref = fb_mod.md_db.ref(db, usr_rfr_pth);
	const snapshot = await fb_mod.md_db.get(db_ref);
	if(snapshot.exists()) {
		nw_cand = snapshot.val();
		if((nw_cand != null) && (nw_cand.cand != null)){
			adm_rf_by = score_all_rfred + the_uid + '/referred_by/' + nw_cand.cand + '/cicle_added';
			adm_nw_rf_of = score_all_rfrrer + nw_cand.cand + '/referrer_of/' + the_uid + '/cicle_added';
		} else {
			console.error(nw_cand);
		}
	} else {
		console.error("INEXISTANT PATH=" + usr_rfr_pth);
	}
	
	/*
	db_ref = fb_mod.md_db.ref(db, old_rfr_pth);
	const snapshot2 = await fb_mod.md_db.get(db_ref);
	if(snapshot2.exists()) {
		const old_rfr = snapshot2.val();
		if((old_rfr != null) && (old_rfr.referred_by != null)){
			adm_old_rf_of = fb_mod.firebase_bib_quest_path + 'score_data/all_referrer_of/' + old_rfr.referred_by + '/referrer_of/' + the_uid;
		} else {
			console.error(old_rfr);
		}
	} else {
		console.error("INEXISTANT PATH=" + old_rfr_pth);
	}*/
	
	const wr_data = {};
	wr_data[upd_path] = {};
	if((adm_rf_by != null) && (adm_nw_rf_of != null)){
		//wr_data[usr_rfr_pth] = {};
		wr_data[adm_rf_by] = curr_ci;
		wr_data[adm_nw_rf_of] = curr_ci;
		/*if(adm_old_rf_of != null){
			wr_data[adm_old_rf_of] = {};
		}*/
	}
	
	const db_base_ref = fb_mod.md_db.ref(db);	
	fb_mod.md_db.update(db_base_ref, wr_data).catch((error) => { console.error(error); });	
}

function get_server_timestamp(){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	//console.log(fb_mod.md_db);
	//fb_mod.md_db.serverTimestamp();

	const wr_data = {};
	
	const ref_path = fb_mod.firebase_bib_quest_path + "test_area/";
	
	wr_data[ref_path + 'timestamp_jlq'] = fb_mod.md_db.serverTimestamp();
	
	const db_ref = fb_mod.md_db.ref(fb_database);
	fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
	
	// 1746139712609
	// 2025/05/1 5:48 pm aprox
}

function delete_all_strong(){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	const pth3 = "bib_codes/word_code";
	
	let db_ref = fb_mod.md_db.ref(fb_database, pth3);
	let cond1 = fb_mod.md_db.limitToFirst(10000);
	let db_qry = fb_mod.md_db.query(db_ref, cond1);
	fb_mod.md_db.get(db_qry).then((snapshot) => {
		snapshot.forEach((chd) => {
			fb_mod.md_db.remove(chd.ref);
		});
	});	
	
	//fb_mod.md_db.remove(db_ref).catch((error) => { console.error(error); });	
}

function gen_cad(lng){
	let ii = 0;
	
	let min = 65;
	let max = 90;
	let cad = "";
	for(ii = 0; ii < lng; ii++){
		const cod_asc = Math.floor(Math.random() * (max - min + 1)) + min;
		cad += String.fromCharCode(cod_asc);
	}
	return cad;
}

async function add_big_test_data(){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	const pth3 = "bib_quest/test_data";
	
	let db_ref = fb_mod.md_db.ref(fb_database, pth3);
	let obj = {};
	
	let hh1 = 0;
	for(hh1 = 0; hh1 < 1000; hh1++){
		const dt = get_date_and_time(true);
		obj[dt] = {};
		
		let kk1 = 0;
		for(kk1 = 0; kk1 < 10; kk1++){
			const cad1 = gen_cad(30);
			obj[dt][cad1] = {};
			let kk2 = 0;
			for(kk2 = 0; kk2 < 10; kk2++){
				const cad2 = gen_cad(30);
				obj[dt][cad1][cad2] = {};
				let kk3 = 0;
				for(kk3 = 0; kk3 < 10; kk3++){
					const cad3 = gen_cad(30);
					obj[dt][cad1][cad2][cad3] = {};
					let kk4 = 0;
					for(kk4 = 0; kk4 < 10; kk4++){
						const cad4 = gen_cad(30);
						const cad5 = gen_cad(50);
						obj[dt][cad1][cad2][cad3][cad4] = cad5;
					}
				}
			}
		}
		
		await fb_mod.md_db.set(db_ref, obj).catch((error) => { 
			console.error(error); 
		});	
		
		console.log("WROTE OBJ " + hh1 + " date=" + dt);
		
	}	
}

function test_small_root_update(){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	const pth1 = "bib_quest/test_area";
	const pth2 = "bib_quest/scores";


	const wr_data = {};
	wr_data[pth1 + '/val001'] = "THIS_IS_VAL001";
	wr_data[pth2 + '/val002'] = "THIS_IS_VAL002";
	const db_ref = fb_mod.md_db.ref(fb_database);
	fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
}

async function remove_big_test_data(){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	const pth3 = "bib_quest/test_data";
	
	let db_ref = fb_mod.md_db.ref(fb_database, pth3);
	const pg_sz = 100;
	let curr_pg = 1;
	
	for(curr_pg = 1; curr_pg < 100; curr_pg++){
		const st_at = (curr_pg - 1) * pg_sz;
		
		let cond1 = fb_mod.md_db.orderByKey();
		let cond2 = fb_mod.md_db.startAt(st_at.toString());
		let cond3 = fb_mod.md_db.limitToFirst(pg_sz);
		let db_qry = fb_mod.md_db.query(db_ref, cond1, cond2, cond3);
		fb_mod.md_db.get(db_qry).then((snapshot) => {
			snapshot.forEach((chd) => {
				fb_mod.md_db.remove(chd.ref);
			});
		});	
		console.log("REMOVED OBJS IN PAGE " + curr_pg);
	}
	
	//fb_mod.md_db.remove(db_ref).catch((error) => { console.error(error); });	
}

export function toggle_test_opers(){
	const dv_upper = document.getElementById("id_admin_ops_sec");
	const all_vals = Object.values(test_ops);
	toggle_select_option(dv_upper, id_pop_menu_sele, all_vals, function(dv_ret_w, dv_ops_w, val_sel_w, idx_sel_w){
		do_test_oper(val_sel_w, null);
	});
	
	scroll_to_top(dv_upper);
}

function do_test_oper(oper, user_nam){
	if(oper == test_ops.set_write_once_field){
		set_field(user_nam, "write_once", "VAL_INI");
	}
	if(oper == test_ops.try_update_write_once_field){
		set_field(user_nam, "write_once", "VAL_UPDATE");
	}
	if(oper == test_ops.try_delete_write_once_field){
		set_field(user_nam, "write_once", null);
	}
	
	if(oper == test_ops.set_cannot_del_field){
		set_field(user_nam, "cannot_del", "VAL_INI");
	}
	if(oper == test_ops.try_update_cannot_del_field){
		set_field(user_nam, "cannot_del", "VAL_UPDATE");
	}
	if(oper == test_ops.try_delete_cannot_del_field){
		set_field(user_nam, "cannot_del", null);
	}

	if(oper == test_ops.set_cannot_update_field){
		set_field(user_nam, "cannot_update", "VAL_INI");
	}
	if(oper == test_ops.try_update_cannot_update_field){
		set_field(user_nam, "cannot_update", "VAL_UPDATE");
	}
	if(oper == test_ops.try_delete_cannot_update_field){
		set_field(user_nam, "cannot_update", null);
	}

	if(oper == test_ops.set_can_del_field){
		set_field(user_nam, "can_del", "VAL_INI");
	}
	if(oper == test_ops.try_update_can_del_field){
		set_field(user_nam, "can_del", "VAL_UPDATE");
	}
	if(oper == test_ops.try_delete_can_del_field){
		set_field(user_nam, "can_del", null);
	}
	
	if(oper == test_ops.set_adhoc_field){
		set_adhoc_field(user_nam, "VALOR_INICIAL");
	}

	if(oper == test_ops.set_user_in_stats){
		set_user_in_stats("ESTE_ES_UN_VALOR");
	}

	close_pop_menu();
}

function set_write_once_field(nw_val){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	const user_id = fb_mod.tc_fb_user.uid;
	const pth_test = "bib_quest/test_area";
	const sub_pth = '/users/' + user_id + "/write_once/campo_001";
	
	if(nw_val != null){	
		const wr_data = {};
		wr_data[sub_pth] = nw_val;
		
		const db_ref = fb_mod.md_db.ref(fb_database, pth_test);
		fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });		
	} else {
		const dpth = pth_test + sub_pth;
		console.log("TRYING DELETE path=" + dpth);
		const db_ref = fb_mod.md_db.ref(fb_database, dpth);
		fb_mod.md_db.remove(db_ref).catch((error) => { console.error(error); });		
	}
}

function set_cannot_del_field(nw_val){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	const user_id = fb_mod.tc_fb_user.uid;
	
	const pth_test = "bib_quest/test_area";
	const sub_pth = '/users/' + user_id + "/cannot_del/campo_001";
	
	if(nw_val != null){	
		const db_ref = fb_mod.md_db.ref(fb_database, pth_test);
		const wr_data = {};
		wr_data[sub_pth] = nw_val;
		fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });		
	} else {
		const db_ref = fb_mod.md_db.ref(fb_database, pth_test + sub_pth);
		fb_mod.md_db.remove(db_ref).catch((error) => { console.error(error); });		
	}
	
}

function set_field(user_nam, fld_type, nw_val){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	let user_id = fb_mod.tc_fb_user.uid;
	if(user_nam != null){
		user_id = test_ids[user_nam];
	}
	
	const pth_test = "bib_quest/test_area";
	const sub_pth = '/users/' + user_id + `/${fld_type}/campo_001`;
	
	if(nw_val != null){	
		const db_ref = fb_mod.md_db.ref(fb_database, pth_test);
		const wr_data = {};
		wr_data[sub_pth] = nw_val;
		fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });		
	} else {
		const db_ref = fb_mod.md_db.ref(fb_database, pth_test + sub_pth);
		fb_mod.md_db.remove(db_ref).catch((error) => { console.error(error); });		
	}
	
}

function set_adhoc_field(user_nam, nw_val){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	let user_id = fb_mod.tc_fb_user.uid;
	
	const usr_path = fb_mod.firebase_get_user_path(user_id);
	const val_pth = 'campo_001';
	
	if(nw_val != null){	
		const db_ref = fb_mod.md_db.ref(fb_database, usr_path);
		const wr_data = {};
		wr_data[val_pth] = nw_val;
		fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });		
	}
}

function set_user_in_stats(nw_val){
	
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	let user_id = fb_mod.tc_fb_user.uid;

	const usr_path = fb_mod.firebase_get_user_path(user_id);
	const qmonam = gvar.current_qmonam;	
	const val_pth = 'stats/in_stats/' + qmonam + '/last_check';
	
	if(nw_val != null){	
		const db_ref = fb_mod.md_db.ref(fb_database, usr_path);
		const wr_data = {};
		wr_data[val_pth] = nw_val;
		fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });		
	}
}

async function read_user_qmod_results(fb_database, the_uid, qmonam){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(DEBUG_UPDATE_SCORES){ console.log("read_user_qmod_results. Updating user " + the_uid + " | qmonam " + qmonam); }
	
	let db_ref = null;
	let obj = null;
	
	const results_pth = fb_mod.firebase_users_path + the_uid + '/results/' + qmonam + "/";
	db_ref = fb_mod.md_db.ref(fb_database, results_pth);
	
	const snapshot = await fb_mod.md_db.get(db_ref);

	let usr_resul = null;
	if (snapshot.exists()) {
		usr_resul = snapshot.val();
	} else {
		console.error("! snapshot.exists()");
	}
	
	return usr_resul;
}

async function remove_to_update_user_in_qmod(fb_database, the_uid, qmonam){
	const wr_data = {};
	const to_upd_pth = fb_mod.firebase_bib_quest_path + 'to_update/' + qmonam + '/' + the_uid;
	wr_data[to_upd_pth] = {};			
	const db_ref = fb_mod.md_db.ref(fb_database);
	await fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
	
	console.log("remove_to_update_user_in_qmod. DELETING path=" + to_upd_pth);
}

async function update_user_qmodule_score(fb_database, the_uid, qmonam){
	if(fb_mod == null){ console.error("fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("fb_mod.tc_fb_app == null.");  return; }
	if(DEBUG_UPDATE_SCORES){ console.log("update_user_qmodule_score. user_id=" + the_uid + " | qmonam " + qmonam); }
	
	const curr_ci = fb_mod.tc_fb_current_cicle;
	let qmod_scow = null;
	let usr_resul = null;
	
	try {
		qmod_scow = await get_qmodule_score_weights(fb_database, qmonam);
		usr_resul = await read_user_qmod_results(fb_database, the_uid, qmonam);
	} catch (error){
		console.error(error); 
		return;
	}
	
	let usr_score = calc_user_qmodule_score(qmod_scow, usr_resul.observ);
	
	const score_pth = fb_mod.firebase_bib_quest_path + 'score_data/all_qmodule_scores/' + the_uid + '/' + qmonam + '/';

	const wr_data = {};
	wr_data[score_pth] = {
		ts_reported : usr_resul.ts_reported,
		cicle_added : curr_ci,
		score: usr_score,
	};

	const to_upd_pth = fb_mod.firebase_bib_quest_path + 'to_update/results/' + qmonam + '/' + the_uid;
	wr_data[to_upd_pth] = {};

	if(DEBUG_UPDATE_SCORES){ console.log("update_user_qmodule_score. wr_data=" + JSON.stringify(wr_data, null, " ")); }
	
	const db_base_ref = fb_mod.md_db.ref(fb_database);
	fb_mod.md_db.update(db_base_ref, wr_data).catch((error) => { console.error(error); });	
};

async function download_current_cicle_scores(){
	if(fb_mod == null){ console.error("download_database. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("download_database. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	const all_cirr_scores_pth = fb_mod.firebase_bib_quest_path + 'score_data/all_qmodule_scores/';
	const db_ref = fb_mod.md_db.ref(fb_database, all_cirr_scores_pth);

	const curr_ci = fb_mod.tc_fb_current_cicle;
	
	let cond1 = fb_mod.md_db.orderByChild("cicle_added");
	let cond2 = fb_mod.md_db.equalTo(curr_ci);
	let db_qry = fb_mod.md_db.query(db_ref, cond1, cond2);
	let snapshot = await fb_mod.md_db.get(db_qry);
	if (snapshot.exists()) {
		const full_db = snapshot.val();
		save_file("CURRENT_SCORES_DOWLOADED.txt", full_db);
	} else {
		console.log("download_database. No database object !");
	}
}


