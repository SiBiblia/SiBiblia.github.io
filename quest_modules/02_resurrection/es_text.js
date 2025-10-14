
import { gvar, uppercase_words_in_string, set_stm_bibref, set_href_bibcit, } from '../../code/bq_tools.js';

import { init_en_poll_txt, } from './en_text.js';

"use strict";

export function init_module_text(){
	init_es_poll_txt();
}

export function init_es_poll_txt(){
	init_en_poll_txt();
	
	let cit_obj = null;
	let cit_kk = null;
	let cit_ref = null;
	let cit_txt = null;
	let rnam = null;	
	
	gvar.working_bible = "RVA";
	
	const rf = gvar.glb_all_bibrefs;
	const hb = gvar.glb_all_book_hrefs;
	const lg = gvar.glb_poll_txt;
	
	if(gvar.has_qrefs == null){ gvar.has_qrefs = {}; } 
	const qrf = gvar.has_qrefs;
	
	if(gvar.has_bibrefs == null){ gvar.has_bibrefs = {}; } 
	const brf = gvar.has_bibrefs;
	
	if(gvar.bibrefs_upper == null){ gvar.bibrefs_upper = {}; } 
	const brfup = gvar.bibrefs_upper;
	
	// ALL QUESTION IDS MUST END WITH DOBLE UNDERSCORE: "__"
	
	lg.qmodu_title = gvar.qmodule_title;  
	
	lg.a_simple_YES = `SI`;
	lg.a_simple_NO = `NO`;	

	const cl_jesus = `La biblia afirma que Jesucristo <br>`;
	const bf = `<span class='big_font'>`;
	const ef = `</span>`;

	const cl_ours = `La biblia afirma que nuestra resurrección será <br>`;
	
	lg.q_physical_resu = `${cl_jesus}${bf}resucitó en un cuerpo físico.${ef}`;
	lg.q_die_again = `${cl_jesus}${bf}NO volverá a morir.${ef}`;
	lg.q_alive_in_body_and_spirit = `${cl_jesus}${bf}está vivo en su cuerpo resucitado en una ciudad celestial.${ef}`;
	
	lg.q_like_jesus_body = `${cl_ours}${bf}en un cuerpo físico y en espíritu tal cual como Jesucristo.${ef}`;
	lg.q_memory = `${cl_ours}${bf}con memoria tal cual la resurrección de Jesucristo.${ef}`;
	lg.q_resemblance = `${cl_ours}${bf}con parecido físico tal cual la resurrección de Jesucristo.${ef}`;
	lg.q_for_all = `${cl_ours}${bf}para TODOS, los buenos y los malos.${ef}`;
	lg.q_not_yet = `${cl_ours}${bf}en el dia FINAL. No todavía.${ef}`;
	lg.q_new_earth = `${cl_ours}${bf}en una tierra NUEVA con unos cielos nuevos.${ef}`;

	lg.o_is_about_bible = `Tenga en cuenta que estas preguntas se refieren a lo que afirma la biblia, NO a lo que usted cree.`;
	lg.o_is_about_bible_nm = `Sobre La Biblia`;
	
	const cl_denial_bib_claim = `Usted parece estar en negación de lo que afirma la biblia respecto a `;
	const cl_accepting_bib_claim = `Usted parece estar ACEPTANDO lo que afirma la biblia respecto a `;
	const cl_denial_our_bib_claim = `${cl_denial_bib_claim} que nuestra futura resurrección `;
	const cl_accepting_our_bib_claim = `${cl_accepting_bib_claim} que nuestra futura resurrección `;
	
	lg.o_denial_physical_resu = `${cl_denial_bib_claim} que Jesucristo resucitó en un cuerpo físico.`;
	lg.o_denial_physical_resu_nm = `No cuerpo físico`;
	lg.o_accepting_physical_resu = `${cl_accepting_bib_claim} que Jesucristo resucitó en un cuerpo físico.`;
	lg.o_accepting_physical_resu_nm = `Cuerpo físico`;
	lg.o_denial_die_again = `${cl_denial_bib_claim} que Jesucristo resucitó para NO volver a morir.`;
	lg.o_denial_die_again_nm = `Morir de nuevo`;
	lg.o_accepting_die_again = `${cl_accepting_bib_claim} que Jesucristo resucitó para NO volver a morir.`;
	lg.o_accepting_die_again_nm = `No morir de nuevo`;
	lg.o_denial_alive_in_body_and_spirit = `${cl_denial_bib_claim} que Jesucristo está vivo en su cuerpo resucitado en una ciudad celestial.`;
	lg.o_denial_alive_in_body_and_spirit_nm = `No cuerpo y espíritu`;
	lg.o_accepting_alive_in_body_and_spirit = `${cl_accepting_bib_claim} que Jesucristo está vivo en su cuerpo resucitado en una ciudad celestial.`;
	lg.o_accepting_alive_in_body_and_spirit_nm = `Cuerpo y espíritu`;
	lg.o_denial_like_jesus_body = `${cl_denial_our_bib_claim} es en un cuerpo físico y en espíritu, tal cual como Jesucristo.`;
	lg.o_denial_like_jesus_body_nm = `NO como Jesus`;
	lg.o_accepting_like_jesus_body = `${cl_accepting_our_bib_claim} es en un cuerpo físico y en espíritu, tal cual como Jesucristo.`;
	lg.o_accepting_like_jesus_body_nm = `Como Jesus`;
	lg.o_denial_memory = `${cl_denial_our_bib_claim} es con MEMORIA tal cual la resurrección de Jesucristo.`;
	lg.o_denial_memory_nm = `No memoria`;
	lg.o_accepting_memory = `${cl_accepting_our_bib_claim} es con MEMORIA tal cual la resurrección de Jesucristo.`;
	lg.o_accepting_memory_nm = `Memoria`;
	lg.o_denial_resemblance = `${cl_denial_our_bib_claim} con parecido físico tal cual la resurrección de Jesucristo.`;
	lg.o_denial_resemblance_nm = `No parecido`;
	lg.o_accepting_resemblance = `${cl_accepting_our_bib_claim} con parecido físico tal cual la resurrección de Jesucristo.`;
	lg.o_accepting_resemblance_nm = `Parecido`;
	lg.o_denial_for_all = `${cl_denial_our_bib_claim} es para TODOS, los buenos y los malos.`;
	lg.o_denial_for_all_nm = `No para todos`;
	lg.o_accepting_for_all = `${cl_accepting_our_bib_claim} es para TODOS, los buenos y los malos.`;
	lg.o_accepting_for_all_nm = `Para todos`;
	lg.o_denial_not_yet = `${cl_denial_our_bib_claim} es en el dia FINAL. No todavía.`;
	lg.o_denial_not_yet_nm = `No todavía`;
	lg.o_accepting_not_yet = `${cl_accepting_our_bib_claim} es en el dia FINAL. No todavía.`;
	lg.o_accepting_not_yet_nm = `Si ya`;
	lg.o_denial_new_earth = `${cl_denial_our_bib_claim} es en una tierra NUEVA con unos cielos nuevos.`;
	lg.o_denial_new_earth_nm = `No tierra nueva`;
	lg.o_accepting_new_earth = `${cl_accepting_our_bib_claim} es en una tierra NUEVA con unos cielos nuevos.`;
	lg.o_accepting_new_earth_nm = `Tierra nueva`;

	let bcit = null;
	let numv = null;
	
	lg.q4_1__physical_sec = `<a class='exam_ref exam_title' href='${hb.href_physical_resu}'>Física</a>`;
	lg.q_jesus_physical = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> física de Jesucristo`;
	numv = "1"; bcit = "Luk_24_39";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["palpad,", "carne", "huesos,"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse1_should = "La CARNE y los HUESOS son FISICOS.";
	numv = "2"; bcit = "Jhn_20_27";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["mano,", "métela", "costado:"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse2_should = "Meter una MANO en el COSTADO es algo FISICO.";
	numv = "3"; bcit = "Act_10_41";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["comimos", "bebimos"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse3_should = "COMER y BEBER son acciones FISICAS.";
	numv = "4"; bcit = "Mat_28_9";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["abrazaron", "diciendo:", "pies,"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse4_should = "Decir, ABRAZAR los PIES de alguien es algo FISICO.";
	numv = "5"; bcit = "Luk_24_30";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["partió,", "tomando", "pan,", "dióles."] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse5_should = "TOMAR el PAN, PARTIRLO y DARLO es algo FISICO.";
	numv = "6"; bcit = "Jhn_2_19";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["templo,", "levantaré."] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse6_should = "RECONSTRUIR un cuerpo es algo FISICO.";
	numv = "7"; bcit = "Luk_24_43";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["tomó,", "comió"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse7_should = "COMER pescado asado es algo FISICO.";
	
	lg.q5_1__not_die_sec = `<a class='exam_ref exam_title' href='${hb.href_not_die_resu}'>Para NO volver a morir</a>`;
	lg.q_jesus_not_die = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de Jesucristo para NO VOLVER a morir`;
	numv = "1"; bcit = "Rom_6_9";
	set_stm_bibref(`q5_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["ya", "no", "muere:"] });
	set_href_bibcit(`q5_1__verse${numv}_href`, bcit);
	lg.q5_1__verse1_should = `Dice literalmente "YA NO MUERE"`;
	numv = "2"; bcit = "Heb_7_16";
	set_stm_bibref(`q5_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["vida", "indestructible."] });
	set_href_bibcit(`q5_1__verse${numv}_href`, bcit);
	lg.q5_1__verse2_should = `Dice literalmente "VIDA INDESTRUCTIBLE"`;
	numv = "3"; bcit = "Rev_1_18";
	set_stm_bibref(`q5_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["vivo", "para", "siempre."] });
	set_href_bibcit(`q5_1__verse${numv}_href`, bcit);
	lg.q5_1__verse3_should = `Dice literalmente "VIVO PARA SIEMPRE"`;
	numv = "4"; bcit = "Heb_7_25";
	set_stm_bibref(`q5_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["viviendo", "siempre", ] });
	set_href_bibcit(`q5_1__verse${numv}_href`, bcit);
	lg.q5_1__verse4_should = `Dice literalmente "VIVIENDO SIEMPRE"`;
	
	lg.q6_1__in_heaven_sec = `<a class='exam_ref exam_title' href='${hb.href_in_heaven_resu}'>En los cielos</a>`;
	lg.q6_1__in_heaven = `Seleccione todos los versiculos que soportan un Jesucristo <a class='exam_ref' href='${hb.href_resurrection}'>RESUCITADO</a> que esta en los cielos en CUERPO y Espíritu.`;
	lg.q6_1__verse1_str = uppercase_words_in_string(rf.act_1_11_str, ["tomado", "vendrá", "ir", "al", "en", "el", "cielo.", "cielo,", "cielo?"]);
	lg.q6_1__verse1_href = rf.act_1_11_href;
	numv = "1"; bcit = "Act_1_11";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["tomado", "vendrá", "ir", "al", "en", "el", "cielo.", "cielo,", "cielo?"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse1_should = "IR AL CIELO y VENDRA del cielo. El está físicamente en unos cielos físicos";
	numv = "2"; bcit = "Mat_26_64";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["sentado", "nubes", "cielo."] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse2_should = "El está SENTADO y viene en las NUBES del CIELO";
	numv = "3"; bcit = "Jhn_14_2";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["casa", "moradas", "lugar"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse3_should = "EL hace un LUGAR para sus dicípulos";
	numv = "4"; bcit = "Heb_9_12";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["entró", "santuario,"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse4_should = "El ENTRO al SANTUARIO que está en los cielos";
	numv = "5"; bcit = "Heb_10_12";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["está", "sentado"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse5_should = "El ESTA SENTADO en los cielos";
	numv = "6"; bcit = "Heb_13_8";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["es", "mismo", "siempre."] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse6_should = "El es SIEMPRE el MISMO. Luego si resucitó en CUERPO y espíritu, el TIENE que estar en CUERPO y espíritu en los cielos.";
	numv = "7"; bcit = "Col_1_15";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["imagen", "invisible;"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse7_should = "El es la IMAGEN del Dios INVISIBLE. Luego si era visible cuando resucitó, El tiene que SEGUIR siendo visible en los cielos.";
	
	lg.q7_1__like_jesus_sec = `<a class='exam_ref exam_title' href='${hb.href_like_jesus_resu}'>Como Jesucristo</a>`;
	lg.q7_1__like_jesus = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos semejante a la <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de Jesucristo`;
	numv = "1"; bcit = "Phl_3_21";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["semejante", "cuerpo", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse1_should = `Dice literalmente "SEMEJANTE al CUERPO"`;
	numv = "2"; bcit = "1Jo_3_2";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["semejantes", "á", "él,", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse2_should = `Dice literalmente "SEMEJANTES a EL"`;
	numv = "3"; bcit = "Luk_20_36";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["no", "pueden", "morir:", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse3_should = "Esos cuerpos NO PUEDEN MORIR";
	numv = "4"; bcit = "Heb_9_27";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["mueran", "una", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse4_should = "Estamos destinados a MORIR UNA vez. Solo UNA. No mas.";
	numv = "5"; bcit = "1Co_15_49";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["traeremos", "imagen", "celestial.", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse5_should = "TRAEREMOS la IMAGEN de lo CELESTIAL.";
	numv = "6"; bcit = "1Co_15_42";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["levantará", "incorrupción;"] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse6_should = "Lo que resucita es INCURRUPTIBLE";
	
	lg.q7_2__memory_sec = `<a class='exam_ref exam_title' href='${hb.href_like_jesus_resu}'>Con memoria, como Jesús</a>`;
	lg.q7_2__memory = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos con memoria, semejante a la <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de Jesucristo`;
	add_verse("q7_2", "1", "1Co_15_20", ["resucitado", "primicias", "durmieron", ], "Nuestra resurrección es como la de Jesucristo");
	add_verse("q7_2", "2", "Rev_20_12", ["juzgados", "según", "obras.", ], "Los resucitados son juzgados por obras que recuerdan");
	add_verse("q7_2", "3", "Luk_24_45", ["abrió", "sentido,", "Escrituras;", ], "Si usted EXPLICA algo anterior, usted lo recuerda");
	add_verse("q7_2", "4", "Jhn_21_15", ["Simón,", "hijo", "Jonás,", ], "SI usted llama a alguien por su nombre, lo recuerda");
	add_verse("q7_2", "5", "Jhn_11_11", ["despertarle", ], "Cuando uno se despierta recuerda lo anterior al sueño.");
	add_verse("q7_2", "6", "Jhn_21_17", ["tercera", "vez:", ], "Si usted recrea una situación, es porque la recuerda");
	add_verse("q7_2", "7", "Jhn_12_10", ["matar", "Lázaro;", ], "Lázaro era ejemplo de resurrección, no lo sería si no recordara nada");
	/*
	add_verse("q7_2", "6", "Jhn_11_4", ["no", "muerte,", "glorificado", ], "Lazaro no muere mas de cuatro dias, lo que implica que Lazaro recordaría");
	add_verse("q7_2", "3", "Luk_24_27", ["explained", "Scriptures", ], "If you EXPLAIN something, you remember it");
	add_verse("q7_2", "5", "Jhn_21_6", ["said", "them,", ], "If you say the same you had said before, you remember it");
	add_verse("q7_2", "1", "Luk_24_27", ["explicó", "Escrituras", ], "Si usted EXPLICA algo anterior, usted lo recuerda");
	*/

	lg.q7_3__resemblance_sec = `<a class='exam_ref exam_title' href='${hb.href_like_jesus_resu}'>Con parecido, como Jesús</a>`;
	lg.q7_3__resemblance = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos con parecido físico, semejante a la <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de Jesucristo`;
	add_verse("q7_3", "1", "1Co_15_20", ["resucitado", "primicias", "durmieron", ], "Nuestra resurrección es como la de Jesucristo");
	add_verse("q7_3", "2", "Luk_24_31", ["conocieron;", "le", ], "Si usted RECONOCE a alguien es porque se parece a un momento anterior");
	add_verse("q7_3", "3", "Jhn_12_9", ["ver", "Lázaro,", ], "Lázaro era famoso por haber resucitado, se parecía a antes de morir");
	add_verse("q7_3", "4", "Mat_27_53", ["resurrección,", "aparecieron", "muchos.", ], "Si se aparecieron a muchos y estos dieron testimonio de que estaban muertos es porque se parecían a antes de morir");
	add_verse("q7_3", "5", "Jhn_21_12", ["sabiendo", "era", "el", ], "Si usted RECONOCE a alguien es porque se parece a un momento anterior");
	add_verse("q7_3", "6", "1Co_15_53", ["vestido", ], "Cuando uno se viste no deja de tener parecido físico a estar desnudo.");
	add_verse("q7_3", "7", "Luk_24_39", ["Mirad", "palpad,", "ved;", ], "Jesucristo invita a que lo reconozcan porque se parece a antes de morir.");
	
	lg.q8_1__for_all_sec = `<a class='exam_ref exam_title' href='${hb.href_for_all_resu}'>Para Todos</a>`;
	lg.q8_1__for_all = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos que es para TODOS`;
	numv = "1"; bcit = "Jhn_5_28";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["todos", "sepulcros", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse1_should = "TODOS significa TODOS";
	numv = "2"; bcit = "Jhn_5_29";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["bien,", "mal,", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse2_should = "Los que hicieron el BIEN y los que hicieron el MAL";
	numv = "3"; bcit = "Act_24_15";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["como", "justos", "injustos,", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse3_should = "Todos resucitan: JUSTOS e INJUSTOS.";
	numv = "4"; bcit = "Jhn_6_39";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["todo", "no", "pierda", "nada,", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse4_should = "De TODOS los que le dió NO PIERDA NADA.";
	numv = "5"; bcit = "Jhn_17_2";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["toda", "carne,", "eterna", "vida", "todos", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse5_should = "VIDA ETERNA para TODA CARNE, que fué lo que le dió";
	numv = "6"; bcit = "1Co_15_22";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["todos", "vivificados.", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse6_should = "TODOS significa TODOS";
	
	lg.q9_1__not_yet_sec = `<a class='exam_ref exam_title' href='${hb.href_not_yet_resu}'>NO ha sucedido</a>`;
	lg.q9_1__not_yet = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos que NO ha sucedido para casi NADIE`;
	numv = "1"; bcit = "Jhn_6_39";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["día", "final.", ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse1_should = "Es el en DIA FINAL";
	numv = "2"; bcit = "2Ti_2_18";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["desviaron", "ocurrió;", "past,"] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse2_should = "No ha OCURRIDO";
	numv = "3"; bcit = "Jhn_6_40";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["final.", "día", ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse3_should = "Es en el DIA FINAL";
	numv = "4"; bcit = "Jhn_6_44";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["final.", "día", ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse4_should = "Es en el DIA FINAL";
	numv = "5"; bcit = "Jhn_6_54";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["final.", "día", ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse5_should = "Es en el DIA FINAL";
	numv = "6"; bcit = "Jhn_11_24";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["final.", "día", ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse6_should = "Es en el DIA FINAL";
	numv = "7"; bcit = "Rev_20_13";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["entregó", "entregaron", "muertos"] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse7_should = "Es DESPUES de que esta tierra y estos cielos sean destruidos";
	
	lg.q11_1__new_earth_sec = `<a class='exam_ref exam_title' href='${hb.href_new_earth_resu}'>Tierra Nueva</a>`;
	lg.q11_1__new_earth = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos para vivir en una TIERRA NUEVA con unos cielos nuevos`;
	numv = "1"; bcit = "Rev_21_1";
	set_stm_bibref(`q11_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["tierra", "nueva:", ] });
	set_href_bibcit(`q11_1__verse${numv}_href`, bcit);
	lg.q11_1__verse1_should = "Es en una TIERRA NUEVA con unos cielos nuevos";
	numv = "2"; bcit = "2Pe_3_13";
	set_stm_bibref(`q11_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["tierra", "nueva,", ] });
	set_href_bibcit(`q11_1__verse${numv}_href`, bcit);
	lg.q11_1__verse2_should = "Es en una TIERRA NUEVA con unos cielos nuevos";
	numv = "3"; bcit = "Isa_65_17";
	set_stm_bibref(`q11_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["nueva", "tierra:", ] });
	set_href_bibcit(`q11_1__verse${numv}_href`, bcit);
	lg.q11_1__verse3_should = "Es en una TIERRA NUEVA con unos cielos nuevos";
	numv = "4"; bcit = "Isa_66_22";
	set_stm_bibref(`q11_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["nueva", "tierra,", ] });
	set_href_bibcit(`q11_1__verse${numv}_href`, bcit);
	lg.q11_1__verse4_should = "Es en una TIERRA NUEVA con unos cielos nuevos";
	
	lg.o_finished_resu_qmodu = "Felicitaciones. Terminaste este modulo";
	lg.o_module_writen_ok = "Modulo guardado en la nube correctamente.";
	lg.o_you_need_to_login_to_participate = "Para participar necesitas hacer login.";

	lg.q_beliefs = "Que cree usted acerca de la resurrección?";
	lg.b_physical_resu = "Jesus resucitó en un cuerpo físico";
	lg.b_die_again = "Jesus NO volverá a morir";
	lg.b_in_body_and_spirit = "Jesus está vivo está vivo en su cuerpo resucitado en una ciudad celestial";
	lg.b_like_jesus = "Nuestra resurrección será en un cuerpo físico y en espíritu, tal cual como Jesucristo";
	lg.b_memory = "Nuestra resurrección será con MEMORIA tal cual la resurrección de Jesucristo";
	lg.b_resemblance = "Nuestra resurrección será con parecido físico tal cual la resurrección de Jesucristo";
	lg.b_for_all = "Nuestra resurrección será para TODOS, los buenos y los malos";
	lg.b_not_yet = "Nuestra resurrección será en el dia FINAL. No todavía";
	lg.b_new_earth = "Nuestra resurrección será en una tierra NUEVA con unos cielos nuevos";

}

function add_verse(numq, numv, bcit, words_up, should){
	const lg = gvar.glb_poll_txt;
	//Call example: add_verse("q11_1", "4", "Isa_66_22", ["new", "earth,", ], "It is on a NEW EARTH with a new heavens")
	set_stm_bibref(`${numq}__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: words_up });
	set_href_bibcit(`${numq}__verse${numv}_href`, bcit);
	lg[`${numq}__verse${numv}_should`] = should;
}

