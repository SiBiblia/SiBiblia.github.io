


// firebase apiKey access to Identity Toolkit API
// Requests to this API identitytoolkit method google.cloud.identitytoolkit.v1.ProjectConfigService.GetProjectConfig are blocked
// FirebaseAuth.getInstance().MOD_AUTH.signOut();


    MOD_DB.ref.transaction(function(value) {
      return (value || 0) + 1;
    });

-----------------------------------------------------------
    MOD_DB.ref.MOD_DB.set(admin.database.ServerValue.MOD_DB.increment(1));


		firebase.database()
			.MOD_DB.ref('users')
			.child(user_uid)
			.child('searches')
			.MOD_DB.set(firebase.database.ServerValue.MOD_DB.increment(1))
		
		db_ref.transaction(function(value) {
			return (value || 0) + 1;
		});
		
	const db_ref_cntr = MOD_DB.ref(fb_database, firebase_all_users_path + tc_fb_user.uid + "/num_checks")
	db_ref_cntr.MOD_DB.set(admin.database.ServerValue.MOD_DB.increment(1)).catch((error) => { 
		console.error(error); 
	});
		db_ref.MOD_DB.set(firebase.database.ServerValue.MOD_DB.increment(1)).catch((error) => { 
			console.error(error); 
		}
	
	
	try {
		const path_cntr = firebase_all_users_path + tc_fb_user.uid + "/num_checks";
		//fb_database.child(path_cntr).MOD_DB.set(ServerValue.MOD_DB.increment(1));
		
		const db_ref = MOD_DB.ref(fb_database, path_cntr);
		
		//db_ref.push({startedAt: firebase.database.ServerValue.TIMESTAMP});
		
		//db_ref.MOD_DB.set(fb_database.ServerValue.MOD_DB.increment(1));
		//db_ref.MOD_DB.set(firebase.database.ServerValue.MOD_DB.increment(1));
		//db_ref.MOD_DB.set(database.ServerValue.MOD_DB.increment(1));
		//db_ref.MOD_DB.set(ServerValue.MOD_DB.increment(1));
		MOD_DB.set(db_ref, MOD_DB.increment(1));
		
	} catch (error) {
		console.error(error); 
	}  
	

 function MOD_DB.runTransaction(e, t, n) {
 
 
 try {
    await db.MOD_DB.runTransaction(async (t) => {
      const doc = await t.MOD_DB.get(studentRef);
      const isPresent = doc.data().present;
      t.MOD_DB.update(studentRef, {population: true});
    });

    console.log('Transaction success!');
  } catch (e) {
    console.log('Transaction failure:', e);
  }
 
MOD_DB.runTransaction(
	
function addStar(uid, key) {
  import { MOD_DB.getDatabase, MOD_DB.increment, MOD_DB.ref, MOD_DB.update } from "firebase/database";
  const dbRef = MOD_DB.ref(MOD_DB.getDatabase());

  const updates = {};
  updates[`posts/${key}/stars/${uid}`] = true;
  updates[`posts/${key}/starCount`] = MOD_DB.increment(1);
  updates[`user-posts/${key}/stars/${uid}`] = true;
  updates[`user-posts/${key}/starCount`] = MOD_DB.increment(1);
  MOD_DB.update(dbRef, updates);
}	


	// THIS IS RECURSIVE BECAUSE MOD_DB.onValue MOD_DB.get called every time the value changes and MOD_DB.set changes the value
	MOD_DB.onValue(db_ref, (snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			const ii = num + 1;
			MOD_DB.set(db_ref, ii).catch((error) => { console.error(error); });
		} else {
			MOD_DB.set(db_ref, 0).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	}).catch((error) => {
		console.error(error);
	});
	
	const db_ref = MOD_DB.ref(fb_database, path_cntr);
	MOD_DB.set(db_ref, MOD_DB.increment(1)).catch((error) => { 
		console.error(error); 
	});
	
	
	

import { MOD_DB.getDatabase, MOD_DB.ref, MOD_DB.runTransaction } from "firebase/database";

function toggleStar(uid) {
  const db = MOD_DB.getDatabase();
  const postRef = MOD_DB.ref(db, '/posts/foo-bar-123');

  MOD_DB.runTransaction(postRef, (post) => {
    if (post) {
      if (post.stars && post.stars[uid]) {
        post.starCount--;
        post.stars[uid] = null;
      } else {
        post.starCount++;
        if (!post.stars) {
          post.stars = {};
        }
        post.stars[uid] = true;
      }
    }
    return post;
  });
}	

import { MOD_DB.getDatabase, MOD_DB.ref, child, MOD_DB.get } from "firebase/database";

const dbRef = MOD_DB.ref(MOD_DB.getDatabase());
MOD_DB.get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


	MOD_DB.onValue(db_ref, (snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			const ii = num + 1;
			MOD_DB.set(db_ref, ii).catch((error) => { console.error(error); });
		} else {
			MOD_DB.set(db_ref, 0).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	}, { onlyOnce: true} ).catch((error) => {
		console.error(error);
	});
	

import { MOD_DB.getDatabase, MOD_DB.ref, MOD_DB.onValue } from "firebase/database";
import { MOD_AUTH.getAuth } from "firebase/auth";

const db = MOD_DB.getDatabase();
const auth = MOD_AUTH.getAuth();

const userId = auth.currentUser.uid;
return MOD_DB.onValue(MOD_DB.ref(db, '/users/' + userId), (snapshot) => {
  const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // ...
}, {
  onlyOnce: true
});	

	
		  
	let inc_once = false;
	MOD_DB.onValue(db_ref, (snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			console.log("First time. No data before.");
			const ii = num + 1;
			if(! inc_once){
				inc_once = true;
				MOD_DB.set(db_ref, ii).catch((error) => { console.error(error); });
			}
		} else {
			MOD_DB.set(db_ref, 1).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	});
	//}, { onlyOnce: true} );
	
	.catch((error) => {
		console.error(error);
	})
	
	//RUNS BUT ALWAYS IS FIRST TIME
	MOD_DB.get(db_ref).then((snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			console.log(path_cntr + " WAS " + num);
			const ii = num + 1;
			MOD_DB.set(db_ref, ii).catch((error) => { console.error(error); });
		} else {
			MOD_DB.set(db_ref, 1).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	}).catch((error) => {
		console.error(error);
	});
	
	//RUNS BUT ALWAYS NAN
	MOD_DB.runTransaction(db_ref, (post) => {
		if (post) {
			console.log(path_cntr + "=");
			console.log(post);
			const num = Number(post.num_checks);	
			if(isNaN(num)){
				console.log(path_cntr + " WAS NaN !!!!");
				post.num_checks = 1;
			} else {
				const add1 = num + 1;
				post.num_checks = add1;
			}
		}
		return post;
	});
	
	//RUNS BUT IT DOES NOT DO ANYTHING
	
	const db_ref = MOD_DB.ref(fb_database);
	const path_cntr = firebase_all_users_path + tc_fb_user.uid + "/num_checks";
	//const path_cntr = firebase_all_users_path + "${uid}/num_checks";
	
	const updates = {};
	updates[path_cntr] = MOD_DB.increment(1);
	MOD_DB.update(db_ref, updates);
	
	MOD_DB.get(db_ref).then((snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			console.log(path_cntr + " WAS " + num);
			const ii = num + 1;
			MOD_DB.set(db_ref, ii).catch((error) => { console.error(error); });
		} else {
			MOD_DB.set(db_ref, 1).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	}).catch((error) => {
		console.error(error);
	});
	
	


In Firebase v9+, you need to use serverTimestamp():

import { getDatabase, ref, push, set, onValue, query, orderByChild, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";


set(newMessageRef, {
    'name': name.value,
    'message': message.value,
    'createdAt': serverTimestamp()
});

	
// ============================================================================================================================	
// ============================================================================================================================	
// ============================================================================================================================	

const element = document.getElementById('yourElementId'); // Replace 'yourElementId'

// Set grid-column-start using a line number
element.style.gridColumnStart = '2';

// Set grid-column-start using a named grid line
element.style.gridColumnStart = 'column-name';

// Set grid-column-start to span a certain number of columns
element.style.gridColumnStart = 'span 3';

// Set grid-column-start to span until a named grid line
element.style.gridColumnStart = 'span column-name';

import { getDatabase, ref, onValue, off } from "firebase/database";

const db = getDatabase();
const dataRef = ref(db, 'your/data/path');

// Listener function
const valueListener = onValue(dataRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});

// Detach the specific listener
off(dataRef, "value", valueListener);

// Detach all "value" listeners at the reference
off(dataRef, "value");

// Detach all listeners at the reference
off(dataRef);


// ----------------------------------------------------------------------------------------------------------


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


// ------------------------------------------------------------------------------

function show_photo2(url_photo){
	fetch(url_photo, {
		mode: 'cors',
		//mode: 'same-origin',
		//mode: 'no-cors',
		//mode: 'navigate',
	   headers: {
			//'Access-Control-Allow-Origin': 'http://localhost',
			'Origin': 'https://drive.usercontent.google.com',
	   },
	}).then(rr => rr.blob()).then((blob) => {
		console.log("Called show_photo2");
		const uu = URL.createObjectURL(blob);
		const im = document.createElement("img");
		im.src = uu;
		const dv_fld = document.getElementById(id_sibiblia_photo);
		dv_fld.appendChild(im);
	});
}

function show_photo(url_photo){
	const div = document.getElementById(id_sibiblia_photo);
	const sp = document.createElement("span");
	const im = document.createElement("img");
	im.classList.add("img_observ");
	im.src = url_photo;
	sp.appendChild(document.createTextNode("Uploading..."));
	sp.appendChild(im);
	div.appendChild(sp);
}

// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------



function user_has_google_id(){
  const cookies = document.cookie.split(';');
  let ii = 0;
  for(ii = 0; ii < cookies.length; ii++){
    const cookie = cookies[ii].trim();
	console.log('user_has_google_id. cookie=' + cookie);
    if(cookie.startsWith('__Secure-3PAPISID=') || cookie.startsWith('__Secure-3PSID=') || cookie.startsWith('APISID=')) {
		console.log('user_has_google_id. TIENE sesion.');
		return true;
    }
  }
  console.log('user_has_google_id. SIN sesion.');
  return false;	
}
function check_google(){
	console.log('CALLING check_google.');
	try{
		gapi.load('auth2', (pm) => {
			console.log('check_google. FINNISHED load.');
			gapi.auth2.init({ client_id: "313540425147-sgtmrf9uav4q7qs8ghmg4pce3n8sl28k.apps.googleusercontent.com" }).then((pm2) => {
				console.log('check_google. FINNISHED init.');
				const inst_auth = gapi.auth2.getAuthInstance();
				const is_sgin = inst_auth.isSignedIn.get();
				if(is_sgin){
					console.log('ESTA_LOGEADO_EN_GOOGLE');
				} else {
					console.log('no_esta_logeado_en_google');
				}
			});
		});
	} catch(error) {
		console.error(error);
	}
}

function check_google(){
	console.log('CALLING check_google.');
	try{
		google.accounts.id.initialize({
			//client_id: "313540425147-sgtmrf9uav4q7qs8ghmg4pce3n8sl28k.apps.googleusercontent.com",
			client_id: "313540425147-g2070bfjvbgvtjjefjd7r43s3vj8vlmu.apps.googleusercontent.com",
			callback: handle_ini_ok,
			error_callback: handle_ini_bad,
		});
		google.accounts.id.getStatus({
			callback: (status) => {
				if (status.signedIn) {
					console.log('User is already signed in.');
					// You can optionally retrieve more user details here
					google.accounts.id.getProfile()
					.then(profile => {
						console.log('User profile:', profile);
					})
					.catch(error => {
						console.error('Error getting user profile:', error);
					});
				} else {
					console.log('User is not signed in.');
				}
			}
		});
		//google.accounts.id.prompt();
		//handle_ini_ok();
		console.log('AFTER initialize.');
	} catch(error) {
		console.error(error);
	}
}

function handle_ini_ok(resp){
	console.log('CALLING handle_ini_ok.');
	console.log(resp);
	google.accounts.id.getStatus().then((status) => {
		if(status === google.accounts.id.SignInStatus.SESSION_ALIVE){
			console.log('TIENE SESION.');
		} else {
			console.log('no tiene sesion.');
		}
	});
}

function handle_ini_bad(resp){
	console.log('CALLING handle_ini_bad.');
	console.log(resp);
}

function check_google(){
	console.log('CALLING check_google.');
	if(fb_mod == null){
		console.log('check_google. (fb_mod == null)');
		return;
	}
	fb_mod.firebase_has_current_user();
}

//const APP_CLIENT_ID = "313540425147-sgtmrf9uav4q7qs8ghmg4pce3n8sl28k.apps.googleusercontent.com";
const APP_CLIENT_ID = "313540425147-g2070bfjvbgvtjjefjd7r43s3vj8vlmu.apps.googleusercontent.com";

function check_google(){
	console.log('CALLING check_google.');
	try{
		google.accounts.id.initialize({
			client_id: APP_CLIENT_ID,
			//cookiepolicy: 'single_host_origin',
			callback: handle_ini_ok,
			error_callback: handle_ini_bad,
		});
		//google.accounts.id.prompt();
		//handle_ini_ok();
		console.log('AFTER initialize.');
	} catch(error) {
		console.error(error);
	}
}

function handle_ini_ok(resp){
	console.log('CALLING handle_ini_ok.');
	console.log(resp);
	google.accounts.getTokens({
		client_id: APP_CLIENT_ID,
		callback: (response) => {
			if (response.accessToken) {
				console.log('handle_ini_ok. Sesión de Google INICIADA');
			} else {
				console.log('handle_ini_ok. Sesión de Google NO iniciada');
			}
		}
	});
}

function handle_ini_bad(resp){
	console.log('CALLING handle_ini_bad.');
	console.log(resp);
}

export function firebase_has_current_user(){
	init_mod_vars();
	try {
		if(tc_fb_app == null){ tc_fb_app = md_app.initializeApp(firebase_config); }
		if(tc_fb_auth == null){ tc_fb_auth = md_auth.getAuth(); }
		console.log("firebase_has_current_user. tc_fb_auth=");
		console.log(tc_fb_auth);
		if(tc_fb_auth.currentUser){
			console.log("firebase_has_current_user. tc_fb_auth.currentUser=");
			console.log(tc_fb_auth.currentUser);
		} else {
			console.log("firebase_has_current_user. NO TIENEN USUARIO EN SESION");
		}
	} catch(error){
		console.error("ERROR in firebase_has_current_user.");
		console.error(error);
	}
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

// ---------
// ---------
// ---------
// ---------

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
	
	const wr_data = {};
	wr_data[upd_path] = {};
	if((adm_rf_by != null) && (adm_nw_rf_of != null)){
		//wr_data[usr_rfr_pth] = {};
		wr_data[adm_rf_by] = curr_ci;
		wr_data[adm_nw_rf_of] = curr_ci;
	}
	
	const db_base_ref = fb_mod.md_db.ref(db);	
	fb_mod.md_db.update(db_base_ref, wr_data).catch((error) => { console.error(error); });	
}

/// --------------------------------------------------------------------------
/// --------------------------------------------------------------------------
/// --------------------------------------------------------------------------

 
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

msg_show_list_referred
​




